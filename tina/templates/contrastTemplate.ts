import { Template } from 'tinacms';

import {
  animationField,
  listItemsField,
  sectionHeaderField,
  sectionIdField,
} from '@/tina/fields';

export const contrastTemplate: Template = {
  name: 'contrast',
  label: 'Contrast Section',
  fields: [
    sectionIdField,
    animationField,
    sectionHeaderField,
    {
      type: 'object',
      name: 'negativeColumn',
      label: 'Left Column (Negative)',
      required: true,
      fields: [
        {
          type: 'string',
          name: 'title',
          label: 'Title',
          required: true,
        },
        listItemsField,
      ],
    },
    {
      type: 'object',
      name: 'positiveColumn',
      label: 'Right Column (Positive)',
      required: true,
      fields: [
        {
          type: 'string',
          name: 'title',
          label: 'Title',
          required: true,
        },
        listItemsField,
      ],
    },
  ],
};
