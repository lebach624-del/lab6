import { createClient } from "@supabase/supabase-js"

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || "").trim()
const supabaseKey = (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "").trim()

// Log để kiểm tra (chỉ hiện URL, không hiện Key để bảo mật)
if (typeof window !== "undefined") {
  console.log("Supabase URL initialized with:", supabaseUrl || "MISSING")
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder-missing-url.supabase.co",
  supabaseKey || "missing-key"
)