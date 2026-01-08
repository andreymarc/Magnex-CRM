import { supabase, handleSupabaseError } from '../lib/supabase'
import { mockContacts, filterMockContacts } from '../data/mockContacts'

/**
 * Contact Management Service
 * ניהול לקוחות
 */

// Get all contacts
export const getContacts = async (filters = {}) => {
  try {

    // Use mock data if Supabase is not configured
    if (!supabase) {
      const filtered = filterMockContacts(mockContacts, filters)
      return { data: filtered, error: false, usingMockData: true }
    }

    // Get current user for multi-tenant filtering
    const { data: { user } } = await supabase.auth.getUser()

    let query = supabase
      .from('contacts')
      .select('*')
      .order('created_at', { ascending: false })

    // Filter by user_id for multi-tenant isolation
    if (user?.id) {
      query = query.eq('user_id', user.id)
    }

    // Apply filters
    if (filters.type) {
      query = query.eq('type', filters.type)
    }

    if (filters.status) {
      query = query.eq('status', filters.status)
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
    const filtered = filterMockContacts(mockContacts, filters)
    return { data: filtered, error: false, usingMockData: true }
  }
}

// Get a single contact by ID
export const getContact = async (id) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const contact = mockContacts.find(c => c.id === id)
      if (!contact) {
        return { error: true, message: 'Contact not found' }
      }
      return { data: contact, error: false, usingMockData: true }
    }
    
    const { data, error } = await supabase
      .from('contacts')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return handleSupabaseError(error)
    }

    return { data, error: false }
  } catch (error) {
    // Fallback to mock data
    const contact = mockContacts.find(c => c.id === id)
    if (!contact) {
      return { error: true, message: 'Contact not found' }
    }
    return { data: contact, error: false, usingMockData: true }
  }
}

// Create a new contact
export const createContact = async (contactData) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const newContact = {
        id: String(Date.now()),
        ...contactData,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      mockContacts.unshift(newContact) // Add to beginning of array
      return { data: newContact, error: false, usingMockData: true }
    }
    
    const { data: { user } } = await supabase.auth.getUser()

    const contact = {
      ...contactData,
      user_id: user?.id, // Multi-tenant: assign to current user
      created_by: user?.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('contacts')
      .insert([contact])
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

// Update a contact
export const updateContact = async (id, updates) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const index = mockContacts.findIndex(c => c.id === id)
      if (index === -1) {
        return { error: true, message: 'Contact not found' }
      }
      mockContacts[index] = {
        ...mockContacts[index],
        ...updates,
        updated_at: new Date().toISOString()
      }
      return { data: mockContacts[index], error: false, usingMockData: true }
    }
    
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('contacts')
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

// Delete a contact
export const deleteContact = async (id) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const index = mockContacts.findIndex(c => c.id === id)
      if (index === -1) {
        return { error: true, message: 'Contact not found' }
      }
      mockContacts.splice(index, 1)
      return { error: false, usingMockData: true }
    }
    
    const { error } = await supabase
      .from('contacts')
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

// Get contact statistics
export const getContactStats = async () => {
  try {

    // Use mock data if Supabase is not configured
    if (!supabase) {
      const stats = {
        total: mockContacts.length,
        customers: mockContacts.filter(c => c.type === 'customer').length,
        vendors: mockContacts.filter(c => c.type === 'vendor').length,
        partners: mockContacts.filter(c => c.type === 'partner').length,
        active: mockContacts.filter(c => c.status === 'active').length,
        inactive: mockContacts.filter(c => c.status === 'inactive').length
      }
      return { data: stats, error: false, usingMockData: true }
    }

    // Get current user for multi-tenant filtering
    const { data: { user } } = await supabase.auth.getUser()

    let query = supabase
      .from('contacts')
      .select('type, status')

    // Filter by user_id for multi-tenant isolation
    if (user?.id) {
      query = query.eq('user_id', user.id)
    }

    const { data, error } = await query

    if (error) {
      return handleSupabaseError(error)
    }

    const stats = {
      total: data.length,
      customers: data.filter(c => c.type === 'customer').length,
      vendors: data.filter(c => c.type === 'vendor').length,
      partners: data.filter(c => c.type === 'partner').length,
      active: data.filter(c => c.status === 'active').length,
      inactive: data.filter(c => c.status === 'inactive').length
    }

    return { data: stats, error: false }
  } catch (error) {
    // Fallback to mock data
    const stats = {
      total: mockContacts.length,
      customers: mockContacts.filter(c => c.type === 'customer').length,
      vendors: mockContacts.filter(c => c.type === 'vendor').length,
      partners: mockContacts.filter(c => c.type === 'partner').length,
      active: mockContacts.filter(c => c.status === 'active').length,
      inactive: mockContacts.filter(c => c.status === 'inactive').length
    }
    return { data: stats, error: false, usingMockData: true }
  }
}

