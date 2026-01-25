import * as React from 'react';

import { FormattedDate } from '@/components/FormattedDate';
import { Badge } from '@/components/ui/Badge';
import { Post } from '@/tina/__generated__/types';

type BlogPostInfoProps = Pick<Post, 'category' | 'createdAt'>;

export const BlogPostInfo: React.FC<BlogPostInfoProps> = ({
  category,
  createdAt,
}) => (
  <div className="flex items-center justify-between gap-4">
    <Badge variant="tag">{category}</Badge>
    <FormattedDate timestamp={createdAt} />
  </div>
);
