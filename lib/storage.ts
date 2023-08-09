import { supabase } from "./database";

export const CreateQuillUrl = async (filename: any) => {
  const { data } = await supabase.storage
    .from("quill")
    .getPublicUrl(filename)
    
  return data;
};

// Upload file using standard upload
export async function UploadAvatar(
  userId: any,
  filename: any,
  file: any
) {
  const filepath = `${userId}/${filename}`;

  const { data, error } = await supabase.storage
    .from("model")
    .upload(filepath, file, {
      cacheControl: "3600",
      upsert: true,
    });

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
    .from("quill")
    .upload(filepath, blob, {
      cacheControl: "3600",
      upsert: true,
    });

  return data;
}
