// Data Initialization Service
// Seeds mock data for new users on their first login

import { supabase } from '../lib/supabase'
import { mockLeads } from '../data/mockLeads'
import { mockContacts } from '../data/mockContacts'
import { mockTasks } from '../data/mockTasks'
import { mockDeals } from '../data/mockDeals'
import { mockEvents } from '../data/mockEvents'
import { mockDocuments } from '../data/mockDocuments'
import { mockInvoices } from '../data/mockInvoices'

// Initialize user data with mock data
export const initializeUserData = async (userId) => {
  if (!userId) {
    return false
  }

  try {
    // Check if user already has data (check leads as indicator)
    const { data: existingLeads, error: checkError } = await supabase
      .from('leads')
      .select('id')
      .eq('user_id', userId)
      .limit(1)

    if (checkError) {
      // Continue anyway - might be first user or table issue
    }

    if (existingLeads && existingLeads.length > 0) {
      return true
    }

    // Insert leads (8 records) - only include valid DB columns
    const leadsToInsert = mockLeads.slice(0, 8).map(lead => ({
      first_name: lead.first_name,
      last_name: lead.last_name,
      email: lead.email,
      phone: lead.phone,
      company: lead.company,
      job_title: lead.job_title,
      source: lead.source,
      status: lead.status,
      score: lead.score,
      notes: lead.notes,
      user_id: userId,
      assigned_to: userId,
      created_by: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))

    const { error: leadsError } = await supabase
      .from('leads')
      .insert(leadsToInsert)

    if (leadsError) {
      // Error inserting leads - continue with other data
    }

    // Insert contacts (8 records) - only include valid DB columns
    const contactsToInsert = mockContacts.slice(0, 8).map(contact => ({
      first_name: contact.first_name,
      last_name: contact.last_name,
      email: contact.email,
      phone: contact.phone,
      mobile: contact.mobile,
      company: contact.company,
      job_title: contact.job_title,
      address: contact.address,
      city: contact.city,
      country: contact.country,
      postal_code: contact.postal_code,
      website: contact.website,
      type: contact.type,
      status: contact.status,
      tags: contact.tags,
      notes: contact.notes,
      user_id: userId,
      created_by: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))

    const { error: contactsError } = await supabase
      .from('contacts')
      .insert(contactsToInsert)

    if (contactsError) {
      // Error inserting contacts - continue with other data
    }

    // Insert tasks (8 records) - only include valid DB columns
    // Note: related_to_id set to null because mock data uses string IDs, not UUIDs
    const tasksToInsert = mockTasks.slice(0, 8).map(task => ({
      title: task.title,
      description: task.description,
      type: task.type,
      priority: task.priority,
      status: task.status,
      due_date: task.due_date,
      completed_at: task.completed_at,
      related_to_type: null, // Can't reference entities without valid UUIDs
      related_to_id: null,
      user_id: userId,
      assigned_to: userId,
      created_by: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))

    const { error: tasksError } = await supabase
      .from('tasks')
      .insert(tasksToInsert)

    if (tasksError) {
      // Error inserting tasks - continue with other data
    }

    // Insert deals (8 records) - only include valid DB columns
    const dealsToInsert = mockDeals.slice(0, 8).map(deal => ({
      title: deal.title,
      description: deal.description,
      amount: deal.amount,
      currency: deal.currency,
      stage: deal.stage,
      probability: deal.probability,
      expected_close_date: deal.expected_close_date,
      actual_close_date: deal.actual_close_date,
      tags: deal.tags,
      notes: deal.notes,
      user_id: userId,
      owner_id: userId,
      created_by: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))

    const { error: dealsError } = await supabase
      .from('deals')
      .insert(dealsToInsert)

    if (dealsError) {
      // Error inserting deals - continue with other data
    }

    // Insert events (8 records) - only include valid DB columns
    // Note: related_to_id set to null because mock data uses string IDs, not UUIDs
    const eventsToInsert = mockEvents.slice(0, 8).map(event => ({
      title: event.title,
      description: event.description,
      type: event.type,
      start_time: event.start_time,
      end_time: event.end_time,
      location: event.location,
      is_all_day: event.is_all_day,
      status: event.status,
      attendees: event.attendees,
      related_to_type: null, // Can't reference entities without valid UUIDs
      related_to_id: null,
      user_id: userId,
      created_by: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))

    const { error: eventsError } = await supabase
      .from('events')
      .insert(eventsToInsert)

    if (eventsError) {
      // Error inserting events - continue with other data
    }

    // Insert documents (8 records, metadata only, no actual files) - only include valid DB columns
    // Note: related_to_id set to null because mock data uses string IDs, not UUIDs
    const documentsToInsert = mockDocuments.slice(0, 8).map(doc => ({
      name: doc.name,
      file_name: doc.file_name,
      file_path: doc.file_path,
      file_type: doc.file_type,
      file_size: doc.file_size,
      category: doc.category,
      tags: doc.tags,
      related_to_type: null, // Can't reference entities without valid UUIDs
      related_to_id: null,
      user_id: userId,
      uploaded_by: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))

    const { error: documentsError } = await supabase
      .from('documents')
      .insert(documentsToInsert)

    if (documentsError) {
      // Error inserting documents - continue with other data
    }

    // Insert invoices (8 records) - only include valid DB columns
    const invoicesToInsert = mockInvoices.slice(0, 8).map(invoice => ({
      invoice_number: invoice.invoice_number,
      customer_name: invoice.customer_name,
      description: invoice.description,
      amount: invoice.amount,
      currency: invoice.currency,
      status: invoice.status,
      due_date: invoice.due_date,
      paid_date: invoice.paid_date,
      payment_method: invoice.payment_method,
      user_id: userId,
      created_by: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))

    const { error: invoicesError } = await supabase
      .from('invoices')
      .insert(invoicesToInsert)

    if (invoicesError) {
      // Error inserting invoices
    }

    return true
  } catch (error) {
    return false
  }
}

// Mark user as having data initialized
export const markDataInitialized = async (userId) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ data_initialized: true })
      .eq('id', userId)

    if (error) {
      return false
    }

    return true
  } catch (error) {
    return false
  }
}
