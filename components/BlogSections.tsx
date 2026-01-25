import * as React from 'react';

import {
  HeaderTemplate,
  ImageTemplate,
  TextTemplate,
} from '@/components/SectionTemplates';
import { Maybe, PostSections } from '@/tina/__generated__/types';

export const BlogSections: React.FC<{
  sections?: Maybe<Maybe<PostSections>[]>;
}> = ({ sections }) => {
  if (!sections) return null;

  const renderSection = (section: Maybe<PostSections>, index: number) => {
    if (!section) return null;

    const key = `${index}-${section.__typename}`;

    switch (section.__typename) {
      case 'PostSectionsHeader':
        return <HeaderTemplate key={key} {...section} />;
      case 'PostSectionsText':
        return <TextTemplate key={key} {...section} />;
      case 'PostSectionsImage':
        return <ImageTemplate key={key} {...section} />;
      default:
        console.log(`Template ${section.__typename} is not implemented.`);
        return null;
    }
  };

  return (
    <section className="flex w-full max-w-screen-md flex-col gap-6">
      {sections.map(renderSection)}
    </section>
  );
};
