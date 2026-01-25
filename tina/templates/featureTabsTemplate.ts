import { Template } from 'tinacms';

import {
  listItemsField,
  sectionHeaderField,
  sectionIdField,
} from '@/tina/fields';
import { lucideIcons } from '@/tina/options';

export const featureTabsTemplate: Template = {
  name: 'featureTabs',
  label: 'Feature Tabs Section',
  fields: [
    sectionIdField,
    sectionHeaderField,
    {
      type: 'string',
      name: 'defaultTab',
      label: 'Default Tab Key',
      description: 'Select the tab that is active by default',
      required: true,
    },
    {
      type: 'object',
      name: 'tabs',
      label: 'Tabs',
      required: true,
      list: true,
      ui: {
        itemProps: (item) => ({
          label: item?.value ? `🧩 Tab: ${item.value}` : '🧩 New Tab',
        }),
      },
      fields: [
        {
          type: 'string',
          name: 'value',
          label: 'Tab Key',
          description: 'Must match a unique value from the defined tab keys',
          required: true,
        },
        {
          type: 'string',
          name: 'label',
          label: 'Tab Label',
          required: true,
        },
        {
          type: 'string',
          name: 'icon',
          label: 'Tab Icon Key',
          description: 'Must match a key in LucideIconMap',
          options: lucideIcons,
          required: true,
        },
        {
          type: 'object',
          name: 'content',
          label: 'Tab Content',
          required: true,
          fields: [
            {
              type: 'string',
              name: 'title',
              label: 'Content Title',
              required: true,
            },
            listItemsField,
            {
              type: 'image',
              name: 'image',
              label: 'Illustration Image',
              required: true,
            },
            {
              type: 'object',
              name: 'links',
              label: 'Links',
              list: true,
              ui: {
                itemProps: (item) => ({
                  label: item?.label || '🔗 Link',
                }),
              },
              fields: [
                {
                  type: 'string',
                  name: 'icon',
                  label: 'Icon',
                  options: lucideIcons,
                },
                {
                  type: 'string',
                  name: 'label',
                  label: 'Link Label',
                  required: true,
                },
                {
                  type: 'string',
                  name: 'url',
                  label: 'URL',
                  required: true,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
