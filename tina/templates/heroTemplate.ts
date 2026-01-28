import { Template } from 'tinacms';

import {
  animationField,
  ctaButtonField,
  mediaField,
  sectionIdField,
} from '@/tina/fields';

export const heroTemplate: Template = {
  name: 'hero',
  label: 'Hero Section',
  fields: [
    sectionIdField,
    animationField,
    {
      type: 'string',
      name: 'motto',
      label: 'Motto',
      description:
        'Short line above the main headline (e.g. slogan or catchphrase)',
    },
    {
      type: 'string',
      name: 'headlineIntro',
      label: 'Headline – Intro',
      required: true,
      description: 'Opening line to set the tone',
    },
    {
      type: 'string',
      name: 'headlineValue',
      label: 'Headline – Value/Benefit',
      required: true,
      description: 'Second line with the benefit or motivation',
    },
    {
      type: 'string',
      name: 'headlineContrast',
      label: 'Headline – Contrast (Highlighted)',
      required: true,
      description: 'Third line showing the pain point or contrast',
    },
    {
      type: 'string',
      name: 'subheadline',
      label: 'Subheadline',
      description: 'Supporting description below the main headline',
    },
    ctaButtonField,
    mediaField,
    {
      type: 'object',
      name: 'socialProof',
      label: 'Social Proof',
      fields: [
        {
          type: 'string',
          name: 'highlight',
          label: 'Highlight',
          description:
            'Optional short fact (e.g. user count or testimonial badge)',
        },
        {
          type: 'string',
          name: 'text',
          label: 'Social Proof Text',
          required: true,
          description:
            'Short supporting statement to build trust or credibility',
        },
        {
          type: 'number',
          name: 'rating',
          label: 'Average Rating',
          required: true,
          description: 'Display average review rating (e.g. 5 stars)',
        },
        {
          type: 'object',
          list: true,
          name: 'avatars',
          required: true,
          label: 'User Avatars',
          fields: [
            {
              type: 'image',
              name: 'image',
              label: 'Avatar Image',
              required: true,
            },
            {
              type: 'string',
              name: 'name',
              label: 'User Name',
            },
          ],
        },
      ],
    },
  ],
};
