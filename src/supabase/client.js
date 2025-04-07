import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://fcewvggydlszwhwngnku.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZjZXd2Z2d5ZGxzendod25nbmt1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQwNjU4ODQsImV4cCI6MjA1OTY0MTg4NH0.eOE41FGFPuTjL0tk_KeZzFyvMWiJTECM-K0lNriCccw"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
