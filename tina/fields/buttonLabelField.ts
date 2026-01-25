import { ObjectField } from '@tinacms/schema-tools';

import { lucideIcons } from '@/tina/options';

export const buttonLabelField: ObjectField = {
  type: 'object',
  name: 'label',
  label: 'Button Label',
  description: 'Text and optional icon shown on the button.',
  required: true,
  fields: [
    {
      type: 'string',
      name: 'text',
      label: 'Text',
      required: true,
    },
    {
      type: 'string',
      name: 'icon',
      label: 'Icon',
      options: lucideIcons,
      description: 'Optional. Must match a key in LucideIconMap.',
    },
  ],
};
