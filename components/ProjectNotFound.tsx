'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import * as React from 'react';

import animationDataDark from '@/assets/animation/project-placeholder-dark.json';
import animationDataLight from '@/assets/animation/project-placeholder-light.json';
import { Animation } from '@/components/Animation';
import { DashboardSection } from '@/components/DashboardSection';
import { DashboardRoute } from '@/constants/routes';

export const ProjectNotFound: React.FC = ({}) => {
  const isDark = useTheme().resolvedTheme === 'dark';
  const animationData = isDark ? animationDataDark : animationDataLight;

  return (
    <DashboardSection>
      <DashboardSection.Content>
        <div className="flex max-w-xl flex-col items-center gap-8 p-8">
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-primary-dark dark:text-primary-light text-3xl">
              Project Not Found
            </h2>
            <p className="text-secondary-dark dark:text-neutral">
              We couldn’t find the project you’re looking for. It may have been
              deleted or you might not have access to it.{' '}
              <Link className="underline" href={DashboardRoute.ProjectsPage}>
                View all projects
              </Link>
              .
            </p>
          </div>
          <Animation animationData={animationData} />
        </div>
      </DashboardSection.Content>
    </DashboardSection>
  );
};
