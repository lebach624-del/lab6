import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Khởi tạo client an toàn: Nếu thiếu URL sẽ dùng URL giả để không sập Build
// Nhưng sẽ báo lỗi trong Console để bạn biết
const isConfigured = supabaseUrl.startsWith("https://") && supabaseKey.length > 0

export const supabase = isConfigured 
  ? createClient(supabaseUrl, supabaseKey)
  : createClient("https://missing-config.supabase.co", "missing-key")