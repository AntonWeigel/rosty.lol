import { Template } from 'tinacms';

import { sectionHeaderField, sectionIdField } from '@/tina/fields';
import { lucideIcons } from '@/tina/options';

export const featureGridTemplate: Template = {
  name: 'featureGrid',
  label: 'Feature Grid Section',
  fields: [
    sectionIdField,
    sectionHeaderField,
    {
      type: 'object',
      name: 'features',
      label: 'Features',
      list: true,
      required: true,
      ui: {
        itemProps: (item) => ({
          label: item?.title ? item.title : 'New Feature',
        }),
      },
      fields: [
        {
          type: 'string',
          name: 'icon',
          label: 'Icon',
          options: lucideIcons,
          required: true,
          description: 'Must match a key in LucideIconMap',
        },
        {
          type: 'string',
          name: 'title',
          label: 'Feature Title',
          required: true,
        },
        {
          type: 'string',
          name: 'description',
          label: 'Feature Description',
          ui: {
            component: 'textarea',
          },
          required: true,
        },
      ],
    },
  ],
};
