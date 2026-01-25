import { Template } from 'tinacms';

import { getSectionLabel } from '@/utils';

export const textTemplate: Template = {
  name: 'text',
  label: 'Text Section',
  ui: {
    itemProps: (item) => ({
      label: getSectionLabel(item),
    }),
  },
  fields: [
    {
      type: 'rich-text',
      name: 'content',
      label: 'Content',
      required: true,
    },
  ],
};
