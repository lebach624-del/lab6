import { createClient } from "@supabase/supabase-js"

// Use placeholders during build time if environment variables are not yet available
// This prevents the build from crashing when generating static pages
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-url.supabase.co"
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key"

export const supabase = createClient(supabaseUrl, supabaseKey)