'use client';

import { KeyRound, TriangleAlert } from 'lucide-react';
import * as React from 'react';

import { createApiTokenAction, deleteApiTokenAction } from '@/app/actions';
import { DataTable } from '@/components/DataTable';
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
import { Input } from '@/components/ui/Input';
import { Skeleton } from '@/components/ui/Skeleton';
import { useApiTokens, useToast } from '@/hooks';
import { ApiToken } from '@/types';

import { ApiTokenCard } from './ApiTokenCard';
import { columns } from './columns';

export const ApiTokensDataTable: React.FC = () => {
  const { toast } = useToast();
  const { tokens, isLoading, mutate } = useApiTokens();
  const [isCreating, startCreating] = React.useTransition();
  const [isDeleting, startDeleting] = React.useTransition();
  const [newTokenName, setNewTokenName] = React.useState('');
  const [createdToken, setCreatedToken] = React.useState<string | null>(null);
  const [selectedToken, setSelectedToken] = React.useState<ApiToken | null>(
    null,
  );
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleDeleteClick = (token: ApiToken) => {
    setSelectedToken(token);
    setDeleteDialogOpen(true);
  };

  const handleCreate = async () => {
    if (!newTokenName.trim()) return;

    const formData = new FormData();
    formData.append('name', newTokenName);

    const result = await createApiTokenAction(formData);

    if (result.success && result.data?.token) {
      toast({
        title: 'Token Created',
        description: 'Save this token securely. You will not see it again!',
        variant: 'success',
      });
      setCreatedToken(result.data.token);
      setNewTokenName('');
      setCreateDialogOpen(false);
      await mutate();
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Failed to create token',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedToken) return;

    const formData = new FormData();
    formData.append('id', selectedToken.id);

    const result = await deleteApiTokenAction(formData);

    if (result.success) {
      toast({
        title: 'Token Removed',
        description: 'The token was successfully deleted.',
        variant: 'success',
      });
      setDeleteDialogOpen(false);
      setSelectedToken(null);
      await mutate();
      setCreatedToken(null);
    } else {
      toast({
        title: 'Failed to Delete Token',
        description: result.error || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <Skeleton className="h-[220px] w-full rounded-2xl" />;
  }

  return (
    <>
      {createdToken && (
        <ApiTokenCard
          token={createdToken}
          onDismiss={() => setCreatedToken('')}
        />
      )}

      <DataTable columns={columns(handleDeleteClick)} data={tokens}>
        <DataTable.Header className="flex-col sm:flex-row">
          <div className="text-secondary-dark dark:text-neutral flex max-w-[620px] items-center gap-3">
            <div className="flex">
              <TriangleAlert className="size-3.5" />
            </div>
            <span className="text-xs">
              Personal access tokens can be used to control your whole account
              and use features added in the future. Be careful when sharing
              them!
            </span>
          </div>
          <DataTable.Actions>
            <AlertDialog
              open={createDialogOpen}
              onOpenChange={setCreateDialogOpen}
            >
              <AlertDialogTrigger asChild>
                <Button variant="outline">
                  <KeyRound className="size-4" />
                  <span>Generate</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Generate Token</AlertDialogTitle>
                  <AlertDialogDescription>
                    Enter a name for your new token
                  </AlertDialogDescription>
                </AlertDialogHeader>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    startCreating(handleCreate);
                  }}
                  className="flex flex-col items-center gap-8"
                >
                  <Input
                    name="name"
                    placeholder="Token name…"
                    value={newTokenName}
                    onChange={(e) => setNewTokenName(e.target.value)}
                    required
                  />

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <TransitionButton
                      type="submit"
                      variant="highlight"
                      pendingText="Generating…"
                      isPending={isCreating}
                      icon={<KeyRound className="size-4" />}
                    >
                      Generate
                    </TransitionButton>
                  </AlertDialogFooter>
                </form>
              </AlertDialogContent>
            </AlertDialog>
          </DataTable.Actions>
        </DataTable.Header>
      </DataTable>

      {/*Delete Confirmation Dialog*/}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Token</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to delete{' '}
              <strong>{selectedToken?.name}</strong> token?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <TransitionButton
              variant="destructive"
              pendingText="Deleting…"
              isPending={isDeleting}
              onClick={() => startDeleting(handleDelete)}
            >
              Delete
            </TransitionButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
