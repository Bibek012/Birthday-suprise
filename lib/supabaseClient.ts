import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// Public, anon-key client — safe for the browser. Row Level Security (see
// supabase/schema.sql) restricts this key to INSERT-only on the
// birthday_locations table, so it cannot read back other people's data.
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-only client using the service role key, for the API route.
// Never import this file from a "use client" component.
export function getServerSupabase() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    // Falls back to the anon key so local dev without a service key still
    // works, as long as the RLS insert policy below is in place.
    return createClient(supabaseUrl, supabaseAnonKey);
  }
  return createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });
}
