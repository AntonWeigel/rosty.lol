import { ObjectField } from '@tinacms/schema-tools';

import { ListItemType } from '@/constants/enums';
import { listItemTypes } from '@/tina/options';

export const listItemsField: ObjectField = {
  type: 'object',
  name: 'listItems',
  label: 'List Items',
  required: true,
  list: true,
  ui: {
    defaultItem: {
      type: ListItemType.Default,
    },
    itemProps: (item) => ({
      label: item?.text ? `✔️ ${item.text}` : '✔️ New List Item',
    }),
  },
  fields: [
    {
      type: 'string',
      name: 'text',
      label: 'Text',
      required: true,
    },
    {
      type: 'string',
      name: 'type',
      label: 'Visual Style',
      required: true,
      options: listItemTypes,
      description: 'Choose how the item should be styled visually.',
    },
    {
      type: 'string',
      name: 'badge',
      label: 'Badge',
      description: 'Optional badge text displayed next to the item',
    },
  ],
};
