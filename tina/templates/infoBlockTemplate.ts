import { Template } from 'tinacms';

import { getSectionLabel } from '@/utils';

export const infoBlockTemplate: Template = {
  name: 'infoBlock',
  label: 'Info Block Section',
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
