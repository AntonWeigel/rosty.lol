import * as React from 'react';

import { RichText } from '@/components/RichText';
import {
  DocSectionsText,
  PageSectionsText,
  PostSectionsText,
} from '@/tina/__generated__/types';

type TextTemplateProps = PageSectionsText | PostSectionsText | DocSectionsText;

export const TextTemplate: React.FC<TextTemplateProps> = ({ content }) => {
  return <RichText content={content} />;
};
