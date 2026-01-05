import { supabase, handleSupabaseError } from '../lib/supabase'
import { mockTasks, filterMockTasks, getOverdueTasks, getTasksDueToday } from '../data/mockTasks'

/**
 * Task & Alert Management Service
 * ניהול משימות והתראות
 */

// Get all tasks
export const getTasks = async (filters = {}) => {
  try {

    // Use mock data if Supabase is not configured
    if (!supabase) {
      const filtered = filterMockTasks(mockTasks, filters)
      return { data: filtered, error: false, usingMockData: true }
    }

    // Get current user for multi-tenant filtering
    const { data: { user } } = await supabase.auth.getUser()

    let query = supabase
      .from('tasks')
      .select('*')
      .order('due_date', { ascending: true, nullsFirst: false })

    // Filter by user_id for multi-tenant isolation
    if (user?.id) {
      query = query.eq('user_id', user.id)
    }

    // Apply filters
    if (filters.status) {
      query = query.eq('status', filters.status)
    }

    if (filters.priority) {
      query = query.eq('priority', filters.priority)
    }

    if (filters.type) {
      query = query.eq('type', filters.type)
    }

    if (filters.assigned_to) {
      query = query.eq('assigned_to', filters.assigned_to)
    }

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    const { data, error } = await query

    if (error) {
      return handleSupabaseError(error)
    }

    return { data, error: false }
  } catch (error) {
    // Fallback to mock data on error
    const filtered = filterMockTasks(mockTasks, filters)
    return { data: filtered, error: false, usingMockData: true }
  }
}

// Get a single task by ID
export const getTask = async (id) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const task = mockTasks.find(t => t.id === id)
      if (!task) {
        return { error: true, message: 'Task not found' }
      }
      return { data: task, error: false, usingMockData: true }
    }
    
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return handleSupabaseError(error)
    }

    return { data, error: false }
  } catch (error) {
    // Fallback to mock data
    const task = mockTasks.find(t => t.id === id)
    if (!task) {
      return { error: true, message: 'Task not found' }
    }
    return { data: task, error: false, usingMockData: true }
  }
}

// Create a new task
export const createTask = async (taskData) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const newTask = {
        id: String(Date.now()),
        ...taskData,
        status: taskData.status || 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      mockTasks.unshift(newTask) // Add to beginning of array
      return { data: newTask, error: false, usingMockData: true }
    }
    
    const { data: { user } } = await supabase.auth.getUser()
    
    const task = {
      ...taskData,
      created_by: user?.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('tasks')
      .insert([task])
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

// Update a task
export const updateTask = async (id, updates) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const index = mockTasks.findIndex(t => t.id === id)
      if (index === -1) {
        return { error: true, message: 'Task not found' }
      }
      
      const updatedTask = {
        ...mockTasks[index],
        ...updates,
        updated_at: new Date().toISOString()
      }
      
      // If status is being set to completed, set completed_at
      if (updates.status === 'completed' && !mockTasks[index].completed_at) {
        updatedTask.completed_at = new Date().toISOString()
      }
      // If status is changed from completed, clear completed_at
      if (updates.status !== 'completed' && mockTasks[index].status === 'completed') {
        updatedTask.completed_at = null
      }
      
      mockTasks[index] = updatedTask
      return { data: updatedTask, error: false, usingMockData: true }
    }
    
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString()
    }

    // Handle completed status
    if (updates.status === 'completed') {
      updateData.completed_at = new Date().toISOString()
    } else if (updates.status !== 'completed') {
      updateData.completed_at = null
    }

    const { data, error } = await supabase
      .from('tasks')
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

// Delete a task
export const deleteTask = async (id) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const index = mockTasks.findIndex(t => t.id === id)
      if (index === -1) {
        return { error: true, message: 'Task not found' }
      }
      mockTasks.splice(index, 1)
      return { error: false, usingMockData: true }
    }
    
    const { error } = await supabase
      .from('tasks')
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

// Get task statistics
export const getTaskStats = async () => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const stats = {
        total: mockTasks.length,
        pending: mockTasks.filter(t => t.status === 'pending').length,
        in_progress: mockTasks.filter(t => t.status === 'in_progress').length,
        completed: mockTasks.filter(t => t.status === 'completed').length,
        overdue: getOverdueTasks(mockTasks).length,
        due_today: getTasksDueToday(mockTasks).length,
        urgent: mockTasks.filter(t => t.priority === 'urgent' && t.status !== 'completed').length,
        high: mockTasks.filter(t => t.priority === 'high' && t.status !== 'completed').length
      }
      return { data: stats, error: false, usingMockData: true }
    }
    
    const { data, error } = await supabase
      .from('tasks')
      .select('status, priority, due_date')

    if (error) {
      return handleSupabaseError(error)
    }

    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const stats = {
      total: data.length,
      pending: data.filter(t => t.status === 'pending').length,
      in_progress: data.filter(t => t.status === 'in_progress').length,
      completed: data.filter(t => t.status === 'completed').length,
      overdue: data.filter(t => {
        if (!t.due_date || t.status === 'completed') return false
        return new Date(t.due_date) < now
      }).length,
      due_today: data.filter(t => {
        if (!t.due_date || t.status === 'completed') return false
        const dueDate = new Date(t.due_date)
        return dueDate >= today && dueDate < tomorrow
      }).length,
      urgent: data.filter(t => t.priority === 'urgent' && t.status !== 'completed').length,
      high: data.filter(t => t.priority === 'high' && t.status !== 'completed').length
    }

    return { data: stats, error: false }
  } catch (error) {
    // Fallback to mock data
    const stats = {
      total: mockTasks.length,
      pending: mockTasks.filter(t => t.status === 'pending').length,
      in_progress: mockTasks.filter(t => t.status === 'in_progress').length,
      completed: mockTasks.filter(t => t.status === 'completed').length,
      overdue: getOverdueTasks(mockTasks).length,
      due_today: getTasksDueToday(mockTasks).length,
      urgent: mockTasks.filter(t => t.priority === 'urgent' && t.status !== 'completed').length,
      high: mockTasks.filter(t => t.priority === 'high' && t.status !== 'completed').length
    }
    return { data: stats, error: false, usingMockData: true }
  }
}

