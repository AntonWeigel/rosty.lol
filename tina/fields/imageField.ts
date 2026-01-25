import { ObjectField } from '@tinacms/schema-tools';

export const imageField: ObjectField = {
  type: 'object',
  label: 'Image',
  name: 'image',
  fields: [
    {
      type: 'image',
      label: 'Image',
      name: 'src',
      required: true,
    },
    {
      type: 'string',
      name: 'alt',
      label: 'Alternative Text',
    },
    {
      type: 'number',
      name: 'width',
      label: 'Width',
    },
    {
      type: 'number',
      name: 'height',
      label: 'Height',
    },
  ],
};
