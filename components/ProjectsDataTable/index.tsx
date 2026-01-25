'use client';

import { Layers, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { createProjectAction, deleteProjectAction } from '@/app/actions';
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
import { DashboardRoute } from '@/constants/routes';
import { useProjects, useToast } from '@/hooks';
import { Project } from '@/types';

import { columns } from './columns';

export const ProjectsDataTable: React.FC = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { projects, isLoading, mutate } = useProjects();
  const [isCreating, startCreating] = React.useTransition();
  const [isDeleting, startDeleting] = React.useTransition();
  const [selectedProject, setSelectedProject] = React.useState<Project | null>(
    null,
  );
  const [newProjectName, setNewProjectName] = React.useState('');
  const [createDialogOpen, setCreateDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleDeleteClick = (project: Project) => {
    setSelectedProject(project);
    setDeleteDialogOpen(true);
  };

  const handleCreate = async () => {
    if (!newProjectName.trim()) return;

    const formData = new FormData();
    formData.append('name', newProjectName);

    const result = await createProjectAction(formData);

    if (result.success && result.data?.id) {
      toast({
        title: 'Project created',
        description: 'New project was successfully created',
        variant: 'success',
      });
      setNewProjectName('');
      setCreateDialogOpen(false);
      await mutate();
      router.push(`${DashboardRoute.ProjectsPage}/${result.data.id}`);
    } else {
      toast({
        title: 'Error creating project',
        description: result.error || 'Error creating project',
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedProject) return;

    const formData = new FormData();
    formData.append('id', selectedProject.id);

    const result = await deleteProjectAction(formData);
    if (result.success) {
      toast({
        title: 'Project removed',
        description: 'The project was successfully deleted.',
        variant: 'success',
      });
      setDeleteDialogOpen(false);
      setSelectedProject(null);
      await mutate();
    } else {
      toast({
        title: 'Failed to delete project',
        description: 'Something went wrong while deleting the project.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <Skeleton className="h-[220px] w-full rounded-2xl" />;
  }

  return (
    <>
      <DataTable data={projects} columns={columns(handleDeleteClick)}>
        <DataTable.Header>
          <DataTable.Searchbar searchColumn="name" />
          <DataTable.Actions>
            <AlertDialog
              open={createDialogOpen}
              onOpenChange={setCreateDialogOpen}
            >
              <AlertDialogTrigger asChild>
                <Button variant="outline">
                  <Layers className="hidden size-4 sm:block" />
                  <span>Create</span>
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Create New Project</AlertDialogTitle>
                  <AlertDialogDescription>
                    Enter a name for your new project.
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
                    value={newProjectName}
                    onChange={(e) => setNewProjectName(e.target.value)}
                    placeholder="Project name…"
                    required
                  />

                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <TransitionButton
                      type="submit"
                      variant="highlight"
                      pendingText="Creating…"
                      isPending={isCreating}
                      icon={<Layers className="size-4" />}
                    >
                      Create
                    </TransitionButton>
                  </AlertDialogFooter>
                </form>
              </AlertDialogContent>
            </AlertDialog>
          </DataTable.Actions>
        </DataTable.Header>
      </DataTable>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Project</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Are you sure you want to delete{' '}
              <strong>{selectedProject?.name}</strong> project?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <TransitionButton
              variant="destructive"
              pendingText="Deleting…"
              isPending={isDeleting}
              icon={<Trash2 className="size-4" />}
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
