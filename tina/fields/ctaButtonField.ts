import { ObjectField } from '@tinacms/schema-tools';

import { buyButtonTemplate } from '@/tina/templates/buyButtonTemplate';
import { linkButtonTemplate } from '@/tina/templates/linkButtonTemplate';
import { subscriptionButtonTemplate } from '@/tina/templates/subscriptionButtonTemplate';
import { waitlistButtonTemplate } from '@/tina/templates/waitlistButtonTemplate';

export const ctaButtonField: ObjectField = {
  type: 'object',
  name: 'ctaButton',
  label: 'CTA Button',
  list: true,
  ui: {
    validate: (items) => {
      if (Array.isArray(items) && items.length > 2) {
        return 'Only 2 CTA buttons are allowed.';
      }
    },
  },
  templates: [
    buyButtonTemplate,
    subscriptionButtonTemplate,
    waitlistButtonTemplate,
    linkButtonTemplate,
  ],
};
