'use client';

import { TrendingUp } from 'lucide-react';
import * as React from 'react';
import { CartesianGrid, Line, LineChart, XAxis } from 'recharts';

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
  { month: 'January', desktop: 12500, mobile: 8500 },
  { month: 'February', desktop: 14800, mobile: 9600 },
  { month: 'March', desktop: 15300, mobile: 10200 },
  { month: 'April', desktop: 17800, mobile: 12300 },
  { month: 'May', desktop: 19100, mobile: 13200 },
  { month: 'June', desktop: 20500, mobile: 14500 },
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

export const RevenueLineChart: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Revenue Growth</CardTitle>
        <CardDescription>January - June 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="desktop"
              type="monotone"
              stroke="var(--color-desktop)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="mobile"
              type="monotone"
              stroke="var(--color-mobile)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="text:secondary-dark dark:text-secondary-light flex items-center gap-2 leading-none font-medium">
              Trending up by 7.1% this month <TrendingUp className="size-4" />
            </div>
            <div className="text-secondary-dark/50 dark:text-neutral flex items-center gap-2 leading-none">
              Showing total revenue for the last 6 months
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};
