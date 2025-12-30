import { getSupabase, handleSupabaseError } from '../lib/supabase'
import { mockLeads, filterMockLeads } from '../data/mockLeads'

/**
 * Lead Management Service
 * ניהול מתעניינים
 */

// Get all leads
export const getLeads = async (filters = {}) => {
  try {
    const supabase = getSupabase()
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const filtered = filterMockLeads(mockLeads, filters)
      return { data: filtered, error: false, usingMockData: true }
    }
    
    let query = supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    // Apply filters
    if (filters.status) {
      query = query.eq('status', filters.status)
    }

    if (filters.assigned_to) {
      query = query.eq('assigned_to', filters.assigned_to)
    }

    if (filters.search) {
      query = query.or(`first_name.ilike.%${filters.search}%,last_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company.ilike.%${filters.search}%`)
    }

    const { data, error } = await query

    if (error) {
      return handleSupabaseError(error)
    }

    return { data, error: false }
  } catch (error) {
    // Fallback to mock data on error
    const filtered = filterMockLeads(mockLeads, filters)
    return { data: filtered, error: false, usingMockData: true }
  }
}

// Get a single lead by ID
export const getLead = async (id) => {
  try {
    const supabase = getSupabase()
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const lead = mockLeads.find(l => l.id === id)
      if (!lead) {
        return { error: true, message: 'Lead not found' }
      }
      return { data: lead, error: false, usingMockData: true }
    }
    
    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return handleSupabaseError(error)
    }

    return { data, error: false }
  } catch (error) {
    // Fallback to mock data
    const lead = mockLeads.find(l => l.id === id)
    if (!lead) {
      return { error: true, message: 'Lead not found' }
    }
    return { data: lead, error: false, usingMockData: true }
  }
}

// Create a new lead
export const createLead = async (leadData) => {
  try {
    const supabase = getSupabase()
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const newLead = {
        id: String(Date.now()),
        ...leadData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      mockLeads.unshift(newLead) // Add to beginning of array
      return { data: newLead, error: false, usingMockData: true }
    }
    
    const { data: { user } } = await supabase.auth.getUser()
    
    const lead = {
      ...leadData,
      created_by: user?.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('leads')
      .insert([lead])
      .select()
      .single()

    if (error) {
      return handleSupabaseError(error)
    }

    return { data, error: false }
  } catch (error) {
    return handleSupabaseError(error)
  }
}

// Update a lead
export const updateLead = async (id, updates) => {
  try {
    const supabase = getSupabase()
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const index = mockLeads.findIndex(l => l.id === id)
      if (index === -1) {
        return { error: true, message: 'Lead not found' }
      }
      mockLeads[index] = {
        ...mockLeads[index],
        ...updates,
        updated_at: new Date().toISOString()
      }
      return { data: mockLeads[index], error: false, usingMockData: true }
    }
    
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('leads')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      return handleSupabaseError(error)
    }

    return { data, error: false }
  } catch (error) {
    return handleSupabaseError(error)
  }
}

// Delete a lead
export const deleteLead = async (id) => {
  try {
    const supabase = getSupabase()
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const index = mockLeads.findIndex(l => l.id === id)
      if (index === -1) {
        return { error: true, message: 'Lead not found' }
      }
      mockLeads.splice(index, 1)
      return { error: false, usingMockData: true }
    }
    
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id)

    if (error) {
      return handleSupabaseError(error)
    }

    return { error: false }
  } catch (error) {
    return handleSupabaseError(error)
  }
}

// Convert lead to contact
export const convertLeadToContact = async (leadId) => {
  try {
    // Get the lead
    const leadResult = await getLead(leadId)
    if (leadResult.error) {
      return leadResult
    }

    const lead = leadResult.data

    // Create contact from lead
    const supabase = getSupabase()
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      // For mock data, we just update the lead status
      await updateLead(leadId, { status: 'converted' })
      return { 
        data: {
          id: `contact-${Date.now()}`,
          first_name: lead.first_name,
          last_name: lead.last_name,
          email: lead.email,
          phone: lead.phone,
          company: lead.company,
          job_title: lead.job_title
        }, 
        error: false, 
        usingMockData: true 
      }
    }
    
    const { data: { user } } = await supabase.auth.getUser()
    
    const contact = {
      first_name: lead.first_name,
      last_name: lead.last_name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      job_title: lead.job_title,
      created_by: user?.id
    }

    const { data: contactData, error: contactError } = await supabase
      .from('contacts')
      .insert([contact])
      .select()
      .single()

    if (contactError) {
      return handleSupabaseError(contactError)
    }

    // Update lead status to converted
    await updateLead(leadId, { status: 'converted' })

    return { data: contactData, error: false }
  } catch (error) {
    return handleSupabaseError(error)
  }
}

// Get lead statistics
export const getLeadStats = async () => {
  try {
    const supabase = getSupabase()
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const stats = {
        total: mockLeads.length,
        new: mockLeads.filter(l => l.status === 'new').length,
        contacted: mockLeads.filter(l => l.status === 'contacted').length,
        qualified: mockLeads.filter(l => l.status === 'qualified').length,
        converted: mockLeads.filter(l => l.status === 'converted').length,
        lost: mockLeads.filter(l => l.status === 'lost').length
      }
      return { data: stats, error: false, usingMockData: true }
    }
    
    const { data, error } = await supabase
      .from('leads')
      .select('status')

    if (error) {
      return handleSupabaseError(error)
    }

    // Count leads by status
    const stats = {
      total: data.length,
      new: data.filter(l => l.status === 'new').length,
      contacted: data.filter(l => l.status === 'contacted').length,
      qualified: data.filter(l => l.status === 'qualified').length,
      converted: data.filter(l => l.status === 'converted').length,
      lost: data.filter(l => l.status === 'lost').length
    }

    return { data: stats, error: false }
  } catch (error) {
    // Fallback to mock data
    const stats = {
      total: mockLeads.length,
      new: mockLeads.filter(l => l.status === 'new').length,
      contacted: mockLeads.filter(l => l.status === 'contacted').length,
      qualified: mockLeads.filter(l => l.status === 'qualified').length,
      converted: mockLeads.filter(l => l.status === 'converted').length,
      lost: mockLeads.filter(l => l.status === 'lost').length
    }
    return { data: stats, error: false, usingMockData: true }
  }
}

