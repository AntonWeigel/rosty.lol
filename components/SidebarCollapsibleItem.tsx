import { ChevronRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import * as React from 'react';

import { LucideIconRenderer } from '@/components/LucideIconRenderer';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/Collapsible';
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/Sidebar';
import { LucideIcon } from '@/constants/enums';
import { SidebarItem } from '@/types';
import { cn } from '@/utils';

type SidebarCollapsibleItemProps = {
  title: string;
  url: string;
  activePath: string;
  icon?: LucideIcon;
  items?: Pick<SidebarItem, 'title' | 'url'>[];
  onLinkClick?: () => void;
};

export const SidebarCollapsibleItem: React.FC<SidebarCollapsibleItemProps> = ({
  title,
  url,
  activePath,
  icon,
  items,
  onLinkClick,
}) => {
  const hasSubItems = items && items.length > 0;

  const isActive =
    url === activePath || items?.some((subItem) => subItem.url === activePath);

  const [isOpen, setIsOpen] = React.useState(isActive && hasSubItems);

  React.useEffect(() => {
    if (isActive && hasSubItems) {
      setIsOpen(true);
    }
  }, [isActive, hasSubItems]);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="group/collapsible"
      asChild
    >
      <SidebarMenuItem>
        <SidebarMenuButton isActive={isActive} tooltip={title} asChild>
          <Link href={url} onClick={onLinkClick}>
            <LucideIconRenderer icon={icon} />
            <span>{title}</span>
          </Link>
        </SidebarMenuButton>

        {hasSubItems && (
          <>
            <CollapsibleTrigger
              aria-label={`Toggle submenu for ${title}`}
              onClick={toggleOpen}
              asChild
            >
              <SidebarMenuAction
                className={cn(
                  isActive && 'text-primary-dark dark:text-primary-light',
                )}
              >
                <ChevronRightIcon className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuAction>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                {items?.map((subItem) => (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton
                      isActive={subItem.url === activePath}
                      asChild
                    >
                      <Link href={subItem.url} onClick={onLinkClick}>
                        <span>{subItem.title}</span>
                      </Link>
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ))}
              </SidebarMenuSub>
            </CollapsibleContent>
          </>
        )}
      </SidebarMenuItem>
    </Collapsible>
  );
};
