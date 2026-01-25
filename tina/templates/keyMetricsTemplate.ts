import { Template } from 'tinacms';

import { sectionHeaderField, sectionIdField } from '@/tina/fields';
import { positions } from '@/tina/options';

export const keyMetricsTemplate: Template = {
  name: 'keyMetrics',
  label: 'Key Metrics Section',
  fields: [
    sectionIdField,
    sectionHeaderField,
    {
      type: 'object',
      name: 'metrics',
      label: 'Metrics',
      list: true,
      required: true,
      ui: {
        itemProps: (item) => ({ label: item?.label }),
        validate: (metrics) => {
          if (metrics.length > 3) {
            return 'You can add up to 3 metric items only.';
          }
        },
      },
      fields: [
        {
          type: 'number',
          name: 'value',
          label: 'Value',
          description: '(e.g. 120, 92)',
          required: true,
        },
        {
          type: 'string',
          name: 'suffix',
          label: 'Suffix',
          description: '(optional symbol after number)',
          options: ['+', 'k', 'M', 'B', '%', 'x'],
        },
        {
          type: 'object',
          name: 'unit',
          label: 'Unit',
          fields: [
            {
              type: 'string',
              name: 'symbol',
              label: 'Symbol',
              options: ['$', '€', 'hrs', 'projects', 'users', '%'],
            },
            {
              type: 'string',
              name: 'position',
              label: 'Position',
              options: positions,
            },
          ],
        },
        {
          type: 'string',
          name: 'label',
          label: 'Label',
          description: '(shown below number)',
          required: true,
        },
      ],
    },
  ],
};
