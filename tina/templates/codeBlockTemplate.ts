import { Template } from 'tinacms';

import { codeLanguages } from '@/tina/options';
import { getSectionLabel } from '@/utils';

export const codeBlockTemplate: Template = {
  name: 'codeBlock',
  label: 'Code Block Section',
  ui: {
    defaultItem: {
      language: 'typescript',
    },
    itemProps: (item) => ({
      label: getSectionLabel(item),
    }),
  },
  fields: [
    {
      type: 'string',
      name: 'language',
      label: 'Language',
      options: codeLanguages,
      required: true,
    },
    {
      type: 'string',
      name: 'code',
      label: 'Code Content',
      ui: {
        component: 'textarea',
      },
    },
  ],
};
