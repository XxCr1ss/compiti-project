/**
 * Notes Service
 *
 * This service handles all CRUD operations for notes with Supabase.
 *
 * Responsibilities:
 * - Fetch all notes for a specific space.
 * - Create a new note within a space.
 * - Update an existing note.
 * - Delete a note.
 * - Handle errors and provide meaningful error messages.
 *
 * Layer:
 * Frontend – Service Layer (Data Access).
 *
 * Scope:
 * This service is used by the NotesContext to manage note data.
 * It directly interacts with the Supabase database through the supabase client.
 *
 * Used In:
 * - NotesContext (client/src/context/NotesContext.tsx)
 *
 * Notes:
 * All functions are async and throw errors that should be handled by the caller.
 * RLS policies in Supabase ensure that users can only access notes from their own spaces.
 */

import { supabase } from './supabase'
import type { Note, CreateNoteDTO, UpdateNoteDTO } from '../types/note.types'

/**
 * Fetch all notes for a specific space
 */
export const getNotesBySpace = async (spaceId: string): Promise<Note[]> => {
  // Verificar que hay un usuario autenticado
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Usuario no autenticado')
  }

  // Primero verificar que el espacio pertenece al usuario
  const { data: space, error: spaceError } = await supabase
    .from('spaces')
    .select('id')
    .eq('id', spaceId)
    .eq('user_id', user.id)
    .single()

  if (spaceError || !space) {
    throw new Error('No tienes acceso a este espacio')
  }

  // Ahora sí, obtener las notas
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('space_id', spaceId)
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('Error fetching notes:', error)
    throw new Error(error.message)
  }

  return data || []
}

/**
 * Get a single note by ID
 */
export const getNoteById = async (id: string): Promise<Note> => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Usuario no autenticado')
  }

  const { data, error } = await supabase.from('notes').select('*').eq('id', id).single()

  if (error) {
    console.error('Error fetching note:', error)
    throw new Error(error.message)
  }

  return data
}

/**
 * Create a new note
 */
export const createNote = async (noteData: CreateNoteDTO): Promise<Note> => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Usuario no autenticado')
  }

  // Verificar que el espacio pertenece al usuario
  const { data: space, error: spaceError } = await supabase
    .from('spaces')
    .select('id')
    .eq('id', noteData.space_id)
    .eq('user_id', user.id)
    .single()

  if (spaceError || !space) {
    throw new Error('No tienes acceso a este espacio')
  }

  const { data, error } = await supabase
    .from('notes')
    .insert({
      space_id: noteData.space_id,
      title: noteData.title,
      content: noteData.content || null,
    })
    .select()
    .single()

  if (error) {
    console.error('Error creating note:', error)
    throw new Error(error.message)
  }

  return data
}

/**
 * Update an existing note
 */
export const updateNote = async (id: string, updates: UpdateNoteDTO): Promise<Note> => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Usuario no autenticado')
  }

  const { data, error } = await supabase
    .from('notes')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Error updating note:', error)
    throw new Error(error.message)
  }

  return data
}

/**
 * Delete a note
 */
export const deleteNote = async (id: string): Promise<void> => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Usuario no autenticado')
  }

  const { error } = await supabase.from('notes').delete().eq('id', id)

  if (error) {
    console.error('Error deleting note:', error)
    throw new Error(error.message)
  }
}