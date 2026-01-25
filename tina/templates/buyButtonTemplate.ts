import { Template } from 'tinacms';

import { buttonLabelField } from '@/tina/fields';

export const buyButtonTemplate: Template = {
  name: 'buy',
  label: 'Buy Button (One-Time)',
  fields: [
    buttonLabelField,
    {
      type: 'string',
      name: 'productId',
      label: 'Product ID',
      required: true,
    },
  ],
};
