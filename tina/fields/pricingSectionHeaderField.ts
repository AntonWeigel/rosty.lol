import { ObjectField } from '@tinacms/schema-tools';

export const pricingSectionHeaderField: ObjectField = {
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
      type: 'object',
      name: 'subtitleBlock',
      label: 'Subtitle (with Highlight)',
      description: 'Custom descriptive text shown under the title',
      fields: [
        {
          type: 'string',
          name: 'discount',
          label: 'Discount Highlight',
          description:
            'Optional promo text like "$100 off for the first 100 customers (15 left)"',
        },
        {
          type: 'string',
          name: 'text',
          label: 'Text',
          description: 'Smaller descriptive text shown under the title',
          required: true,
        },
      ],
    },
  ],
};
