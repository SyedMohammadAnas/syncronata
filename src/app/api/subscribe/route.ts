import { NextResponse } from 'next/server';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Initialize Supabase client - check for environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Helper function to validate if Supabase is properly configured
const isSupabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabaseServiceKey && supabaseUrl.length > 0 && supabaseServiceKey.length > 0);
};

// Create Supabase client only if properly configured
let supabase: SupabaseClient | null = null;
if (isSupabaseConfigured()) {
  supabase = createClient(supabaseUrl, supabaseServiceKey);
}

/**
 * POST handler for newsletter subscriptions
 * @param request - The incoming request
 * @returns NextResponse with result
 */
export async function POST(request: Request) {
  try {
    // Check if Supabase is configured
    if (!isSupabaseConfigured() || !supabase) {
      console.error('Supabase environment variables are not configured properly');
      return NextResponse.json(
        {
          error: 'Newsletter subscription is currently unavailable. Please try again later.',
          details: 'Database connection not configured'
        },
        { status: 503 }
      );
    }

    // Parse the request body
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Current timestamp
    const now = new Date().toISOString();

    // For development purposes only:
    // If in development environment and no actual DB connection,
    // simulate a successful subscription
    if (process.env.NODE_ENV === 'development' && !supabase) {
      console.log('Development mode: Simulating subscription for', email);
      return NextResponse.json(
        {
          success: true,
          message: '[DEV MODE] Successfully subscribed to the newsletter',
          data: { email }
        },
        { status: 201 }
      );
    }

    // Insert the email into the subscribers table
    const { data, error } = await supabase
      .from('subscribers')
      .insert([
        {
          email,
          subscribed_at: now,
          status: 'active'
        }
      ])
      .select();

    if (error) {
      // Check if it's a duplicate email error
      if (error.code === '23505') {
        return NextResponse.json(
          { message: 'You are already subscribed to our newsletter' },
          { status: 409 }
        );
      }

      console.error('Error subscribing to newsletter:', error);
      return NextResponse.json(
        { error: 'Failed to subscribe. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully subscribed to the newsletter',
        data
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing subscription:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
