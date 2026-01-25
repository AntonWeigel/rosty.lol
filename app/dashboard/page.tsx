import { DashboardOverview } from '@/components/DashboardOverview';
import { SubscribeRedirector } from '@/components/SubscribeRedirector';

export default function Page() {
  return (
    <>
      <SubscribeRedirector />
      <DashboardOverview />
    </>
  );
}
