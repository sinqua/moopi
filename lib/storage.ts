import { createClient } from '@supabase/supabase-js'
import { supabasePublic } from './database'

// Upload file using standard upload
export async function CreateModelUrl(userId: string, filename: any) {
    const filepath = `${userId}/${filename}`

    const { data, error } = await supabasePublic.storage.from('moopi-model-bucket').createSignedUrl(filepath, 60)

  return data
}