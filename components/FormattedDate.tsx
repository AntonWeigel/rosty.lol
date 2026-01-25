import * as React from 'react';

import { formatDateShort } from '@/utils';

export const FormattedDate: React.FC<{ timestamp: number | string }> = ({
  timestamp,
}) => (
  <span className="text-center text-[10px] font-semibold tracking-wide uppercase">
    {formatDateShort(timestamp)}
  </span>
);
