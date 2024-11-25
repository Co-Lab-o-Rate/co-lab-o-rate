import { createClient } from '@supabase/supabase-js'
import { Database } from '../../database.types'

const VITE_ANON_KEY = import.meta.env.VITE_ANON_KEY;
const VITE_SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL

const supabase = VITE_SUPABASE_URL && VITE_ANON_KEY ? createClient<Database>(
  VITE_SUPABASE_URL ,
  VITE_ANON_KEY
) : null;

export default supabase;
