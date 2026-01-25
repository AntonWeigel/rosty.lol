import * as React from 'react';

import { Button, ButtonProps } from '@/components/ui/Button';

export const PlanCardSecondaryButton: React.FC<ButtonProps> = (props) => (
  <Button
    variant="ghost"
    size="sm"
    className="text-secondary-dark dark:text-neutral h-auto px-2 py-1 text-xs font-medium"
    {...props}
  />
);
