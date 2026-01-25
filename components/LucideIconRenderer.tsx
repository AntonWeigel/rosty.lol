import type { LucideProps } from 'lucide-react';
import React from 'react';

import { LucideIcon } from '@/constants/enums';
import { LucideIconMap } from '@/constants/maps';

type LucideIconRendererProps = {
  icon?: string | null;
} & LucideProps;

export const LucideIconRenderer: React.FC<LucideIconRendererProps> = ({
  icon,
  ...props
}) => {
  if (!icon) return null;
  const IconComponent = LucideIconMap[icon as LucideIcon];
  return IconComponent ? <IconComponent {...props} /> : null;
};
