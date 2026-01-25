import { Collection } from '@tinacms/cli';
import slugify from 'slugify';

import { changelogTags } from '@/tina/options';
import { getDefaultDate } from '@/utils';

export const changelog: Collection = {
  name: 'changelog',
  label: 'Changelog',
  path: 'content/changelog',
  format: 'mdx',
  defaultItem: () => ({
    createdAt: getDefaultDate(),
    tags: [],
  }),
  ui: {
    filename: {
      readonly: true,
      slugify: (values: any) =>
        values.title && values.version
          ? `v${values.version}-${slugify(values.title, { lower: true, trim: true })}`
          : '',
    },
  },
  fields: [
    {
      type: 'string',
      name: 'version',
      label: 'Version',
      required: true,
    },
    {
      type: 'string',
      name: 'title',
      label: 'Title',
      isTitle: true,
      required: true,
    },
    {
      type: 'rich-text',
      name: 'description',
      label: 'Description',
      required: true,
    },
    {
      type: 'datetime',
      name: 'createdAt',
      label: 'Date',
      required: true,
    },
    {
      type: 'string',
      name: 'tags',
      label: 'Tags',
      list: true,
      options: changelogTags,
    },
  ],
};
