import { Template } from 'tinacms';

import {
  animationField,
  checkoutButtonField,
  listItemsField,
  pricingSectionHeaderField,
  sectionIdField,
} from '@/tina/fields';

export const productTemplate: Template = {
  name: 'product',
  label: 'Product Section',
  fields: [
    sectionIdField,
    animationField,
    pricingSectionHeaderField,
    {
      type: 'object',
      name: 'products',
      label: 'Products',
      list: true,
      required: true,
      ui: {
        itemProps: (item) => ({
          label: item?.name ? `${item.name}` : 'New product',
        }),
      },
      fields: [
        {
          type: 'string',
          name: 'name',
          label: 'Product Name',
          required: true,
        },
        {
          type: 'number',
          name: 'price',
          label: 'Current Price',
          required: true,
        },
        {
          type: 'number',
          name: 'oldPrice',
          label: 'Old Price (Crossed Out)',
        },
        {
          type: 'string',
          name: 'highlightLabel',
          label: 'Highlight Label',
          description:
            'Optional badge shown above the card (e.g. "Best Seller")',
        },
        listItemsField,
        checkoutButtonField,
        {
          type: 'string',
          name: 'checkoutNote',
          label: 'Checkout Note',
          description: 'Optional text shown below the checkout button',
        },
      ],
    },
  ],
};
