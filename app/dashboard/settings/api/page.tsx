import { Metadata } from 'next';

import { ApiTokensDataTable } from '@/components/ApiTokenDataTable';

export const metadata: Metadata = {
  title: 'API Settings',
  description: 'Manage API tokens in the demo dashboard.',
};

export default function Page() {
  return <ApiTokensDataTable />;
}
