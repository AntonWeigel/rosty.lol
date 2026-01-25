'use client';

import * as React from 'react';

import { Position } from '@/constants/enums';
import { useInView } from '@/hooks';
import { LandingSectionsKeyMetricsMetrics } from '@/tina/__generated__/types';
import { cn } from '@/utils';

export const MetricCard: React.FC<LandingSectionsKeyMetricsMetrics> = ({
  value,
  suffix,
  unit,
  label,
}) => {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.5 });
  const [count, setCount] = React.useState(0);
  const [hasReachedMax, setHasReachedMax] = React.useState(false);
  const position = unit?.position ?? Position.Right;
  const symbol = unit?.symbol;

  React.useEffect(() => {
    if (!isInView || count >= value) return;

    const step = Math.ceil(value / 50);
    const interval = setInterval(() => {
      setCount((prev) => {
        const next = prev + step;
        if (next >= value) {
          clearInterval(interval);
          setHasReachedMax(true);
          return value;
        }
        return next;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [isInView, count, value]);

  return (
    <div
      ref={ref}
      className="flex max-w-[280px] flex-1 basis-[200px] flex-col items-center gap-4"
    >
      <div className="text-accent flex w-full items-center justify-center gap-2 font-bold">
        {symbol && position === Position.Left && (
          <span className="text-4xl sm:text-5xl">{symbol}</span>
        )}

        <div className="flex items-center justify-center">
          <span
            className={cn(
              'text-7xl sm:text-8xl',
              hasReachedMax && 'animate-scale-pop',
            )}
          >
            {count}
          </span>
          {suffix && <span className="text-4xl sm:text-5xl">{suffix}</span>}
        </div>

        {symbol && position === Position.Right && (
          <span className="text-4xl sm:text-5xl">{symbol}</span>
        )}
      </div>

      <p className="text-secondary-dark dark:text-neutral text-center">
        {label}
      </p>
    </div>
  );
};
