import * as React from 'react';

import { updateUserProfileAction } from '@/app/actions';
import { useDragAndDrop, useToast, useUserProfile } from '@/hooks';
import { UserProfile } from '@/types';
import { compressImage, validateFileSize, validateFileType } from '@/utils';

export const useUpdateUserProfileForm = (
  initialUserProfile: UserProfile | null,
) => {
  const { userProfile, refetch } = useUserProfile(initialUserProfile);
  const [previewAvatar, setPreviewAvatar] = React.useState(
    initialUserProfile?.avatar || '',
  );
  const [name, setName] = React.useState(initialUserProfile?.name || '');
  const [selectedAvatarFile, setSelectedAvatarFile] =
    React.useState<File | null>(null);
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();

  React.useEffect(() => {
    if (userProfile) {
      setPreviewAvatar(userProfile.avatar || '');
      setName(userProfile.name || '');
    }
  }, [userProfile]);

  const handleAvatarChange = async (files: FileList) => {
    const file = files[0];

    if (file) {
      const typeError = validateFileType(file);
      if (typeError) {
        toast({
          title: 'Invalid file type',
          description: typeError,
          variant: 'destructive',
        });
        return;
      }

      const processedFile = await compressImage(file);

      const sizeError = validateFileSize(processedFile);
      if (sizeError) {
        toast({
          title: 'File Too Large',
          description: `${file.name}: Could not compress below 1MB.`,
          variant: 'destructive',
        });
        return;
      }

      setSelectedAvatarFile(processedFile);
      setPreviewAvatar(URL.createObjectURL(processedFile));
    }
  };

  const handleDeleteAvatar = () => {
    setSelectedAvatarFile(null);
    setPreviewAvatar('');
  };

  const { bind, isDragging, handleInputChange } =
    useDragAndDrop(handleAvatarChange);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    if (selectedAvatarFile) {
      formData.append('avatarFile', selectedAvatarFile);
    }

    startTransition(async () => {
      try {
        await updateUserProfileAction(formData);
        await refetch();

        toast({
          title: 'Profile Updated',
          description: 'Your profile has been successfully updated.',
          variant: 'success',
        });
      } catch (err) {
        console.error(err);
        toast({
          title: 'Update Failed',
          description:
            'There was an error updating your profile. Please try again.',
          variant: 'destructive',
        });
      }
    });
  };

  return {
    name,
    setName,
    previewAvatar,
    handleInputChange,
    handleDeleteAvatar,
    bind,
    isDragging,
    handleSubmit,
    isPending,
  };
};
