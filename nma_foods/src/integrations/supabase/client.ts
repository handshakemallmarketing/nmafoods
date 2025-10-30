import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://dngjxftvcypbbdidmryf.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRuZ2p4ZnR2Y3lwYmJkaWRtcnlmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3MTk0MzksImV4cCI6MjA3NzI5NTQzOX0.GjtJ_fGNUQTVo3VCdjzKJBgGPEDXzLtS1Q3ILLJgjEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";
