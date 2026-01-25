import * as React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Post } from '@/tina/__generated__/types';
import { getInitials } from '@/utils';

type AuthorProps = Pick<Post, 'author'>;

export const Author: React.FC<AuthorProps> = ({ author }) => (
  <div className="flex items-center gap-2">
    <Avatar
      key={author.name}
      className="border-primary-light dark:border-secondary-dark border-2"
    >
      <AvatarImage src={author.avatar} alt={author.name} />
      <AvatarFallback>{getInitials(author.name)}</AvatarFallback>
    </Avatar>
    <span className="text-sm font-medium">{author.name}</span>
  </div>
);
