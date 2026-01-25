import { Template } from 'tinacms';

import { buttonLabelField } from '@/tina/fields';

export const waitlistButtonTemplate: Template = {
  name: 'waitlist',
  label: 'Waitlist (Dialog)',
  fields: [buttonLabelField],
};
