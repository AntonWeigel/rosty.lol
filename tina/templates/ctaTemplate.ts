import { Template } from 'tinacms';

import {
  ctaButtonField,
  sectionHeaderField,
  sectionIdField,
} from '@/tina/fields';

export const ctaTemplate: Template = {
  name: 'cta',
  label: 'Call To Action Section',
  fields: [sectionIdField, sectionHeaderField, ctaButtonField],
};
