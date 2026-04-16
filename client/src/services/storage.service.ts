/**
 * Storage Service
 *
 * This service handles all operations related to file storage with Supabase Storage.
 *
 * Responsibilities:
 * - Upload images to Supabase Storage.
 * - Delete images from Supabase Storage.
 * - Get public URLs for images.
 * - Handle errors and provide meaningful error messages.
 *
 * Layer:
 * Frontend – Service Layer (Storage Access).
 *
 * Scope:
 * This service is used by components that need to upload or manage images.
 *
 * Used In:
 * - NoteEditor component
 * - NotesContext (for cleanup operations)
 *
 * Notes:
 * Images are stored in folders named by user ID to ensure proper isolation.
 * File names include timestamps to avoid collisions.
 */

import { supabase } from './supabase'

const BUCKET_NAME = 'note-images'

/**
 * Upload an image to Supabase Storage
 * @param file - The image file to upload
 * @param userId - The ID of the user uploading the image
 * @returns The public URL of the uploaded image
 */
export const uploadImage = async (file: File, userId: string): Promise<string> => {
  // Generate unique name
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}/${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`

  // Upload the file
  const { data, error } = await supabase.storage.from(BUCKET_NAME).upload(fileName, file, {
    cacheControl: '3600',
    upsert: false,
  })

  if (error) {
    console.error('Error uploading image:', error)
    throw new Error(error.message)
  }

  // Obtain the url
  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET_NAME).getPublicUrl(data.path)

  return publicUrl
}

/**
 * Delete an image from Supabase Storage
 * @param imageUrl - The URL of the image to delete
 */
export const deleteImage = async (imageUrl: string): Promise<void> => {
  if (!imageUrl) return

  // Extract the file path from the URL
  const urlParts = imageUrl.split(`${BUCKET_NAME}/`)
  if (urlParts.length < 2) {
    console.error('Invalid image URL')
    return
  }

  const filePath = urlParts[1]

  const { error } = await supabase.storage.from(BUCKET_NAME).remove([filePath])

  if (error) {
    console.error('Error deleting image:', error)
    throw new Error(error.message)
  }
}

/**
 * Get signed URL for private images (if needed in the future)
 * @param path - The path to the image
 * @param expiresIn - Expiration time in seconds (default: 1 hour)
 * @returns The signed URL
 */
export const getSignedUrl = async (path: string, expiresIn = 3600): Promise<string> => {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .createSignedUrl(path, expiresIn)

  if (error) {
    console.error('Error getting signed URL:', error)
    throw new Error(error.message)
  }

  return data.signedUrl
}