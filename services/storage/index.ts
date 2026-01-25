import { createClient } from '@/config/supabase/server';
import { StorageBucket } from '@/constants/enums';

/**
 * Uploads a file to a Supabase storage bucket and returns its public URL.
 *
 * @param bucket - The target storage bucket.
 * @param filePath - The path where the file will be stored.
 * @param file - The file to upload.
 * @returns The public URL of the uploaded file.
 * @throws Error if the upload fails.
 */
export async function uploadFile(
  bucket: StorageBucket,
  filePath: string,
  file: File,
): Promise<string> {
  const supabase = await createClient();

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(bucket)
    .upload(filePath, file, { cacheControl: '3600', upsert: true });

  if (uploadError) {
    console.error('Error uploading file:', uploadError.message);
    throw new Error('File upload failed');
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(uploadData.path);

  return data.publicUrl;
}
