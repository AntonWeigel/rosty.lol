import { Template } from 'tinacms';

import {
  animationField,
  sectionHeaderField,
  sectionIdField,
} from '@/tina/fields';

export const testimonialsTemplate: Template = {
  name: 'testimonials',
  label: 'Testimonials Section',
  fields: [
    sectionIdField,
    animationField,
    sectionHeaderField,
    {
      type: 'object',
      name: 'items',
      label: 'Testimonials',
      list: true,
      required: true,
      ui: {
        itemProps: (item) => ({
          label: item.name
            ? `${item.name} | ${item.useCase}`
            : 'New testimonial',
        }),
      },
      fields: [
        {
          type: 'image',
          name: 'avatar',
          label: 'Avatar',
          required: true,
          description: 'Photo of the customer giving the testimonial.',
        },
        {
          type: 'string',
          name: 'name',
          label: 'Name',
          required: true,
          description: 'Full name of the customer or user.',
        },
        {
          type: 'string',
          name: 'useCase',
          label: 'Customer Role / Use Case',
          required: true,
          description:
            'Example: “Launched a SaaS app”, “Runs an online store”, or “Built with AI”.',
        },
        {
          type: 'string',
          name: 'quote',
          label: 'Quote',
          required: true,
          description: 'What did the customer say? Keep it short and powerful.',
        },
      ],
    },
  ],
};
