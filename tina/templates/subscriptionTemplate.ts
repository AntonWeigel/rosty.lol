import { Template } from 'tinacms';

import {
  animationField,
  pricingSectionHeaderField,
  sectionIdField,
} from '@/tina/fields';

export const subscriptionTemplate: Template = {
  name: 'subscription',
  label: 'Subscription Section',
  fields: [sectionIdField, animationField, pricingSectionHeaderField],
};
