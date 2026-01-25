'use client';

import { TrendingUp } from 'lucide-react';
import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/Chart';

const chartData = [
  { month: 'January', desktop: 310, mobile: 240 },
  { month: 'February', desktop: 370, mobile: 280 },
  { month: 'March', desktop: 400, mobile: 300 },
  { month: 'April', desktop: 420, mobile: 350 },
  { month: 'May', desktop: 460, mobile: 390 },
  { month: 'June', desktop: 490, mobile: 420 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: 'Mobile',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export const NewRegistrationsBarChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Registrations</CardTitle>
        <CardDescription>January - June 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
            <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 6.8% this month <TrendingUp className="size-4" />
        </div>
        <div className="text-secondary-dark/50 dark:text-neutral leading-none">
          Showing new users for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
};
