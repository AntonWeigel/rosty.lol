'use client';

import { Save, Trash2 } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';

import { DashboardCard } from '@/components/DashboardCard';
import { TransitionButton } from '@/components/TransitionButton';
import { Input } from '@/components/ui/Input';
import { ALLOWED_FILE_TYPES } from '@/constants';
import { UserProfile } from '@/types';
import { cn } from '@/utils';

import { useUpdateUserProfileForm } from './useUpdateUserProfileForm';

type UpdateProfileFormProps = {
  initialUserProfile: UserProfile | null;
};

export const UpdateUserProfileForm: React.FC<UpdateProfileFormProps> = ({
  initialUserProfile,
}) => {
  const {
    name,
    setName,
    previewAvatar,
    isDragging,
    bind,
    handleInputChange,
    handleDeleteAvatar,
    handleSubmit,
    isPending,
  } = useUpdateUserProfileForm(initialUserProfile);

  return (
    <form onSubmit={handleSubmit}>
      <DashboardCard>
        <DashboardCard.Header>Update Profile</DashboardCard.Header>
        <DashboardCard.Content>
          <div className="flex flex-col items-center">
            <div className="group relative">
              <label htmlFor="avatar-upload" className="cursor-pointer">
                <div
                  className={cn(
                    'group bg-secondary-light dark:bg-primary-dark relative size-[160px] overflow-hidden rounded-full border',
                    isDragging
                      ? 'border-highlight/50 border-dashed'
                      : 'dark:border-secondary-light/20 border-secondary-dark/20',
                  )}
                  {...bind}
                >
                  {previewAvatar && (
                    <Image
                      src={previewAvatar}
                      alt="Avatar"
                      sizes="160px"
                      className="object-cover"
                      priority
                      fill
                    />
                  )}

                  <div
                    className={`absolute inset-0 flex items-center justify-center ${
                      previewAvatar
                        ? 'text-secondary-light bg-black/50 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100'
                        : 'bg-primary-light/50 dark:bg-primary-dark opacity-100'
                    }`}
                  >
                    <span className="p-4 text-center text-lg leading-relaxed">
                      Drag & drop your image or{' '}
                      <span className="underline">browse</span>
                    </span>
                  </div>
                  {/* Hidden Inputs for Avatar Handling */}
                  <input
                    type="hidden"
                    name="existingAvatar"
                    className="hidden"
                    value={previewAvatar}
                  />
                  <input
                    type="file"
                    id="avatar-upload"
                    accept={ALLOWED_FILE_TYPES.join(',')}
                    className="hidden"
                    onChange={handleInputChange}
                  />
                </div>
              </label>

              {previewAvatar && (
                <button
                  type="button"
                  onClick={handleDeleteAvatar}
                  className="border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/20 absolute top-0.5 right-0.5 rounded-full border p-2 opacity-100 transition-opacity duration-300 group-hover:opacity-100 md:opacity-0"
                >
                  <Trash2 className="size-4" />
                </button>
              )}
            </div>
          </div>

          <Input
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="bg-primary-light/50 dark:bg-secondary-dark/50 mt-4"
          />
        </DashboardCard.Content>
        <DashboardCard.Footer>
          <TransitionButton
            type="submit"
            variant="outline"
            isPending={isPending}
            icon={<Save className="size-4" />}
            pendingText="Saving…"
          >
            Save
          </TransitionButton>
        </DashboardCard.Footer>
      </DashboardCard>
    </form>
  );
};
