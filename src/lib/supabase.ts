import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client configuration
 * Creates a single client instance for use throughout the app
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Create a single supabase client for the entire app
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;

/**
 * Create Supabase server client (for server components)
 * Use environment variables with fallbacks to prevent errors
 * @returns Supabase client
 */
export const createServerClient = () => {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_SERVICE_KEY || ''
  );
};
