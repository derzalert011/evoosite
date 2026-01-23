import { NextResponse } from 'next/server';

export async function GET() {
  // Only show which env vars are set, not their values (for security)
  const envVars = {
    NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
    STRIPE_SECRET_KEY: !!process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: !!process.env.STRIPE_WEBHOOK_SECRET,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: !!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    BREVO_API_KEY: !!process.env.BREVO_API_KEY,
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    ADMIN_EMAIL: !!process.env.ADMIN_EMAIL,
    SHIPPO_API_KEY: !!process.env.SHIPPO_API_KEY,
    SHIPPO_ORIGIN_NAME: !!process.env.SHIPPO_ORIGIN_NAME,
    SHIPPO_ORIGIN_STREET: !!process.env.SHIPPO_ORIGIN_STREET,
    SHIPPO_ORIGIN_CITY: !!process.env.SHIPPO_ORIGIN_CITY,
    SHIPPO_ORIGIN_STATE: !!process.env.SHIPPO_ORIGIN_STATE,
    SHIPPO_ORIGIN_ZIP: !!process.env.SHIPPO_ORIGIN_ZIP,
    SHIPPO_ORIGIN_COUNTRY: !!process.env.SHIPPO_ORIGIN_COUNTRY,
    NEXT_PUBLIC_SITE_URL: !!process.env.NEXT_PUBLIC_SITE_URL,
  };

  const missingVars = Object.entries(envVars)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  return NextResponse.json({
    status: missingVars.length === 0 ? 'all_set' : 'missing_vars',
    envVars,
    missingVars,
    timestamp: new Date().toISOString(),
  });
}
