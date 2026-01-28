import { Template } from 'tinacms';

import { animationField, sectionIdField } from '@/tina/fields';

export const painPointsTemplate: Template = {
  name: 'painPoints',
  label: 'Pain Points Section',
  fields: [
    sectionIdField,
    animationField,
    {
      label: 'Lines',
      name: 'lines',
      type: 'object',
      list: true,
      fields: [
        {
          name: 'body',
          label: 'Text',
          type: 'rich-text',
          templates: [
            {
              name: 'highlight',
              label: 'Highlight',
              inline: true,
              fields: [
                {
                  name: 'text',
                  label: 'Text',
                  type: 'string',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      label: 'Link',
      name: 'link',
      type: 'object',
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'string',
        },
        {
          name: 'href',
          label: 'Href',
          type: 'string',
        },
      ],
    },
  ],
};
