import { Template } from 'tinacms';

import { imageField } from '@/tina/fields';
import { testimonialPlatforms } from '@/tina/options';

export const textTestimonialTemplate: Template = {
  name: 'textTestimonial',
  label: 'Text Testimonial',
  fields: [
    {
      type: 'string',
      name: 'quote',
      label: 'Quote',
      required: true,
    },
    imageField,
    {
      type: 'image',
      name: 'avatar',
      label: 'Avatar (author)',
    },
    {
      type: 'string',
      name: 'name',
      label: 'Name',
      required: true,
    },
    {
      type: 'string',
      name: 'alias',
      label: 'Handle or Alias',
      description: '(e.g. @asaasin)',
    },
    {
      type: 'object',
      name: 'source',
      label: 'Source',
      description: 'Optional platform + link to original post',
      fields: [
        {
          type: 'string',
          name: 'platform',
          label: 'Platform',
          options: testimonialPlatforms,
          required: true,
        },
        {
          type: 'string',
          name: 'url',
          label: 'Link to original',
          required: true,
        },
      ],
    },
  ],
};
