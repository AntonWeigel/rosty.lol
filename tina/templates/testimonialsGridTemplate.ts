import { Template } from 'tinacms';

import {
  animationField,
  sectionHeaderField,
  sectionIdField,
} from '@/tina/fields';
import { textTestimonialTemplate } from '@/tina/templates/textTestimonialTemplate';
import { videoTestimonialTemplate } from '@/tina/templates/videoTestimonialTemplate';

export const testimonialsGridTemplate: Template = {
  name: 'testimonialsGrid',
  label: 'Testimonials Grid',
  fields: [
    sectionIdField,
    animationField,
    sectionHeaderField,
    {
      type: 'object',
      name: 'testimonials',
      label: 'Testimonials',
      list: true,
      required: true,
      templates: [textTestimonialTemplate, videoTestimonialTemplate],
    },
  ],
};
