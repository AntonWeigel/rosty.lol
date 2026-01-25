import { ObjectField } from '@tinacms/schema-tools';

import { buyButtonTemplate } from '@/tina/templates/buyButtonTemplate';
import { subscriptionButtonTemplate } from '@/tina/templates/subscriptionButtonTemplate';
import { waitlistButtonTemplate } from '@/tina/templates/waitlistButtonTemplate';

export const checkoutButtonField: ObjectField = {
  type: 'object',
  name: 'checkoutButton',
  label: 'Checkout Button',
  list: true,
  ui: {
    validate: (items) => {
      if (Array.isArray(items) && items.length > 1) {
        return 'Only one checkout button is allowed.';
      }
    },
  },
  templates: [
    buyButtonTemplate,
    subscriptionButtonTemplate,
    waitlistButtonTemplate,
  ],
};
