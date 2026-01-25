import * as React from 'react';

import { ProductBadge } from '@/components/ui/ProductBadge';
import { FeaturedOnTwelveToolsIcon } from '@/icons/badges';

export const FeaturedOnTwelveTools: React.FC = () => (
  <ProductBadge href="https://twelve.tools">
    <FeaturedOnTwelveToolsIcon />
  </ProductBadge>
);
