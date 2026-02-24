/**
 * auth.types.ts
 * 
 * Purpose:
 * Defines TypeScript types and interfaces related to authentication in the Compiti frontend application.
 * 
 * Responsibilities:
 * - Define the shape of the authentication context value (AuthContextType).
 * - Define the structure of authentication responses (AuthResponse).
 * 
 * Layer:
 * Frontend – Type Definitions.
 * 
 * Scope:
 * These types are used throughout the authentication-related components and context to ensure type safety and consistency when handling authentication state and responses.
 * 
 * Used In:
 * - AuthContext (to define the context value type)
 * - LoginPage (to type the response from signIn function)
 * - RegisterPage (to type the response from signUp function)
 * 
 * Notes:
 * The AuthContextType interface defines the properties and functions available in the authentication context, including the current user, loading state, and authentication functions. 
 * The AuthResponse interface defines a standard structure for responses from authentication functions, indicating success and providing an optional message.
 */

import type { User } from '@supabase/supabase-js'

// Define the shape of the authentication context value
// A interface that describes the properties and functions available in the authentication context
export interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

// Define the structure of authentication responses
// A interface that describes the standard structure for responses from authentication functions
export interface AuthResponse {
  success: boolean
  message?: string
}