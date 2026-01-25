'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { signOutAction } from '@/app/actions';
import { AppRoute } from '@/constants/routes';
import { useToast, useUserProfile } from '@/hooks';
import { cn } from '@/utils';

export const SignOutButton = ({
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { refetch } = useUserProfile();
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      const result = await signOutAction();

      if (result.success) {
        toast({
          title: 'Signed out',
          description: 'You have been signed out successfully.',
          variant: 'success',
        });

        await refetch();
        router.push(AppRoute.SignInPage);
      } else {
        toast({
          title: 'Logout failed',
          description: result.error ?? 'An unexpected error occurred.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <button
      type="button"
      className={cn(className, 'flex w-full items-center gap-2')}
      onClick={handleSignOut}
      disabled={isPending}
      {...props}
    >
      <LogOut className="size-4" />
      Sign out
    </button>
  );
};
