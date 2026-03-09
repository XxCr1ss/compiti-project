/**
 * Supabase client Initialization
 * 
 * Purpose:
 * Initialize and export a Supabase client instance for use throughout the application.
 * 
 * Responsibilities:
 * - Read Supabase configuration from environment variables.
 * - Validate required configuration values.
 * - Create a singleton Supabase client instance.
 * 
 * Layer:
 * Frontend – Infrastructure / External Service Integration.
 * 
 * Scope:
 * Used across the client-side application to perform authentication
 * and database operations through Supabase.
 * 
 * Used In:
 * - Services interacting with Supabase
 * - Authentication logic
 * - Data fetching hooks
 * 
 * Security Notes:
 * - Uses the public anon key (VITE_SUPABASE_ANON_KEY).
 * - The service role key must NEVER be exposed in the frontend.
 * - Environment variables must be defined in client/.env.
 */

import { createClient } from '@supabase/supabase-js'

/**
 * Supabase project URL loaded from environment variables.
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
/**
 * Public anonymous key for Supabase.
 * This key is safe for frontend usage but must follow RLS policies.
 */ 
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * Ensures required Supabase enviroment variables are defined.
 * 
 * @throws Error if configuration values are missing.
 */
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan las variables de entorno de Supabase')
}

/**
 * Singleton Supabase client instance.
 *
 * @remarks
 * This instance should be reused across the application
 * to avoid multiple client initializations.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})