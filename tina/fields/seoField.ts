import { ObjectField } from '@tinacms/schema-tools';

import {
  articleCategories,
  articleSections,
  imageMimeTypes,
  openGraphLocales,
  openGraphTypes,
} from '@/tina/options';

export const seoField: ObjectField = {
  type: 'object',
  label: 'SEO',
  name: 'seo',
  required: true,
  fields: [
    {
      type: 'string',
      label: 'Title',
      name: 'title',
      required: true,
    },
    {
      type: 'string',
      label: 'Description',
      name: 'description',
      required: true,
      ui: {
        validate: (value) => {
          if (value?.length > 160) {
            return 'Description cannot be more than 160 characters long';
          }
        },
      },
    },
    {
      type: 'string',
      label: 'Author',
      name: 'author',
      required: true,
    },
    {
      type: 'string',
      label: 'Keywords',
      name: 'keywords',
      required: true,
    },
    {
      type: 'boolean',
      label: 'Visible to search engines',
      name: 'robots',
      ui: {
        component: 'toggle',
      },
    },
    {
      type: 'object',
      label: 'Open Graph',
      name: 'openGraph',
      fields: [
        {
          type: 'string',
          label: 'Open Graph Locale',
          name: 'locale',
          options: openGraphLocales,
          required: true,
        },
        {
          type: 'string',
          label: 'Open Graph Type',
          name: 'type',
          options: openGraphTypes,
          required: true,
        },
        {
          type: 'string',
          label: 'Open Graph Site Name',
          name: 'siteName',
          required: true,
        },
        {
          type: 'datetime',
          label: 'Open Graph Updated Time',
          name: 'updatedTime',
          required: true,
        },
        {
          type: 'string',
          label: 'Open Graph Title',
          name: 'title',
          required: true,
        },
        {
          type: 'string',
          label: 'Open Graph Description',
          name: 'description',
          required: true,
          ui: {
            validate: (value) => {
              if (value?.length > 160) {
                return 'Description cannot be more than 160 characters long';
              }
            },
          },
        },
        {
          type: 'object',
          label: 'Open Graph Image',
          name: 'image',
          fields: [
            {
              type: 'image',
              label: 'Open Graph Image',
              name: 'url',
              ui: {
                component: 'image',
              },
              required: true,
            },
            {
              type: 'number',
              label: 'Open Graph Image Width',
              name: 'width',
              required: true,
            },
            {
              type: 'number',
              label: 'Open Graph Image Height',
              name: 'height',
              required: true,
            },
            {
              type: 'string',
              label: 'Open Graph Image Alt',
              name: 'alt',
              required: true,
            },
            {
              type: 'string',
              label: 'Open Graph Image Type',
              name: 'type',
              options: imageMimeTypes,
              required: true,
            },
          ],
        },
      ],
    },
    {
      type: 'object',
      label: 'Article',
      name: 'article',
      fields: [
        {
          type: 'string',
          label: 'Article Tag',
          name: 'tag',
          options: articleCategories,
          required: true,
        },
        {
          type: 'string',
          label: 'Article Section',
          name: 'section',
          options: articleSections,
          required: true,
        },
        {
          type: 'string',
          label: 'Article Publisher',
          name: 'publisher',
          required: true,
        },
        {
          type: 'datetime',
          label: 'Article Published Time',
          name: 'publishedTime',
          required: true,
        },
        {
          type: 'datetime',
          label: 'Article Modified Time',
          name: 'modifiedTime',
          required: true,
        },
      ],
    },
  ],
};
