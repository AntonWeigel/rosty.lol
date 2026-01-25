'use server';

import { createClient } from '@/config/supabase/server';
import { StorageBucket } from '@/constants/enums';

/**
 * Deletes all existing avatar files for a given user from the avatar storage bucket.
 *
 * @param userId - The user's ID whose avatars should be removed.
 */
export async function deleteOldAvatars(userId: string): Promise<void> {
  const supabase = await createClient();

  // List all files in the folder
  const { data: existingFiles, error: listError } = await supabase.storage
    .from(StorageBucket.Avatars)
    .list(userId);

  if (listError) {
    console.error('Error listing old avatars:', listError.message);
    throw new Error('Failed to list old avatars');
  }

  // If files exist, delete them
  if (existingFiles && existingFiles.length > 0) {
    const filesToDelete = existingFiles.map((file) => `${userId}/${file.name}`);
    const { error: deleteError } = await supabase.storage
      .from(StorageBucket.Avatars)
      .remove(filesToDelete);

    if (deleteError) {
      console.error('Error deleting old avatars:', deleteError.message);
      throw new Error('Failed to delete old avatars');
    }
  }
}
