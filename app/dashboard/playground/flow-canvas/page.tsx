import { Metadata } from 'next';

import { FlowCanvas } from '@/components/FlowCanvas';

export const metadata: Metadata = {
  title: 'Flow Canvas',
  description:
    'Design logic visually using Flow Canvas. Drag, drop, and connect smart components to prototype your SaaS workflows in the demo.',
};

export default function Page() {
  return <FlowCanvas />;
}
