import { Template } from 'tinacms';

import { imageField } from '@/tina/fields';

export const imageMediaTemplate: Template = {
  name: 'imageMedia',
  label: 'Image Media Template',
  fields: imageField.fields || [],
};
