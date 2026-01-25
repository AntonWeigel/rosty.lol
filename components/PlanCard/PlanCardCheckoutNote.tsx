import * as React from 'react';

export const PlanCardCheckoutNote: React.FC<
  React.HTMLAttributes<HTMLSpanElement>
> = (props) => (
  <span
    className="text-secondary-dark dark:text-neutral text-center text-xs font-medium"
    {...props}
  />
);
