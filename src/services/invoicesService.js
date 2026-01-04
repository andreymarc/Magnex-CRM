import { supabase, handleSupabaseError } from '../lib/supabase'
import { mockInvoices, filterMockInvoices, getInvoiceStats } from '../data/mockInvoices'

/**
 * Invoices & Payments Service
 * ניהול תשלומים וחשבוניות
 */

// Get all invoices
export const getInvoices = async (filters = {}) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const filtered = filterMockInvoices(mockInvoices, filters)
      return { data: filtered, error: false, usingMockData: true }
    }
    
    let query = supabase
      .from('invoices')
      .select('*')
      .order('created_at', { ascending: false })

    // Apply filters
    if (filters.status) {
      query = query.eq('status', filters.status)
    }

    if (filters.customer_id) {
      query = query.eq('customer_id', filters.customer_id)
    }

    if (filters.search) {
      query = query.or(`invoice_number.ilike.%${filters.search}%,customer_name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`)
    }

    const { data, error } = await query

    if (error) {
      return handleSupabaseError(error)
    }

    return { data, error: false }
  } catch (error) {
    // Fallback to mock data on error
    const filtered = filterMockInvoices(mockInvoices, filters)
    return { data: filtered, error: false, usingMockData: true }
  }
}

// Get a single invoice by ID
export const getInvoice = async (id) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const invoice = mockInvoices.find(i => i.id === id)
      if (!invoice) {
        return { error: true, message: 'Invoice not found' }
      }
      return { data: invoice, error: false, usingMockData: true }
    }
    
    const { data, error } = await supabase
      .from('invoices')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return handleSupabaseError(error)
    }

    return { data, error: false }
  } catch (error) {
    // Fallback to mock data
    const invoice = mockInvoices.find(i => i.id === id)
    if (!invoice) {
      return { error: true, message: 'Invoice not found' }
    }
    return { data: invoice, error: false, usingMockData: true }
  }
}

// Create a new invoice
export const createInvoice = async (invoiceData) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const invoiceNumber = `INV-2024-${String(mockInvoices.length + 1).padStart(3, '0')}`
      const newInvoice = {
        id: String(Date.now()),
        invoice_number: invoiceNumber,
        ...invoiceData,
        status: invoiceData.status || 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      mockInvoices.unshift(newInvoice)
      return { data: newInvoice, error: false, usingMockData: true }
    }
    
    const { data: { user } } = await supabase.auth.getUser()
    
    const invoice = {
      ...invoiceData,
      created_by: user?.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('invoices')
      .insert([invoice])
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

// Update an invoice
export const updateInvoice = async (id, updates) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const index = mockInvoices.findIndex(i => i.id === id)
      if (index === -1) {
        return { error: true, message: 'Invoice not found' }
      }
      
      const updatedInvoice = {
        ...mockInvoices[index],
        ...updates,
        updated_at: new Date().toISOString()
      }
      
      // If status is being set to paid, set paid_date
      if (updates.status === 'paid' && !mockInvoices[index].paid_date) {
        updatedInvoice.paid_date = new Date().toISOString()
      }
      
      mockInvoices[index] = updatedInvoice
      return { data: updatedInvoice, error: false, usingMockData: true }
    }
    
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString()
    }

    // Handle paid status
    if (updates.status === 'paid' && !updateData.paid_date) {
      updateData.paid_date = new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('invoices')
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

// Delete an invoice
export const deleteInvoice = async (id) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const index = mockInvoices.findIndex(i => i.id === id)
      if (index === -1) {
        return { error: true, message: 'Invoice not found' }
      }
      mockInvoices.splice(index, 1)
      return { error: false, usingMockData: true }
    }
    
    const { error } = await supabase
      .from('invoices')
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

// Mark invoice as paid
export const markInvoiceAsPaid = async (id, paymentMethod) => {
  try {
    
    
    if (!supabase) {
      return await updateInvoice(id, {
        status: 'paid',
        paid_date: new Date().toISOString(),
        payment_method: paymentMethod
      })
    }
    
    return await updateInvoice(id, {
      status: 'paid',
      paid_date: new Date().toISOString(),
      payment_method: paymentMethod
    })
  } catch (error) {
    return handleSupabaseError(error)
  }
}

// Get invoice statistics
export const getInvoiceStatistics = async () => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const stats = getInvoiceStats(mockInvoices)
      return { data: stats, error: false, usingMockData: true }
    }
    
    const { data, error } = await supabase
      .from('invoices')
      .select('status, amount')

    if (error) {
      return handleSupabaseError(error)
    }

    const stats = {
      total: data.length,
      paid: data.filter(i => i.status === 'paid').length,
      pending: data.filter(i => i.status === 'pending').length,
      overdue: data.filter(i => i.status === 'overdue').length,
      totalAmount: data.reduce((sum, inv) => sum + (parseFloat(inv.amount) || 0), 0),
      paidAmount: data
        .filter(i => i.status === 'paid')
        .reduce((sum, inv) => sum + (parseFloat(inv.amount) || 0), 0),
      pendingAmount: data
        .filter(i => i.status === 'pending')
        .reduce((sum, inv) => sum + (parseFloat(inv.amount) || 0), 0),
      overdueAmount: data
        .filter(i => i.status === 'overdue')
        .reduce((sum, inv) => sum + (parseFloat(inv.amount) || 0), 0)
    }

    return { data: stats, error: false }
  } catch (error) {
    // Fallback to mock data
    const stats = getInvoiceStats(mockInvoices)
    return { data: stats, error: false, usingMockData: true }
  }
}

