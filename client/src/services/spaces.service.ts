/**
 * Spaces Service
 *
 * This service handles all CRUD operations for spaces with Supabase.
 *
 * Responsibilities:
 * - Fetch all spaces for the authenticated user.
 * - Create a new space.
 * - Update an existing space.
 * - Delete a space.
 * - Handle errors and provide meaningful error messages.
 *
 * Layer:
 * Frontend – Service Layer (Data Access).
 *
 * Scope:
 * This service is used by the SpacesContext to manage space data.
 * It directly interacts with the Supabase database through the supabase client.
 *
 * Used In:
 * - SpacesContext (client/src/context/SpacesContext.tsx)
 *
 * Notes:
 * All functions are async and throw errors that should be handled by the caller.
 * RLS policies in Supabase ensure that users can only access their own spaces.
 */

import { supabase } from './supabase'
import type { Space, CreateSpaceDTO, UpdateSpaceDTO } from '../types/space.types'

/**
 * Fetch all spaces for the authenticated user
 */
export const getSpaces = async (): Promise<Space[]> => {
  const { data, error } = await supabase
    .from('spaces')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw new Error(error.message)
  }

  return data || []
}

/**
 * Create a new space
 */
export const createSpace = async (spaceData: CreateSpaceDTO): Promise<Space> => {
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Usuario no autenticado')
  }

  const { data, error } = await supabase
    .from('spaces')
    .insert({
      user_id: user.id,
      title: spaceData.title,
      description: spaceData.description || null,
    })
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

/**
 * Update an existing space
 */
export const updateSpace = async (id: string, updates: UpdateSpaceDTO): Promise<Space> => {
  const { data, error } = await supabase
    .from('spaces')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return data
}

/**
 * Delete a space
 */
export const deleteSpace = async (id: string): Promise<void> => {
  const { error } = await supabase.from('spaces').delete().eq('id', id)

  if (error) {
    throw new Error(error.message)
  }
}