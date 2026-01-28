import { Template } from 'tinacms';

import { animationField, sectionIdField } from '@/tina/fields';
import { techStackLibraries } from '@/tina/options';

export const stackFormulaTemplate: Template = {
  name: 'stackFormula',
  label: 'Stack Formula Section',
  fields: [
    sectionIdField,
    animationField,
    {
      type: 'string',
      name: 'label',
      label: 'Section Label',
      description: 'Small text above the section',
    },
    {
      type: 'object',
      name: 'stack',
      label: 'Tech Stack',
      list: true,
      required: true,
      ui: {
        itemProps: (item) => ({
          label: item?.library || 'Library',
        }),
      },
      fields: [
        {
          type: 'string',
          name: 'library',
          label: 'Library',
          options: techStackLibraries,
          required: true,
        },
      ],
    },
  ],
};
