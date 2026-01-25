import { Collection } from '@tinacms/cli';

import { seoField } from '@/tina/fields';
import {
  aboutTemplate,
  contrastTemplate,
  ctaTemplate,
  demoVideoTemplate,
  faqTemplate,
  featureCardsTemplate,
  featureGridTemplate,
  featureTabsTemplate,
  heroTemplate,
  keyMetricsTemplate,
  painPointsTemplate,
  productTemplate,
  showcaseTemplate,
  socialProofTemplate,
  stackFormulaTemplate,
  subscriptionTemplate,
  testimonialsGridTemplate,
  testimonialsTemplate,
} from '@/tina/templates';

export const landing: Collection = {
  name: 'landing',
  label: 'Landing page',
  path: 'content/landing',
  format: 'mdx',
  ui: {
    allowedActions: {
      create: false,
      delete: false,
      createNestedFolder: false,
    },
  },
  fields: [
    seoField,
    {
      type: 'object',
      label: 'Sections',
      name: 'sections',
      list: true,
      templates: [
        aboutTemplate,
        ctaTemplate,
        contrastTemplate,
        demoVideoTemplate,
        faqTemplate,
        featureCardsTemplate,
        featureGridTemplate,
        featureTabsTemplate,
        heroTemplate,
        keyMetricsTemplate,
        painPointsTemplate,
        productTemplate,
        showcaseTemplate,
        socialProofTemplate,
        stackFormulaTemplate,
        subscriptionTemplate,
        testimonialsGridTemplate,
        testimonialsTemplate,
      ],
    },
  ],
};
