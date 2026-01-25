import * as React from 'react';

import { ProductBadge } from '@/components/ui/ProductBadge';
import { BuiltWithAsaasinIcon } from '@/icons/badges';

export const BuiltWithAsaasin: React.FC = () => (
  <ProductBadge href="https://asaasin.dev">
    <BuiltWithAsaasinIcon />
  </ProductBadge>
);
