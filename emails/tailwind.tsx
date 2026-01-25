import {
  Tailwind as ReactEmailTailwind,
  TailwindProps,
} from '@react-email/components';
import * as React from 'react';

import { HexColors } from '@/constants/colors';

const Tailwind: React.FC<TailwindProps> = (props) => (
  <ReactEmailTailwind
    {...props}
    config={{
      theme: {
        extend: {
          colors: {
            ...HexColors,
          },
        },
      },
    }}
  />
);

export default Tailwind;
