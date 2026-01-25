import * as React from 'react';

import {
  CodeBlockTemplate,
  HeaderTemplate,
  ImageTemplate,
  InfoBlockTemplate,
  TextTemplate,
} from '@/components/SectionTemplates';
import { DocSections, Maybe } from '@/tina/__generated__/types';

export const DocsSections: React.FC<{
  sections?: Maybe<Maybe<DocSections>[]>;
}> = ({ sections }) => {
  if (!sections) return null;

  const renderSection = (section: Maybe<DocSections>, index: number) => {
    if (!section) return null;

    const key = `${index}-${section.__typename}`;

    switch (section.__typename) {
      case 'DocSectionsHeader':
        return <HeaderTemplate key={key} {...section} />;
      case 'DocSectionsText':
        return <TextTemplate key={key} {...section} />;
      case 'DocSectionsImage':
        return <ImageTemplate key={key} {...section} />;
      case 'DocSectionsCodeBlock':
        return <CodeBlockTemplate key={key} {...section} />;
      case 'DocSectionsInfoBlock':
        return <InfoBlockTemplate key={key} {...section} />;
      default:
        console.log(`Template ${section.__typename} is not implemented.`);
        return null;
    }
  };

  return (
    <section className="mb-24 flex w-full max-w-screen-md flex-col gap-6">
      {sections.map(renderSection)}
    </section>
  );
};
