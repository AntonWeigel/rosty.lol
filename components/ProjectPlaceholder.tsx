'use client';

import { Check, MessageCircle } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { markProjectAsCompleteAction } from '@/app/actions';
import animationDataDark from '@/assets/animation/project-placeholder-dark.json';
import animationDataLight from '@/assets/animation/project-placeholder-light.json';
import { Animation } from '@/components/Animation';
import { DashboardSection } from '@/components/DashboardSection';
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
import { useProject, useToast } from '@/hooks';
import { Project } from '@/types';

type ProjectPlaceholderProps = {
  project: Project;
};

export const ProjectPlaceholder: React.FC<ProjectPlaceholderProps> = ({
  project,
}) => {
  const { project: projectData, mutate } = useProject(project.id);
  const { toast } = useToast();
  const [isMarking, startMarking] = React.useTransition();
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const isCompleted = projectData?.status === 'completed';
  const isDark = useTheme().resolvedTheme === 'dark';
  const animationData = isDark ? animationDataDark : animationDataLight;

  const handleMarkComplete = async () => {
    if (!projectData) return;

    const formData = new FormData();
    formData.append('id', project.id);

    const result = await markProjectAsCompleteAction(formData);

    if (result.success) {
      mutate();
      setIsDialogOpen(false);

      toast({
        title: 'Project Completed',
        description: `${projectData.name} has been successfully marked as completed.`,
        variant: 'success',
      });
    } else {
      toast({
        title: 'Error',
        description: result.error || 'Failed to mark project as completed.',
        variant: 'destructive',
      });
    }
  };

  return (
    <DashboardSection>
      <DashboardSection.Header>
        <h1 className="text-primary-dark dark:text-primary-light hidden text-sm font-medium sm:block">
          {project.name}
        </h1>
        <DashboardSection.Actions>
          <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="outline" disabled={isCompleted}>
                <Check className="hidden size-4 sm:block" />
                <span>{isCompleted ? 'Completed' : 'Complete'}</span>
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Complete Project</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to mark{' '}
                  <strong>{projectData?.name}</strong> as completed?
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <TransitionButton
                  variant="highlight"
                  isPending={isMarking}
                  pendingText="Completing…"
                  onClick={() => startMarking(handleMarkComplete)}
                  icon={<Check className="size-4" />}
                >
                  Complete
                </TransitionButton>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <Button variant="outline" disabled>
            <MessageCircle className="hidden size-4 sm:block" />
            <span>Comments</span>
          </Button>
        </DashboardSection.Actions>
      </DashboardSection.Header>

      <DashboardSection.Content>
        <div className="mt-4 flex max-w-xl flex-col items-center gap-8 sm:mt-8">
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-primary-dark dark:text-primary-light text-3xl">
              Build Your Business Logic here
            </h2>
            <p className="text-secondary-dark dark:text-neutral">
              For example: if you are building a marketplace, you can create
              entities like Product, Category, Order etc.
            </p>
          </div>
          <Animation animationData={animationData} />
        </div>
      </DashboardSection.Content>
    </DashboardSection>
  );
};
