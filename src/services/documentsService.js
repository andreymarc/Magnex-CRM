import { supabase, handleSupabaseError } from '../lib/supabase'
import { mockDocuments, filterMockDocuments, formatFileSize } from '../data/mockDocuments'

/**
 * Document Management Service
 * ניהול מסמכים בענן
 */

// Get all documents
export const getDocuments = async (filters = {}) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const filtered = filterMockDocuments(mockDocuments, filters)
      return { data: filtered, error: false, usingMockData: true }
    }
    
    let query = supabase
      .from('documents')
      .select('*')
      .order('created_at', { ascending: false })

    // Apply filters
    if (filters.category) {
      query = query.eq('category', filters.category)
    }

    if (filters.related_to_type) {
      query = query.eq('related_to_type', filters.related_to_type)
    }

    if (filters.related_to_id) {
      query = query.eq('related_to_id', filters.related_to_id)
    }

    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,file_name.ilike.%${filters.search}%`)
    }

    const { data, error } = await query

    if (error) {
      return handleSupabaseError(error)
    }

    return { data, error: false }
  } catch (error) {
    // Fallback to mock data on error
    const filtered = filterMockDocuments(mockDocuments, filters)
    return { data: filtered, error: false, usingMockData: true }
  }
}

// Get a single document by ID
export const getDocument = async (id) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const document = mockDocuments.find(d => d.id === id)
      if (!document) {
        return { error: true, message: 'Document not found' }
      }
      return { data: document, error: false, usingMockData: true }
    }
    
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      return handleSupabaseError(error)
    }

    return { data, error: false }
  } catch (error) {
    // Fallback to mock data
    const document = mockDocuments.find(d => d.id === id)
    if (!document) {
      return { error: true, message: 'Document not found' }
    }
    return { data: document, error: false, usingMockData: true }
  }
}

// Upload a document (for mock, we'll simulate it)
export const uploadDocument = async (file, documentData) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      // Simulate file upload
      const newDocument = {
        id: String(Date.now()),
        name: documentData.name || file.name,
        file_name: file.name,
        file_path: `/documents/${documentData.category || 'other'}/${file.name}`,
        file_type: file.type,
        file_size: file.size,
        category: documentData.category || 'other',
        tags: documentData.tags || [],
        related_to_type: documentData.related_to_type || null,
        related_to_id: documentData.related_to_id || null,
        uploaded_by: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      mockDocuments.unshift(newDocument)
      return { data: newDocument, error: false, usingMockData: true }
    }
    
    const { data: { user } } = await supabase.auth.getUser()
    
    // Upload file to Supabase Storage
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${documentData.category || 'other'}/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(filePath, file)

    if (uploadError) {
      return handleSupabaseError(uploadError)
    }

    // Create document record
    const document = {
      name: documentData.name || file.name,
      file_name: file.name,
      file_path: filePath,
      file_type: file.type,
      file_size: file.size,
      category: documentData.category || 'other',
      tags: documentData.tags || [],
      related_to_type: documentData.related_to_type || null,
      related_to_id: documentData.related_to_id || null,
      uploaded_by: user?.id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('documents')
      .insert([document])
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

// Update a document
export const updateDocument = async (id, updates) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const index = mockDocuments.findIndex(d => d.id === id)
      if (index === -1) {
        return { error: true, message: 'Document not found' }
      }
      
      mockDocuments[index] = {
        ...mockDocuments[index],
        ...updates,
        updated_at: new Date().toISOString()
      }
      return { data: mockDocuments[index], error: false, usingMockData: true }
    }
    
    const updateData = {
      ...updates,
      updated_at: new Date().toISOString()
    }

    const { data, error } = await supabase
      .from('documents')
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

// Delete a document
export const deleteDocument = async (id) => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const index = mockDocuments.findIndex(d => d.id === id)
      if (index === -1) {
        return { error: true, message: 'Document not found' }
      }
      mockDocuments.splice(index, 1)
      return { error: false, usingMockData: true }
    }
    
    // Get document first to delete file from storage
    const { data: document, error: fetchError } = await supabase
      .from('documents')
      .select('file_path')
      .eq('id', id)
      .single()

    if (fetchError) {
      return handleSupabaseError(fetchError)
    }

    // Delete file from storage
    if (document.file_path) {
      const { error: storageError } = await supabase.storage
        .from('documents')
        .remove([document.file_path])

      if (storageError) {
        console.warn('Failed to delete file from storage:', storageError)
      }
    }

    // Delete document record
    const { error } = await supabase
      .from('documents')
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

// Get document download URL
export const getDocumentUrl = async (document) => {
  try {
    
    
    if (!supabase) {
      // For mock data, return a placeholder
      return { url: '#', error: false, usingMockData: true }
    }
    
    const { data, error } = await supabase.storage
      .from('documents')
      .createSignedUrl(document.file_path, 3600) // 1 hour expiry

    if (error) {
      return handleSupabaseError(error)
    }

    return { url: data.signedUrl, error: false }
  } catch (error) {
    return handleSupabaseError(error)
  }
}

// Get document statistics
export const getDocumentStats = async () => {
  try {
    
    
    // Use mock data if Supabase is not configured
    if (!supabase) {
      const totalSize = mockDocuments.reduce((sum, doc) => sum + (doc.file_size || 0), 0)
      const stats = {
        total: mockDocuments.length,
        total_size: totalSize,
        by_category: {
          contract: mockDocuments.filter(d => d.category === 'contract').length,
          invoice: mockDocuments.filter(d => d.category === 'invoice').length,
          proposal: mockDocuments.filter(d => d.category === 'proposal').length,
          quote: mockDocuments.filter(d => d.category === 'quote').length,
          legal: mockDocuments.filter(d => d.category === 'legal').length,
          presentation: mockDocuments.filter(d => d.category === 'presentation').length,
          marketing: mockDocuments.filter(d => d.category === 'marketing').length,
          technical: mockDocuments.filter(d => d.category === 'technical').length,
          other: mockDocuments.filter(d => d.category === 'other').length
        }
      }
      return { data: stats, error: false, usingMockData: true }
    }
    
    const { data, error } = await supabase
      .from('documents')
      .select('file_size, category')

    if (error) {
      return handleSupabaseError(error)
    }

    const totalSize = data.reduce((sum, doc) => sum + (parseInt(doc.file_size) || 0), 0)
    const stats = {
      total: data.length,
      total_size: totalSize,
      by_category: {
        contract: data.filter(d => d.category === 'contract').length,
        invoice: data.filter(d => d.category === 'invoice').length,
        proposal: data.filter(d => d.category === 'proposal').length,
        quote: data.filter(d => d.category === 'quote').length,
        legal: data.filter(d => d.category === 'legal').length,
        presentation: data.filter(d => d.category === 'presentation').length,
        marketing: data.filter(d => d.category === 'marketing').length,
        technical: data.filter(d => d.category === 'technical').length,
        other: data.filter(d => d.category === 'other').length
      }
    }

    return { data: stats, error: false }
  } catch (error) {
    // Fallback to mock data
    const totalSize = mockDocuments.reduce((sum, doc) => sum + (doc.file_size || 0), 0)
    const stats = {
      total: mockDocuments.length,
      total_size: totalSize,
      by_category: {
        contract: mockDocuments.filter(d => d.category === 'contract').length,
        invoice: mockDocuments.filter(d => d.category === 'invoice').length,
        proposal: mockDocuments.filter(d => d.category === 'proposal').length,
        quote: mockDocuments.filter(d => d.category === 'quote').length,
        legal: mockDocuments.filter(d => d.category === 'legal').length,
        presentation: mockDocuments.filter(d => d.category === 'presentation').length,
        marketing: mockDocuments.filter(d => d.category === 'marketing').length,
        technical: mockDocuments.filter(d => d.category === 'technical').length,
        other: mockDocuments.filter(d => d.category === 'other').length
      }
    }
    return { data: stats, error: false, usingMockData: true }
  }
}

