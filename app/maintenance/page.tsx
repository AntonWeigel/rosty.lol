import { redirect } from 'next/navigation';

import { features } from '@/config/features';
import { AppRoute } from '@/constants/routes';

export default function MaintenancePage() {
  if (!features.maintenance) {
    redirect(AppRoute.HomePage);
  }

  return (
    <main className="bg-primary-dark text-primary-light flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="max-w-xl">
        <h1 className="mb-4 text-4xl font-bold md:text-5xl">
          We’ll be back soon
        </h1>
        <p className="text-neutral mt-2 text-lg md:text-xl">
          Our site is currently undergoing scheduled maintenance. Please check
          back later - we appreciate your patience!
        </p>
      </div>
    </main>
  );
}
