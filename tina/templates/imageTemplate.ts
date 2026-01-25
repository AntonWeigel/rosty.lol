import { Template } from 'tinacms';

import { imageField } from '@/tina/fields';
import { getSectionLabel } from '@/utils';

export const imageTemplate: Template = {
  name: 'image',
  label: 'Image Section',
  ui: {
    itemProps: (item) => ({
      label: getSectionLabel(item),
    }),
  },
  fields: [
    ...((imageField.fields as any) || []),
    {
      type: 'object',
      name: 'source',
      label: 'Source',
      fields: [
        {
          type: 'string',
          name: 'title',
          label: 'Title',
          required: true,
        },
        {
          type: 'string',
          name: 'url',
          label: 'URL',
          required: true,
        },
      ],
    },
  ],
};
