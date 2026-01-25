import { Template } from 'tinacms';

import { LinkType } from '@/constants/enums';
import { buttonLabelField } from '@/tina/fields';
import { linkTypeField } from '@/tina/fields/linkTypeField';

export const linkButtonTemplate: Template = {
  name: 'link',
  label: 'Link',
  ui: {
    defaultItem: {
      linkType: LinkType.External,
    },
  },
  fields: [
    buttonLabelField,
    {
      type: 'string',
      name: 'href',
      label: 'Link URL',
      required: true,
      description: 'Relative or absolute URL.',
    },
    linkTypeField,
  ],
};
