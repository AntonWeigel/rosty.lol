import { Template } from 'tinacms';

import {
  animationField,
  sectionHeaderField,
  sectionIdField,
} from '@/tina/fields';

export const demoVideoTemplate: Template = {
  name: 'demoVideo',
  label: 'Demo Video',
  fields: [
    sectionIdField,
    animationField,
    sectionHeaderField,
    {
      type: 'string',
      name: 'videoUrl',
      label: 'Video URL',
      required: true,
    },
    {
      type: 'image',
      name: 'posterImage',
      label: 'Poster Image',
      required: true,
    },
  ],
};
