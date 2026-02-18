/**
 * Supabase server-side Initialization
 * 
 * Purpose:
 * - Initialize and export a Supabase client instance for server-side usage.
 * 
 * Responsibilities:
 * - Read Supabase configuration from environment variables.
 * - Validate required configuration values.
 * - Create a singleton Supabase client instance with service role key.
 * 
 * Layer:
 * Backend – Infrastructure / External Service Integration.
 * 
 * Scope:
 * Used across the server-side application to perform privileged operations
 * through Supabase, such as administrative tasks or operations that require
 * the service role key.
 * 
 * Used In:
 * - Server-side services interacting with Supabase
 * - Server-side authentication logic
 * - Server-side data fetching and manipulation
 */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

/**
 * Loads environment variables from the .env file into process.env.
 * 
 * @remarks
 * This is necessary to access the Supabase configuration values defined in server/.env.
 * The .env file should contain SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.
 */
dotenv.config()

/**
 * Supabase project URL loaded from environment variables.
 */
const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

/**
 * Ensures required Supabase enviroment variables are defined.
 * 
 * @throws Error if configuration values are missing.
 */
if (!supabaseUrl || !supabaseKey) {
  throw new Error('Faltan las variables de entorno de Supabase en el servidor')
}

/**
 * Singleton Supabase client instance for server-side usage.
 * 
 * @remarks
 * This client is initialized with the service role key, which has elevated privileges.
 * It should be used with caution and only for server-side operations that require it.
 */
export const supabase = createClient(supabaseUrl, supabaseKey)