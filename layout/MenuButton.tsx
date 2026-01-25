import * as React from 'react';

import { ToggleButton } from '@/components/ToggleButton';
import { MoreVerticalIcon } from '@/icons';

type MenuButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  isOpen: boolean;
};

export const MenuButton: React.FC<MenuButtonProps> = ({
  className,
  isOpen,
  onClick,
  ...props
}) => (
  <ToggleButton
    icon={<MoreVerticalIcon />}
    srText={'Toggle navigation'}
    className={className}
    onClick={onClick}
    aria-expanded={isOpen}
    aria-label="Toggle navigation"
    {...props}
  />
);
