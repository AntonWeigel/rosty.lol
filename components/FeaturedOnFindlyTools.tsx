import * as React from 'react';

import { ProductBadge } from '@/components/ui/ProductBadge';
import { FeaturedOnFindlyToolsIcon } from '@/icons/badges';

export const FeaturedOnFindlyTools: React.FC = () => (
  <ProductBadge href="https://findly.tools">
    <FeaturedOnFindlyToolsIcon />
  </ProductBadge>
);
