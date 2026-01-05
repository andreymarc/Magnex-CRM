import { supabase, handleSupabaseError } from '../lib/supabase'
import { mockEvents, filterMockEvents, getEventsForDate, getUpcomingEvents } from '../data/mockEvents'

/**
 * Event Calendar Management Service
 * ניהול יומן אירועים
 */

// Get all events
export const getEvents = async (filters = {}) => {
  try {

    // Use mock data if Supabase is not configured
    if (!supabase) {
      const filtered = filterMockEvents(mockEvents, filters)
      return { data: filtered, error: false, usingMockData: true }
    }

    // Get current user for multi-tenant filtering
    const { data: { user } } = await supabase.auth.getUser()

    let query = supabase
      .from('events')
      .select('*')
      .order('start_time', { ascending: true })

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

    if (filters.date) {
      const startOfDay = new Date(filters.date)
      startOfDay.setHours(0, 0, 0, 0)
      const endOfDay = new Date(startOfDay)
      endOfDay.setDate(endOfDay.getDate() + 1)

      query = query.gte('start_time', startOfDay.toISOString())
        .lt('start_time', endOfDay.toISOString())
    }

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%,location.ilike.%${filters.search}%`)
    }

    const { data, error } = await query

    if (error) {
      return handleSupabaseError(error)
    }

    return { data, error: false }
  } catch (error) {
    // Fallback to mock data on error
    const filtered = filterMockEvents(mockEvents, filters)
    return { data: filtered, error: false, usingMockData: true }
  }
}

// Get events for a specific date
export const getEventsByDate = async (date) => {
  try {
    
    
    if (!supabase) {
      const events = getEventsForDate(mockEvents, date)
      return { data: events, error: false, usingMockData: true }
    }
    
    const startOfDay = new Date(date)
    startOfDay.setHours(0, 0, 0, 0)
    const endOfDay = new Date(startOfDay)
    endOfDay.setDate(endOfDay.getDate() + 1)
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('start_time', startOfDay.toISOString())
      .lt('start_time', endOfDay.toISOString())
      .order('start_time', { ascending: true })

    if (error) {
      return handleSupabaseError(error)
    }

    return { data, error: false }
  } catch (error) {
    const events = getEventsForDate(mockEvents, date)
    return { data: events, error: false, usingMockData: true }
  }
}

// Get upcoming events
export const getUpcoming = async (days = 7) => {
  try {
    
    
    if (!supabase) {
      const events = getUpcomingEvents(mockEvents, days)
      return { data: events, error: false, usingMockData: true }
    }
    
    const now = new Date()
    const futureDate = new Date(now)
    futureDate.setDate(futureDate.getDate() + days)
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('start_time', now.toISOString())
      .lte('start_time', futureDate.toISOString())
      .eq('status', 'scheduled')
      .order('start_time', { ascending: true })

    if (error) {
      return handleSupabaseError(error)
    }

    return { data, error: false }
  } catch (error) {
    const events = getUpcomingEvents(mockEvents, days)
    return { data: events, error: false, usingMockData: true }
  }
}

// Get a single event by ID
export const getEvent = async (id) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const event = mockEvents.find(e => e.id === id)
      if (!event) {
        return { error: true, message: 'Event not found' }
      }
      return { data: event, error: false, usingMockData: true }
    }
    
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return handleSupabaseError(error)
    }

    return { data, error: false }
  } catch (error) {
    // Fallback to mock data
    const event = mockEvents.find(e => e.id === id)
    if (!event) {
      return { error: true, message: 'Event not found' }
    }
    return { data: event, error: false, usingMockData: true }
  }
}

// Create a new event
export const createEvent = async (eventData) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const newEvent = {
        id: String(Date.now()),
        ...eventData,
        status: eventData.status || 'scheduled',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      mockEvents.push(newEvent)
      return { data: newEvent, error: false, usingMockData: true }
    }
    
    const { data: { user } } = await supabase.auth.getUser()
    
    const event = {
      ...eventData,
      created_by: user?.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('events')
      .insert([event])
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

// Update an event
export const updateEvent = async (id, updates) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const index = mockEvents.findIndex(e => e.id === id)
      if (index === -1) {
        return { error: true, message: 'Event not found' }
      }
      
      mockEvents[index] = {
        ...mockEvents[index],
        ...updates,
        updated_at: new Date().toISOString()
      }
      return { data: mockEvents[index], error: false, usingMockData: true }
    }
    
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('events')
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

// Delete an event
export const deleteEvent = async (id) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const index = mockEvents.findIndex(e => e.id === id)
      if (index === -1) {
        return { error: true, message: 'Event not found' }
      }
      mockEvents.splice(index, 1)
      return { error: false, usingMockData: true }
    }
    
    const { error } = await supabase
      .from('events')
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

