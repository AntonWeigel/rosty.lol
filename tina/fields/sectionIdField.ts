import { StringField } from '@tinacms/schema-tools';

export const sectionIdField: StringField = {
  type: 'string',
  name: 'id',
  label: 'Section ID',
  description: 'Used for anchor links (e.g. #pricing)',
  required: false,
};
