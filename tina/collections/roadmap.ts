import { Collection } from '@tinacms/cli';
import { UICollection } from '@tinacms/schema-tools';
import slugify from 'slugify';

import { RoadmapStatus } from '@/constants/enums';
import { roadmapCategories, roadmapStatuses } from '@/tina/options';
import { getDefaultDate } from '@/utils';

export const roadmap: Collection = {
  name: 'roadmap',
  label: 'Roadmap',
  path: 'content/roadmap',
  format: 'mdx',
  ui: {
    defaultItem: () => ({
      createdAt: getDefaultDate(),
      status: RoadmapStatus.New,
    }),
    filename: {
      readonly: true,
      slugify: (values: any) =>
        values.title ? slugify(values.title, { lower: true, trim: true }) : '',
    },
  } as UICollection & { defaultItem?: any },
  fields: [
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
      type: 'string',
      name: 'status',
      label: 'Status',
      required: true,
      options: roadmapStatuses,
    },
    {
      type: 'datetime',
      name: 'createdAt',
      label: 'Date',
      required: true,
    },
    {
      type: 'string',
      name: 'category',
      label: 'Category',
      required: true,
      options: roadmapCategories,
    },
  ],
};
