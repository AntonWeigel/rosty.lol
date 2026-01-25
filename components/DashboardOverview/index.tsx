import * as React from 'react';

import { BrowserShareDonutChart } from './BrowserShareDonutChart';
import { NewRegistrationsBarChart } from './NewRegistrationsBarChart';
import { RevenueLineChart } from './RevenueLineChart';
import { TotalVisitorsAreaInteractiveChart } from './TotalVisitorsAreaInteractiveChart';

export const DashboardOverview: React.FC = () => {
  return (
    <div className="flex flex-col justify-center gap-10">
      <div className="grid w-full [grid-template-columns:repeat(auto-fit,minmax(300px,1fr))] gap-10">
        <RevenueLineChart />
        <NewRegistrationsBarChart />
        <BrowserShareDonutChart />
      </div>
      <div className="flex w-full">
        <TotalVisitorsAreaInteractiveChart />
      </div>
    </div>
  );
};
