import { Metadata } from 'next';

import { ProjectNotFound } from '@/components/ProjectNotFound';
import { ProjectPlaceholder } from '@/components/ProjectPlaceholder';
import { fetchProjectById } from '@/services/project';

export async function generateMetadata(props: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await props.params;
  const project = await fetchProjectById(id);

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'This project could not be found.',
    };
  }

  return {
    title: project.name,
    description: `Manage project "${project.name}" and view its details in the demo dashboard.`,
  };
}

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const project = await fetchProjectById(id);

  if (!project) {
    return <ProjectNotFound />;
  }

  return <ProjectPlaceholder project={project} />;
}
