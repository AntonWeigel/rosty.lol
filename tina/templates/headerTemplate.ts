import { Template } from 'tinacms';

import { componentVariants } from '@/tina/options';
import { getSectionLabel } from '@/utils';

export const headerTemplate: Template = {
  name: 'header',
  label: 'Header Section',
  ui: {
    itemProps: (item) => ({
      label: getSectionLabel(item),
    }),
  },
  fields: [
    {
      type: 'string',
      name: 'text',
      label: 'Text',
      required: true,
    },
    {
      type: 'string',
      name: 'variant',
      label: 'Variant',
      options: componentVariants,
      required: true,
    },
  ],
};
