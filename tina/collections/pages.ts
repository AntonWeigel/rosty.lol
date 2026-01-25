import { Collection } from '@tinacms/cli';
import slugify from 'slugify';

import { seoField } from '@/tina/fields';
import { headerTemplate, imageTemplate, textTemplate } from '@/tina/templates';

export const pages: Collection = {
  name: 'page',
  label: 'Pages',
  path: 'content/pages',
  format: 'mdx',
  ui: {
    allowedActions: {
      createNestedFolder: false,
    },
    filename: {
      readonly: false,
      slugify: (values: any) =>
        values.title ? slugify(values.title, { lower: true, trim: true }) : '',
    },
  },
  fields: [
    seoField,
    {
      type: 'string',
      name: 'title',
      label: 'Title',
      isTitle: true,
      required: true,
    },
    {
      type: 'string',
      name: 'subtitle',
      label: 'Subtitle',
    },
    {
      type: 'object',
      label: 'Sections',
      name: 'sections',
      list: true,
      templates: [headerTemplate, textTemplate, imageTemplate],
    },
  ],
};
