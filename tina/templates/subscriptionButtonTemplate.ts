import { Template } from 'tinacms';

import { buttonLabelField } from '@/tina/fields';

export const subscriptionButtonTemplate: Template = {
  name: 'subscription',
  label: 'Subscribe (Recurring)',
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
