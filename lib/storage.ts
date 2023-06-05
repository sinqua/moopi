import { createClient } from '@supabase/supabase-js'
import { supabasePublic } from './database'

// Create file url
export async function CreateModelUrl(userId: string, filename: any) {
  const filepath = `${userId}/${filename}`

  const { data, error } = await supabasePublic.storage.from('moopi-model-bucket').createSignedUrl(filepath, 60)

  return data
}

// Upload file using standard upload
export async function UploadModel(userId: any, filename: any, file: any) {
  const filepath = `${userId}/${filename}`

  const { data, error } = await supabasePublic.storage.from('moopi-model-bucket')
                                                      .upload(filepath, file, {
                                                        cacheControl: '3600',
                                                        upsert: true
                                                      });

  return data
}