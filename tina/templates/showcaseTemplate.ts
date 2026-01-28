import { Template } from 'tinacms';

import {
  animationField,
  sectionHeaderField,
  sectionIdField,
} from '@/tina/fields';

export const showcaseTemplate: Template = {
  name: 'showcase',
  label: 'Showcase Section',
  fields: [
    sectionIdField,
    animationField,
    sectionHeaderField,
    {
      type: 'object',
      name: 'projects',
      label: 'Projects',
      list: true,
      required: true,
      ui: {
        itemProps: (item) => ({ label: item?.name }),
      },
      fields: [
        {
          name: 'image',
          label: 'Image',
          type: 'image',
          required: true,
        },
        {
          name: 'name',
          label: 'Name',
          type: 'string',
          required: true,
        },
        {
          name: 'link',
          label: 'Link URL',
          type: 'string',
          required: true,
          ui: {
            description: 'e.g., https://asaasin.dev',
          },
        },
        {
          name: 'website',
          label: 'Website',
          type: 'string',
          required: true,
          ui: {
            description: 'e.g., asaasin.dev',
          },
        },
      ],
    },
  ],
};
