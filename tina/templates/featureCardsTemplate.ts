import { Template } from 'tinacms';

import {
  animationField,
  imageField,
  sectionHeaderField,
  sectionIdField,
} from '@/tina/fields';
import { positions } from '@/tina/options';

export const featureCardsTemplate: Template = {
  name: 'featureCards',
  label: 'Feature Cards Section',
  fields: [
    sectionIdField,
    animationField,
    sectionHeaderField,
    {
      type: 'object',
      name: 'features',
      label: 'Feature Cards',
      list: true,
      required: true,
      ui: {
        itemProps: (item) => ({
          label: item?.title || 'Card',
        }),
      },
      fields: [
        {
          type: 'string',
          name: 'title',
          label: 'Title',
          required: true,
        },
        {
          type: 'string',
          name: 'description',
          label: 'Description',
          ui: {
            component: 'textarea',
          },
          required: true,
        },
        {
          type: 'object',
          name: 'image',
          label: 'Image Block',
          required: true,
          fields: [
            ...((imageField.fields as any) || []),
            {
              type: 'string',
              name: 'position',
              label: 'Image Position',
              required: true,
              options: positions,
              description:
                'Controls if the image is shown on the left or right',
            },
          ],
        },
        {
          type: 'string',
          name: 'badges',
          label: 'Badges',
          list: true,
        },
      ],
    },
  ],
};
