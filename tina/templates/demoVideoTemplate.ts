import { Template } from 'tinacms';

import { sectionHeaderField, sectionIdField } from '@/tina/fields';

export const demoVideoTemplate: Template = {
  name: 'demoVideo',
  label: 'Demo Video',
  fields: [
    sectionIdField,
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
