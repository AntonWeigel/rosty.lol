import { Template } from 'tinacms';

import { sectionHeaderField, sectionIdField } from '@/tina/fields';
import { awardKeys, companyKeys } from '@/tina/options';

export const socialProofTemplate: Template = {
  name: 'socialProof',
  label: 'Social Proof Section',
  fields: [
    sectionIdField,
    sectionHeaderField,
    {
      type: 'object',
      name: 'awards',
      label: 'Awards',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.type }),
      },
      fields: [
        {
          type: 'string',
          name: 'type',
          label: 'Award Type',
          required: true,
          options: awardKeys,
        },
        {
          type: 'string',
          name: 'href',
          label: 'Link',
        },
      ],
    },
    {
      type: 'object',
      name: 'logos',
      label: 'Company Logos',
      list: true,
      ui: {
        itemProps: (item) => ({ label: item?.type }),
      },
      fields: [
        {
          type: 'string',
          name: 'type',
          label: 'Company',
          required: true,
          options: companyKeys,
        },
      ],
    },
  ],
};
