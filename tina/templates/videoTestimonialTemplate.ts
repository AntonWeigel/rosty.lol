import { Template } from 'tinacms';

export const videoTestimonialTemplate: Template = {
  name: 'videoTestimonial',
  label: 'Video Testimonial',
  fields: [
    {
      type: 'string',
      name: 'quote',
      label: 'Quote',
      required: true,
    },
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
    {
      type: 'string',
      name: 'name',
      label: 'Name',
      required: true,
    },
    {
      type: 'number',
      name: 'starRating',
      label: 'Star Rating',
      description: '(1–5)',
      required: true,
    },
  ],
};
