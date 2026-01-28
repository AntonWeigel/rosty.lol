import { StringField } from '@tinacms/schema-tools';

import { sectionAnimations } from '../options';

export const animationField: StringField = {
  type: 'string',
  name: 'animation',
  label: 'Entrance Animation',
  description: 'Animation effect when section appears on screen',
  options: sectionAnimations,
};
