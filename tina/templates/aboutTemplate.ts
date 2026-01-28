import { Template } from 'tinacms';

import {
  animationField,
  imageField,
  sectionHeaderField,
  sectionIdField,
} from '@/tina/fields';

export const aboutTemplate: Template = {
  name: 'about',
  label: 'About Section',
  fields: [
    sectionIdField,
    animationField,
    sectionHeaderField,
    imageField,
    {
      type: 'string',
      name: 'description',
      label: 'Description',
      ui: {
        component: 'textarea',
      },
      required: true,
    },
    {
      type: 'string',
      name: 'badges',
      label: 'Badges',
      list: true,
    },
  ],
};
