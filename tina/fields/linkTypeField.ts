import { StringField } from '@tinacms/schema-tools';

import { linkTypes } from '@/tina/options';

export const linkTypeField: StringField = {
  type: 'string',
  name: 'linkType',
  label: 'Link Type',
  options: linkTypes,
  required: true,
};
