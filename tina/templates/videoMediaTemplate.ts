import { Template } from 'tinacms';

export const videoMediaTemplate: Template = {
  name: 'videoMedia',
  label: 'Video Media Template',
  fields: [
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
    },
  ],
};
