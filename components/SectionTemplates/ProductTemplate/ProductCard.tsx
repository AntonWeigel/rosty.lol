import * as React from 'react';

import { CheckoutButton } from '@/components/CheckoutButton';
import { List } from '@/components/List';
import { Badge } from '@/components/ui/Badge';
import { ListItemType } from '@/constants/enums';
import { LandingSectionsProductProducts } from '@/tina/__generated__/types';
import { cn } from '@/utils';

export const ProductCard: React.FC<LandingSectionsProductProducts> = ({
  name,
  price,
  oldPrice,
  highlightLabel,
  listItems,
  checkoutButton,
  checkoutNote,
}) => (
  <div
    className={cn(
      'bg-primary-light dark:bg-secondary-dark relative flex w-full max-w-[400px] flex-col justify-between gap-12 rounded-2xl p-8 shadow-lg',
      highlightLabel && 'border-highlight border-2',
    )}
  >
    {highlightLabel && (
      <Badge
        variant="highlight"
        className="absolute -top-3 left-1/2 -translate-x-1/2"
      >
        {highlightLabel}
      </Badge>
    )}
    <div className="flex flex-col gap-8">
      <h3 className="text-primary-dark dark:text-primary-light text-xl font-bold tracking-wide capitalize">
        {name}
      </h3>

      <div className="flex items-baseline justify-start gap-3">
        {oldPrice && (
          <span className="text-secondary-dark dark:text-neutral text-lg line-through">
            ${oldPrice}
          </span>
        )}
        <span className="text-primary-dark dark:text-primary-light text-5xl font-bold">
          ${price}
        </span>
        <span className="text-secondary-dark dark:text-neutral text-sm">
          USD
        </span>
      </div>

      <List>
        {listItems.map((item, idx) => (
          <List.Item key={idx} type={item.type as ListItemType}>
            {item.badge ? (
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="break-words">{item.text}</span>
                <Badge variant="tag" className="shrink-0">
                  {item.badge}
                </Badge>
              </div>
            ) : (
              <span className="break-words">{item.text}</span>
            )}
          </List.Item>
        ))}
      </List>
    </div>

    <div className="flex flex-col items-center justify-center gap-3">
      <CheckoutButton data={checkoutButton} />
      <span className="text-secondary-dark dark:text-neutral text-xs font-medium">
        {checkoutNote}
      </span>
    </div>
  </div>
);
