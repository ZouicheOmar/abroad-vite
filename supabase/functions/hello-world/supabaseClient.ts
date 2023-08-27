/** @format */

import {createClient} from '@supabase/supabase-js'

const SUPABASE_URL = 'https://bfybtqxgnnnzbcxynyvt.supabase.co'
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJmeWJ0cXhnbm5uemJjeHlueXZ0Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NDc2MjQzMiwiZXhwIjoyMDAwMzM4NDMyfQ.K5gyt8afxXaeKlbyZ8DpgWJ7IvPQDbE-TLrrTSKgMLE'

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export const showsupabaseClient = () => {
  console.log('what is supabaseClient ? :', supabaseClient)
}
