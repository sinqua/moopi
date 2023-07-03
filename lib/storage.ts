import { createClient } from "@supabase/supabase-js";
import { supabase } from "./database";
import { decode } from "base64-arraybuffer";

// Create file url
export async function CreateModelUrl(userId: string, filename: any) {
  const filepath = `${userId}/${filename}`;

  const { data, error } = await supabase.storage
    .from("model")
    .createSignedUrl(filepath, 3600);

  return data;
}

// Create file url
export async function CreateImageUrl(filepath: any) {
  const { data, error } = await supabase.storage
    .from("image")
    .createSignedUrl(filepath, 3600);

  return data;
}

// Upload file using standard upload
export async function UploadAvatar(
  userId: any,
  filename: any,
  file: any
) {
  const filepath = `${userId}/${filename}`;

  console.log(filepath);

  const { data, error } = await supabase.storage
    .from("model")
    .upload(filepath, file, {
      cacheControl: "3600",
      upsert: true,
    });
    
  return data;
}

// Upload file using standard upload
export async function UploadProfileImage(
  userId: any,
  filename: any,
  file: any
) {
  const filepath = `${userId}/${filename}`;

  console.log(filepath);

  const { data, error } = await supabase.storage
    .from("image")
    .upload(filepath, file, {
      cacheControl: "3600",
      upsert: true,
    });

  console.log(error);

  return data;
}

// Upload file using standard upload
export async function UploadBase64Image(userId: any, filename: any, file: any) {
  const filepath = `${userId}/${filename}`;

  // Convert base64 to binary data
  const binaryData = atob(file.split("base64,")[1]);

  // Create a Uint8Array to hold the binary data
  const uint8Array = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    uint8Array[i] = binaryData.charCodeAt(i);
  }

  // Create a Blob from the Uint8Array
  const blob = new Blob([uint8Array]);

  const { data, error } = await supabase.storage
    .from("image")
    .upload(filepath, blob, {
      cacheControl: "3600",
      upsert: true,
    });

  return data;
}
