import { Collection } from '@tinacms/cli';
import slugify from 'slugify';

import { SITE } from '@/config';
import { seoField } from '@/tina/fields';
import { lucideIcons } from '@/tina/options';
import {
  codeBlockTemplate,
  headerTemplate,
  imageTemplate,
  infoBlockTemplate,
  textTemplate,
} from '@/tina/templates';
import { getDefaultDate } from '@/utils';

export const docs: Collection = {
  name: 'doc',
  label: 'Documentation',
  path: 'content/docs',
  format: 'mdx',
  defaultItem: () => {
    const now = getDefaultDate();
    return {
      seo: {
        robots: true,
        author: SITE.author.name,
        openGraph: {
          locale: SITE.locale,
          type: 'article',
          siteName: SITE.name,
          updatedTime: now,
          image: {
            url: '/1280x640.webp',
            width: 1280,
            height: 640,
            alt: 'Demo Documentation',
            type: 'image/webp',
          },
        },
        article: {
          publisher: SITE.name,
          publishedTime: now,
          modifiedTime: now,
        },
      },
      createdAt: now,
      updatedAt: now,
    };
  },
  ui: {
    router: ({ document }) => `/docs/${document._sys.breadcrumbs.join('/')}`,
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
      name: 'icon',
      label: 'Icon',
      options: lucideIcons,
    },
    {
      type: 'number',
      name: 'order',
      label: 'Order',
      required: true,
    },
    {
      type: 'datetime',
      name: 'createdAt',
      label: 'Created At',
      required: true,
    },
    {
      type: 'datetime',
      name: 'updatedAt',
      label: 'Updated At',
      required: true,
    },
    {
      type: 'object',
      label: 'Sections',
      name: 'sections',
      list: true,
      templates: [
        headerTemplate,
        imageTemplate,
        textTemplate,
        codeBlockTemplate,
        infoBlockTemplate,
      ],
    },
  ],
};
