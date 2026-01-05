import { supabase, handleSupabaseError } from '../lib/supabase'
import { mockDeals, filterMockDeals } from '../data/mockDeals'

/**
 * Deals Management Service
 * ניהול עסקאות
 */

// Get all deals
export const getDeals = async (filters = {}) => {
  try {

    // Use mock data if Supabase is not configured
    if (!supabase) {
      const filtered = filterMockDeals(mockDeals, filters)
      return { data: filtered, error: false, usingMockData: true }
    }

    // Get current user for multi-tenant filtering
    const { data: { user } } = await supabase.auth.getUser()

    let query = supabase
      .from('deals')
      .select('*')
      .order('created_at', { ascending: false })

    // Filter by user_id for multi-tenant isolation
    if (user?.id) {
      query = query.eq('user_id', user.id)
    }

    // Apply filters
    if (filters.stage) {
      query = query.eq('stage', filters.stage)
    }

    if (filters.customer_id) {
      query = query.eq('customer_id', filters.customer_id)
    }

    if (filters.owner_id) {
      query = query.eq('owner_id', filters.owner_id)
    }

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,notes.ilike.%${filters.search}%`)
    }

    const { data, error } = await query

    if (error) {
      return handleSupabaseError(error)
    }

    return { data, error: false }
  } catch (error) {
    // Fallback to mock data on error
    const filtered = filterMockDeals(mockDeals, filters)
    return { data: filtered, error: false, usingMockData: true }
  }
}

// Get a single deal by ID
export const getDeal = async (id) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const deal = mockDeals.find(d => d.id === id)
      if (!deal) {
        return { error: true, message: 'Deal not found' }
      }
      return { data: deal, error: false, usingMockData: true }
    }
    
    const { data, error } = await supabase
      .from('deals')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return handleSupabaseError(error)
    }

    return { data, error: false }
  } catch (error) {
    // Fallback to mock data
    const deal = mockDeals.find(d => d.id === id)
    if (!deal) {
      return { error: true, message: 'Deal not found' }
    }
    return { data: deal, error: false, usingMockData: true }
  }
}

// Create a new deal
export const createDeal = async (dealData) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const newDeal = {
        id: String(Date.now()),
        ...dealData,
        stage: dealData.stage || 'prospecting',
        probability: dealData.probability || 0,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      mockDeals.unshift(newDeal) // Add to beginning of array
      return { data: newDeal, error: false, usingMockData: true }
    }
    
    const { data: { user } } = await supabase.auth.getUser()
    
    const deal = {
      ...dealData,
      owner_id: dealData.owner_id || user?.id,
      created_by: user?.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('deals')
      .insert([deal])
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

// Update a deal
export const updateDeal = async (id, updates) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const index = mockDeals.findIndex(d => d.id === id)
      if (index === -1) {
        return { error: true, message: 'Deal not found' }
      }
      
      const updatedDeal = {
        ...mockDeals[index],
        ...updates,
        updated_at: new Date().toISOString()
      }
      
      // If stage is being set to closed_won or closed_lost, set actual_close_date
      if ((updates.stage === 'closed_won' || updates.stage === 'closed_lost') && !mockDeals[index].actual_close_date) {
        updatedDeal.actual_close_date = new Date().toISOString()
        updatedDeal.probability = 100
      }
      
      mockDeals[index] = updatedDeal
      return { data: updatedDeal, error: false, usingMockData: true }
    }
    
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString()
    }

    // Handle closed deals
    if (updates.stage === 'closed_won' || updates.stage === 'closed_lost') {
      if (!updateData.actual_close_date) {
        updateData.actual_close_date = new Date().toISOString()
      }
      updateData.probability = 100
    }

    const { data, error } = await supabase
      .from('deals')
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

// Delete a deal
export const deleteDeal = async (id) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const index = mockDeals.findIndex(d => d.id === id)
      if (index === -1) {
        return { error: true, message: 'Deal not found' }
      }
      mockDeals.splice(index, 1)
      return { error: false, usingMockData: true }
    }
    
    const { error } = await supabase
      .from('deals')
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

// Get deal statistics
export const getDealStats = async () => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const totalValue = mockDeals.reduce((sum, deal) => sum + (deal.amount || 0), 0)
      const wonValue = mockDeals
        .filter(d => d.stage === 'closed_won')
        .reduce((sum, deal) => sum + (deal.amount || 0), 0)
      
      const stats = {
        total: mockDeals.length,
        total_value: totalValue,
        won_value: wonValue,
        average_deal_size: totalValue / mockDeals.length,
        win_rate: (mockDeals.filter(d => d.stage === 'closed_won').length / mockDeals.length) * 100,
        by_stage: {
          prospecting: mockDeals.filter(d => d.stage === 'prospecting').length,
          qualification: mockDeals.filter(d => d.stage === 'qualification').length,
          proposal: mockDeals.filter(d => d.stage === 'proposal').length,
          negotiation: mockDeals.filter(d => d.stage === 'negotiation').length,
          closed_won: mockDeals.filter(d => d.stage === 'closed_won').length,
          closed_lost: mockDeals.filter(d => d.stage === 'closed_lost').length
        }
      }
      return { data: stats, error: false, usingMockData: true }
    }
    
    const { data, error } = await supabase
      .from('deals')
      .select('amount, stage')

    if (error) {
      return handleSupabaseError(error)
    }

    const totalValue = data.reduce((sum, deal) => sum + (parseFloat(deal.amount) || 0), 0)
    const wonValue = data
      .filter(d => d.stage === 'closed_won')
      .reduce((sum, deal) => sum + (parseFloat(deal.amount) || 0), 0)

    const stats = {
      total: data.length,
      total_value: totalValue,
      won_value: wonValue,
      average_deal_size: totalValue / data.length,
      win_rate: (data.filter(d => d.stage === 'closed_won').length / data.length) * 100,
      by_stage: {
        prospecting: data.filter(d => d.stage === 'prospecting').length,
        qualification: data.filter(d => d.stage === 'qualification').length,
        proposal: data.filter(d => d.stage === 'proposal').length,
        negotiation: data.filter(d => d.stage === 'negotiation').length,
        closed_won: data.filter(d => d.stage === 'closed_won').length,
        closed_lost: data.filter(d => d.stage === 'closed_lost').length
      }
    }

    return { data: stats, error: false }
  } catch (error) {
    // Fallback to mock data
    const totalValue = mockDeals.reduce((sum, deal) => sum + (deal.amount || 0), 0)
    const wonValue = mockDeals
      .filter(d => d.stage === 'closed_won')
      .reduce((sum, deal) => sum + (deal.amount || 0), 0)
    
    const stats = {
      total: mockDeals.length,
      total_value: totalValue,
      won_value: wonValue,
      average_deal_size: totalValue / mockDeals.length,
      win_rate: (mockDeals.filter(d => d.stage === 'closed_won').length / mockDeals.length) * 100,
      by_stage: {
        prospecting: mockDeals.filter(d => d.stage === 'prospecting').length,
        qualification: mockDeals.filter(d => d.stage === 'qualification').length,
        proposal: mockDeals.filter(d => d.stage === 'proposal').length,
        negotiation: mockDeals.filter(d => d.stage === 'negotiation').length,
        closed_won: mockDeals.filter(d => d.stage === 'closed_won').length,
        closed_lost: mockDeals.filter(d => d.stage === 'closed_lost').length
      }
    }
    return { data: stats, error: false, usingMockData: true }
  }
}

