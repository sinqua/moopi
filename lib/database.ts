import { SupabaseClientOptions, createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const options = {
    db: {
        schema: 'next_auth'
    },
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string,
  options
)

export default supabase