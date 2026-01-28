import { Template } from 'tinacms';

import {
  animationField,
  sectionHeaderField,
  sectionIdField,
} from '@/tina/fields';

export const faqTemplate: Template = {
  name: 'faq',
  label: 'FAQ Section',
  fields: [
    sectionIdField,
    animationField,
    sectionHeaderField,
    {
      type: 'object',
      name: 'items',
      label: 'Questions',
      list: true,
      required: true,
      ui: {
        itemProps: (item) => ({
          label: item.question ? item.question : 'New question',
        }),
      },
      fields: [
        {
          type: 'string',
          name: 'question',
          label: 'Question',
          required: true,
          description: 'The question title shown on the accordion',
        },
        {
          type: 'rich-text',
          name: 'answer',
          label: 'Answer',
          required: true,
          description: 'The answer text shown when expanded',
        },
      ],
    },
  ],
};
