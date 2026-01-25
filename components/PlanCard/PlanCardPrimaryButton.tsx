import * as React from 'react';

import {
  TransitionButton,
  TransitionButtonProps,
} from '@/components/TransitionButton';

export const PlanCardPrimaryButton: React.FC<TransitionButtonProps> = (
  props,
) => <TransitionButton size="lg" {...props} />;
