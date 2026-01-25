import { Metadata } from 'next';

import { ProjectsDataTable } from '@/components/ProjectsDataTable';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'View and manage all your projects in one place. Organize, access, and monitor project progress in the demo dashboard.',
};

export default async function Page() {
  return <ProjectsDataTable />;
}
