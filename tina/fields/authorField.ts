import { ObjectField } from '@tinacms/schema-tools';

export const authorField: ObjectField = {
  type: 'object',
  label: 'Author',
  name: 'author',
  required: true,
  fields: [
    {
      type: 'image',
      label: 'Avatar',
      name: 'avatar',
      required: true,
    },
    {
      type: 'string',
      name: 'name',
      label: 'Name',
      required: true,
    },
  ],
};
