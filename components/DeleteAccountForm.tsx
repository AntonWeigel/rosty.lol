'use client';

import { UserRoundX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { deleteAccountAction } from '@/app/actions';
import { DashboardCard } from '@/components/DashboardCard';
import { PasswordInput } from '@/components/PasswordInput';
import { TransitionButton } from '@/components/TransitionButton';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/AlertDialog';
import { Button } from '@/components/ui/Button';
import { Separator } from '@/components/ui/Separator';
import { AppRoute } from '@/constants/routes';
import { useToast } from '@/hooks';

export const DeleteAccountForm: React.FC = () => {
  const [password, setPassword] = React.useState('');
  const [isPending, startTransition] = React.useTransition();
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    const formData = new FormData();
    formData.append('password', password);

    try {
      const response = await deleteAccountAction(formData);

      if (response.success) {
        toast({
          title: 'Account deleted',
          description: 'Your account has been successfully deleted.',
          variant: 'success',
        });

        setOpen(false);
        router.push(AppRoute.SignInPage);
      } else {
        toast({
          title: 'Error',
          description: response.error || 'Failed to delete account.',
          variant: 'destructive',
        });
      }
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div>
      <DashboardCard>
        <DashboardCard.Header className="text-destructive">
          Danger zone
        </DashboardCard.Header>

        <DashboardCard.Content className="border-destructive/20 bg-destructive/10 text-secondary-dark dark:text-secondary-light rounded-xl border p-3 text-sm leading-relaxed">
          Caution! This action is irreversible. Your data will be deleted and
          your account will be closed immediately.
        </DashboardCard.Content>

        <DashboardCard.Footer>
          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <UserRoundX className="size-4" />
                <span>Close account</span>
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirm close</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. Please enter your password to
                  confirm account deletion.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <div className="flex flex-col gap-4">
                <input
                  type="email"
                  name="email"
                  autoComplete="username"
                  className="hidden"
                />
                <PasswordInput
                  name="password"
                  placeholder="Enter your password"
                  autoComplete="new-password"
                  variant="secondary"
                  className="bg-primary-light/50 my-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Separator />
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <TransitionButton
                    type="button"
                    variant="destructive"
                    isPending={isPending}
                    pendingText="Deleting…"
                    onClick={() => startTransition(handleDelete)}
                  >
                    Close account
                  </TransitionButton>
                </AlertDialogFooter>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </DashboardCard.Footer>
      </DashboardCard>
    </div>
  );
};
