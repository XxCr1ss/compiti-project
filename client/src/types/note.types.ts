/**
 * Note Types
 *
 * Type definitions for the Note entity and related operations.
 *
 * Responsibilities:
 * - Define the structure of a Note object.
 * - Provide types for creating and updating notes.
 * - Ensure type safety across the application when working with notes.
 *
 * Layer:
 * Frontend – Type Definitions.
 *
 * Scope:
 * Used throughout the application wherever notes are handled, including
 * services, components, and context providers.
 */

export interface Note {
  id: string
  space_id: string
  title: string
  content: string | null
  created_at: string
  updated_at: string
}

export interface CreateNoteDTO {
  space_id: string
  title: string
  content?: string
}

export interface UpdateNoteDTO {
  title?: string
  content?: string
}

export interface NoteFormData {
  title: string
  content: string
}