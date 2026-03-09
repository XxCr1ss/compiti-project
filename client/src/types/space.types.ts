/**
 * Space Types
 *
 * Type definitions for the Space entity and related operations.
 *
 * Responsibilities:
 * - Define the structure of a Space object.
 * - Provide types for creating and updating spaces.
 * - Ensure type safety across the application when working with spaces.
 *
 * Layer:
 * Frontend – Type Definitions.
 *
 * Scope:
 * Used throughout the application wherever spaces are handled, including
 * services, components, and context providers.
 */

export interface Space {
  id: string
  user_id: string
  title: string
  description: string | null
  created_at: string
  updated_at: string
}

export interface CreateSpaceDTO {
  title: string
  description?: string
}

export interface UpdateSpaceDTO {
  title?: string
  description?: string
}

export interface SpaceFormData {
  title: string
  description: string
}