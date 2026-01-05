// Data Initialization Service
// Seeds mock data for new users on their first login

import { supabase } from '../lib/supabase'
import { mockLeads } from '../data/mockLeads'
import { mockContacts } from '../data/mockContacts'
import { mockTasks } from '../data/mockTasks'
import { mockDeals } from '../data/mockDeals'
import { mockEvents } from '../data/mockEvents'
import { mockDocuments } from '../data/mockDocuments'

// Initialize user data with mock data
export const initializeUserData = async (userId) => {
  if (!userId) {
    console.error('No user ID provided for data initialization')
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
      console.error('Error checking existing data:', checkError)
      // Continue anyway - might be first user or table issue
    }

    if (existingLeads && existingLeads.length > 0) {
      console.log('User already has data, skipping initialization')
      return true
    }

    console.log('Initializing mock data for user:', userId)

    // Insert leads
    const leadsToInsert = mockLeads.slice(0, 5).map(lead => ({
      ...lead,
      id: undefined, // Let Supabase generate new IDs
      user_id: userId,
      assigned_to: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))

    const { error: leadsError } = await supabase
      .from('leads')
      .insert(leadsToInsert)

    if (leadsError) {
      console.error('Error inserting leads:', leadsError)
    }

    // Insert contacts
    const contactsToInsert = mockContacts.slice(0, 5).map(contact => ({
      ...contact,
      id: undefined,
      user_id: userId,
      created_by: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))

    const { error: contactsError } = await supabase
      .from('contacts')
      .insert(contactsToInsert)

    if (contactsError) {
      console.error('Error inserting contacts:', contactsError)
    }

    // Insert tasks
    const tasksToInsert = mockTasks.slice(0, 5).map(task => ({
      ...task,
      id: undefined,
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
      console.error('Error inserting tasks:', tasksError)
    }

    // Insert deals
    const dealsToInsert = mockDeals.slice(0, 5).map(deal => ({
      ...deal,
      id: undefined,
      user_id: userId,
      assigned_to: userId,
      created_by: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))

    const { error: dealsError } = await supabase
      .from('deals')
      .insert(dealsToInsert)

    if (dealsError) {
      console.error('Error inserting deals:', dealsError)
    }

    // Insert events
    const eventsToInsert = mockEvents.slice(0, 5).map(event => ({
      ...event,
      id: undefined,
      user_id: userId,
      created_by: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))

    const { error: eventsError } = await supabase
      .from('events')
      .insert(eventsToInsert)

    if (eventsError) {
      console.error('Error inserting events:', eventsError)
    }

    // Insert documents (metadata only, no actual files)
    const documentsToInsert = mockDocuments.slice(0, 5).map(doc => ({
      ...doc,
      id: undefined,
      user_id: userId,
      uploaded_by: userId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }))

    const { error: documentsError } = await supabase
      .from('documents')
      .insert(documentsToInsert)

    if (documentsError) {
      console.error('Error inserting documents:', documentsError)
    }

    console.log('Mock data initialization completed for user:', userId)
    return true
  } catch (error) {
    console.error('Error initializing user data:', error)
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
      console.error('Error marking data as initialized:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error marking data as initialized:', error)
    return false
  }
}
