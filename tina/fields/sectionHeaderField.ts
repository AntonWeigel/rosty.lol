import { ObjectField } from '@tinacms/schema-tools';

export const sectionHeaderField: ObjectField = {
  type: 'object',
  name: 'header',
  label: 'Section Header',
  description: 'Common section heading content: label, title, and subtitle',
  fields: [
    {
      type: 'string',
      name: 'label',
      label: 'Label',
      description: 'Small text above the main title',
    },
    {
      type: 'string',
      name: 'title',
      label: 'Title',
      required: true,
      description: 'Main headline for this section',
    },
    {
      type: 'string',
      name: 'subtitle',
      label: 'Subtitle',
      description: 'Smaller descriptive text shown under the title',
    },
  ],
};
