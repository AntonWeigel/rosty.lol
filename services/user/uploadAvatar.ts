'use server';

import { StorageBucket } from '@/constants/enums';
import { uploadFile } from '@/services/storage';
import { deleteOldAvatars } from '@/services/user';

/**
 * Uploads a new avatar image for the user and deletes any old avatars.
 *
 * @param file - The new avatar file to upload.
 * @param userId - The user's ID used for naming the file path.
 * @returns The public URL of the uploaded avatar.
 */
export async function uploadAvatar(file: File, userId: string) {
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  const filePath = `${userId}/${Date.now()}.${fileExtension}`;
  await deleteOldAvatars(userId);
  return uploadFile(StorageBucket.Avatars, filePath, file);
}
