import * as React from 'react';

import { RichText } from '@/components/RichText';
import { DocSectionsInfoBlock } from '@/tina/__generated__/types';

export const InfoBlockTemplate: React.FC<DocSectionsInfoBlock> = ({
  content,
}) => (
  <div className="border-highlight/70 bg-secondary-light dark:bg-primary-dark rounded-r-xl border-l-4 px-6 py-4 font-medium">
    <RichText
      className="[&_code]:bg-primary-light dark:[&_code]:bg-secondary-dark dark:[&_li]:text-secondary-light dark:[&_p]:text-secondary-light"
      content={content}
    />
  </div>
);
