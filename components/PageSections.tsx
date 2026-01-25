import * as React from 'react';

import {
  HeaderTemplate,
  ImageTemplate,
  TextTemplate,
} from '@/components/SectionTemplates';
import { Maybe, PageSections as Sections } from '@/tina/__generated__/types';

export const PageSections: React.FC<{
  sections?: Maybe<Maybe<Sections>[]>;
}> = ({ sections }) => {
  if (!sections) return null;

  const renderSection = (section: Maybe<Sections>, index: number) => {
    if (!section) return null;

    const key = `${index}-${section.__typename}`;

    switch (section.__typename) {
      case 'PageSectionsHeader':
        return <HeaderTemplate key={key} {...section} />;
      case 'PageSectionsText':
        return <TextTemplate key={key} {...section} />;
      case 'PageSectionsImage':
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
