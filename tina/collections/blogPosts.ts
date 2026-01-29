import { Collection } from '@tinacms/cli';
import slugify from 'slugify';

import { SITE } from '@/config';
import { authorField, seoField } from '@/tina/fields';
import { articleCategories } from '@/tina/options';
import { headerTemplate, imageTemplate, textTemplate } from '@/tina/templates';
import { getDefaultDate } from '@/utils';

export const blogPosts: Collection = {
  name: 'post',
  label: 'Blog posts',
  path: 'content/posts',
  format: 'mdx',
  defaultItem: () => {
    const now = getDefaultDate();
    return {
      author: SITE.author.name,
      seo: {
        robots: true,
        author: SITE.author.name,
        openGraph: {
          locale: SITE.locale,
          type: 'article',
          siteName: SITE.name,
          updatedTime: now,
        },
      },
      createdAt: now,
    };
  },
  ui: {
    router: ({ document }) => `/blog/${document._sys.filename}`,
    allowedActions: {
      createNestedFolder: false,
    },
    filename: {
      readonly: true,
      slugify: (values: any) =>
        values.title ? slugify(values.title, { lower: true, trim: true }) : '',
    },
  },
  fields: [
    seoField,
    {
      type: 'image',
      name: 'thumbnail',
      label: 'Thumbnail',
      required: true,
      ui: {
        component: 'image',
      },
    },
    authorField,
    {
      type: 'string',
      name: 'category',
      label: 'Category',
      options: articleCategories,
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
      type: 'string',
      name: 'description',
      label: 'Description',
      required: true,
    },
    {
      type: 'datetime',
      name: 'createdAt',
      label: 'Created At',
      required: true,
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
