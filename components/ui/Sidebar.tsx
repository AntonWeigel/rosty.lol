'use client';

import { Slot } from '@radix-ui/react-slot';
import { cva, VariantProps } from 'class-variance-authority';
import { setCookie } from 'cookies-next';
import * as React from 'react';

import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Separator } from '@/components/ui/Separator';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from '@/components/ui/Sheet';
import { Skeleton } from '@/components/ui/Skeleton';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/Tooltip';
import { useIsMobile } from '@/hooks';
import { cn, getSidebarCookieNameById } from '@/utils';

const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = '16rem';
const SIDEBAR_WIDTH_MOBILE = '18rem';
const SIDEBAR_WIDTH_ICON = '3rem';
const SIDEBAR_KEYBOARD_SHORTCUT = 'b';
const NAVBAR_HEIGHT = '5.5rem';

type SidebarContext = {
  state: 'expanded' | 'collapsed';
  open: boolean;
  setOpen: (open: boolean) => void;
  openMobile: boolean;
  setOpenMobile: (open: boolean) => void;
  isMobile: boolean;
  toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

function useSidebar() {
  const context = React.useContext(SidebarContext);

  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider.');
  }

  return context;
}

const SidebarProvider = ({
  id = 'default',
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  id?: string;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) => {
  const isMobile = useIsMobile();
  const [openMobile, setOpenMobile] = React.useState(false);
  const cookieName = getSidebarCookieNameById(id);

  // Initialize open state based on the cookie or the default value
  const [_open, _setOpen] = React.useState(defaultOpen);

  // We use openProp and setOpenProp for control from outside the component.
  const open = openProp ?? _open;
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === 'function' ? value(open) : value;
      if (setOpenProp) {
        setOpenProp(openState);
      } else {
        _setOpen(openState);
      }

      // This sets the cookie to keep the sidebar state.
      setCookie(cookieName, openState, {
        maxAge: SIDEBAR_COOKIE_MAX_AGE,
        path: '/',
      });
    },
    [setOpenProp, open, cookieName],
  );

  // Helper to toggle the sidebar.
  const toggleSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open);
  }, [isMobile, setOpen, setOpenMobile]);

  // Adds a keyboard shortcut to toggle the sidebar.
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        toggleSidebar();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSidebar]);

  // We add a state so that we can do data-state="expanded" or "collapsed".
  // This makes it easier to style the sidebar with Tailwind classes.
  const state = open ? 'expanded' : 'collapsed';

  const contextValue = React.useMemo<SidebarContext>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar],
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH,
              '--sidebar-width-icon': SIDEBAR_WIDTH_ICON,
              '--navbar-height': NAVBAR_HEIGHT,
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            'group/sidebar-wrapper flex min-h-svh w-full',
            className,
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  );
};

const Sidebar = ({
  side = 'left',
  variant = 'sidebar',
  collapsible = 'offcanvas',
  className,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  side?: 'left' | 'right';
  variant?: 'sidebar' | 'floating' | 'inset';
  collapsible?: 'offcanvas' | 'icon' | 'none';
}) => {
  const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

  if (collapsible === 'none') {
    return (
      <div
        className={cn(
          'dark:bg-primary-dark bg-secondary-light flex h-full w-[var(--sidebar-width)] flex-col',
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-sidebar="sidebar"
          data-mobile="true"
          className="bg-secondary-light text-primary-dark dark:bg-primary-dark dark:text-primary-light m-4 h-auto w-[var(--sidebar-width)] overflow-hidden rounded-2xl p-0"
          style={
            {
              '--sidebar-width': SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetTitle className="sr-only">Sidebar menu</SheetTitle>
          <SheetDescription className="sr-only">
            Navigate through the available sections and features using the
            sidebar menu.
          </SheetDescription>
          <div className="flex size-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className="group peer text-primary-dark dark:text-primary-light hidden md:block"
      data-state={state}
      data-collapsible={state === 'collapsed' ? collapsible : ''}
      data-variant={variant}
      data-side={side}
    >
      {/* This is what handles the sidebar gap on desktop */}
      <div
        className={cn(
          'relative h-svh w-[var(--sidebar-width)] bg-transparent transition-[width] duration-200 ease-linear',
          'group-data-[collapsible=offcanvas]:w-0',
          'group-data-[side=right]:rotate-180',
          variant === 'floating' || variant === 'inset'
            ? 'group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_1rem)]'
            : 'group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)]',
          'group-data-[variant=floating]:hidden',
        )}
      />
      <div
        className={cn(
          'fixed inset-y-0 z-10 hidden h-svh w-[var(--sidebar-width)] transition-[left,right,width] duration-200 ease-linear md:flex',
          side === 'left'
            ? 'left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)] group-data-[collapsible=offcanvas]:group-data-[variant=floating]:left-[calc(var(--sidebar-width)*-1.2)]'
            : 'right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)] group-data-[collapsible=offcanvas]:group-data-[variant=floating]:right-[calc(var(--sidebar-width)*-1.2)]',
          // Adjust the padding for floating and inset variants.
          variant === 'floating' || variant === 'inset'
            ? 'p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_1rem)]'
            : 'group-data-[collapsible=icon]:w-[var(--sidebar-width-icon)] group-data-[side=left]:border-r group-data-[side=right]:border-l',
          // Layout Alignment
          'group-data-[variant=floating]:mt-[calc(var(--navbar-height))] group-data-[variant=floating]:mb-6 group-data-[variant=floating]:h-auto',
          // Right Alignment (Default)
          'group-data-[variant=floating]:group-data-[side=right]:mr-6',
          // Left Alignment
          'group-data-[variant=floating]:group-data-[side=left]:ml-6',
          className,
        )}
        {...props}
      >
        <div
          data-sidebar="sidebar"
          className={cn(
            'bg-secondary-light dark:bg-primary-dark flex size-full flex-col',
            (variant === 'floating' || variant === 'inset') &&
              'rounded-2xl shadow-md',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const SidebarTrigger = ({
  className,
  onClick,
  children,
  ...props
}: React.ComponentProps<typeof Button>) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="trigger"
      className={cn(
        'bg-secondary-light text-secondary-dark hover:text-highlight dark:bg-primary-dark dark:text-neutral dark:hover:text-highlight hover:bg-highlight/10 dark:hover:bg-highlight/10 rounded-md p-2 transition-all',
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        toggleSidebar();
      }}
      {...props}
    >
      {children}
      <span className="sr-only">Toggle Sidebar</span>
    </button>
  );
};

const SidebarRail = ({
  className,
  ...props
}: React.ComponentProps<'button'>) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      title="Toggle Sidebar"
      className={cn(
        'hover:after:bg-primary-dark/5 dark:hover:after:bg-primary-light/5 absolute inset-y-0 z-20 hidden w-2 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-1.5 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-0.5 sm:flex',
        'in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize',
        '[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize',
        'group-data-[collapsible=offcanvas]:hover:bg-secondary-light dark:group-data-[collapsible=offcanvas]:hover:bg-primary-dark group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full',
        '[[data-side=left][data-collapsible=offcanvas]_&]:-right-2.5',
        '[[data-side=right][data-collapsible=offcanvas]_&]:-left-2.5',
        className,
      )}
      {...props}
    />
  );
};

const SidebarInset = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div
    className={cn(
      'relative flex min-h-svh flex-1 flex-col',
      'peer-data-[variant=inset]:min-h-[calc(100svh-1rem)] md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2',
      className,
    )}
    {...props}
  />
);

const SidebarInput = ({
  className,
  ...props
}: React.ComponentProps<typeof Input>) => (
  <Input
    data-sidebar="input"
    className={cn(
      'bg-primary-light/50 dark:bg-secondary-dark h-8 w-full',
      className,
    )}
    {...props}
  />
);

const SidebarHeader = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div
    data-sidebar="header"
    className={cn('flex flex-col gap-2 p-2', className)}
    {...props}
  />
);

const SidebarFooter = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div
    data-sidebar="footer"
    className={cn('flex flex-col gap-2 p-2', className)}
    {...props}
  />
);

const SidebarSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) => (
  <Separator
    data-sidebar="separator"
    className={cn(
      'dark:bg-primary-light/10 bg-primary-dark/10 mx-2 w-auto',
      className,
    )}
    {...props}
  />
);

const SidebarContent = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div
    data-sidebar="content"
    className={cn(
      'flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden',
      className,
    )}
    {...props}
  />
);

const SidebarGroup = ({ className, ...props }: React.ComponentProps<'div'>) => (
  <div
    data-sidebar="group"
    className={cn('relative flex w-full min-w-0 flex-col p-2', className)}
    {...props}
  />
);

const SidebarGroupLabel = ({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      data-sidebar="group-label"
      className={cn(
        'text-primary-dark/70 dark:text-primary-light/70 ring-highlight flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium outline-hidden transition-[margin,opa] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        'group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0',
        className,
      )}
      {...props}
    />
  );
};

const SidebarGroupAction = ({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> & { asChild?: boolean }) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-sidebar="group-action"
      className={cn(
        'text-primary-dark dark:text-primary-light ring-highlight hover:bg-highlight/10 hover:text-highlight absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 after:md:hidden',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  );
};

const SidebarGroupContent = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div
    data-sidebar="group-content"
    className={cn('w-full text-sm', className)}
    {...props}
  />
);

const SidebarMenu = ({ className, ...props }: React.ComponentProps<'ul'>) => (
  <ul
    data-sidebar="menu"
    className={cn('flex w-full min-w-0 flex-col gap-1', className)}
    {...props}
  />
);

const SidebarMenuItem = ({
  className,
  ...props
}: React.ComponentProps<'li'>) => (
  <li
    data-sidebar="menu-item"
    className={cn('group/menu-item relative', className)}
    {...props}
  />
);

const sidebarMenuButtonVariants = cva(
  'peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden transition-[width,height,padding] disabled:pointer-events-none disabled:opacity-50 group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'text-secondary-dark/70 hover:bg-highlight/10 hover:text-highlight active:text-primary-light data-[active=true]:font-semibold data-[active=true]:text-primary-dark hover:data-[active=true]:text-highlight dark:text-neutral dark:hover:text-highlight dark:active:text-primary-dark dark:data-[active=true]:text-primary-light dark:hover:data-[active=true]:text-highlight',
        outline:
          'bg-primary-light dark:bg-primary-dark hover:bg-highlight/10 shadow-xs hover:shadow-[0_0_0_1px_var(--color-highlight)]',
      },
      size: {
        default: 'h-8 text-sm',
        sm: 'h-7 text-xs',
        lg: 'h-12 text-sm group-data-[collapsible=icon]:!p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

const SidebarMenuButton = ({
  asChild = false,
  isActive = false,
  variant = 'default',
  size = 'default',
  tooltip,
  className,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipContent>;
} & VariantProps<typeof sidebarMenuButtonVariants>) => {
  const Comp = asChild ? Slot : 'button';
  const { isMobile, state } = useSidebar();

  const button = (
    <Comp
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  );

  if (!tooltip) {
    return button;
  }

  if (typeof tooltip === 'string') {
    tooltip = {
      children: tooltip,
    };
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== 'collapsed' || isMobile}
        {...tooltip}
      />
    </Tooltip>
  );
};

const SidebarMenuAction = ({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<'button'> & {
  asChild?: boolean;
  showOnHover?: boolean;
}) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-sidebar="menu-action"
      className={cn(
        'text-secondary-dark/70 dark:text-neutral hover:bg-highlight/10 hover:text-highlight dark:hover:text-highlight peer-hover/menu-button:text-highlight absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 transition-transform [&>svg]:size-4 [&>svg]:shrink-0',
        // Increases the hit area of the button on mobile.
        'after:absolute after:-inset-2 after:md:hidden',
        'peer-data-[size=sm]/menu-button:top-1',
        'peer-data-[size=default]/menu-button:top-1.5',
        'peer-data-[size=lg]/menu-button:top-2.5',
        'group-data-[collapsible=icon]:hidden',
        showOnHover &&
          'peer-data-[active=true]/menu-button:text-highlight group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 md:opacity-0',
        className,
      )}
      {...props}
    />
  );
};

const SidebarMenuBadge = ({
  className,
  ...props
}: React.ComponentProps<'div'>) => (
  <div
    data-sidebar="menu-badge"
    className={cn(
      'text-primary-dark dark:text-primary-light pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none',
      'peer-hover/menu-button:text-highlight peer-data-[active=true]/menu-button:text-highlight',
      'peer-data-[size=sm]/menu-button:top-1',
      'peer-data-[size=default]/menu-button:top-1.5',
      'peer-data-[size=lg]/menu-button:top-2.5',
      'group-data-[collapsible=icon]:hidden',
      className,
    )}
    {...props}
  />
);

const SidebarMenuSkeleton = ({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<'div'> & {
  showIcon?: boolean;
}) => {
  // Random width between 50 to 90%.
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);

  return (
    <div
      data-sidebar="menu-skeleton"
      className={cn('flex h-8 items-center gap-2 rounded-md px-2', className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-[var(--skeleton-width)] flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            '--skeleton-width': width,
          } as React.CSSProperties
        }
      />
    </div>
  );
};

const SidebarMenuSub = ({
  className,
  ...props
}: React.ComponentProps<'ul'>) => (
  <ul
    data-sidebar="menu-sub"
    className={cn(
      'mx-3.5 flex min-w-0 translate-x-px flex-col py-0.5',
      'group-data-[collapsible=icon]:hidden',
      className,
    )}
    {...props}
  />
);

const SidebarMenuSubItem = ({ ...props }: React.ComponentProps<'li'>) => (
  <li {...props} />
);

const SidebarMenuSubButton = ({
  asChild = false,
  size = 'md',
  isActive,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean;
  size?: 'sm' | 'md';
  isActive?: boolean;
}) => {
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        'text-secondary-dark/70 dark:text-neutral active:bg-highlight/10 active:text-highlight [&>svg]:text-accent flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-r-md p-4 outline-hidden disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
        'data-[active=true]:text-primary-dark dark:data-[active=true]:text-primary-light data-[active=true]:border-primary-dark dark:data-[active=true]:border-primary-light data-[active=true]:font-medium',
        'border-secondary-dark/30 dark:border-neutral/50 border-l',
        'hover:data-[active=true]:border-highlight dark:hover:data-[active=true]:border-highlight hover:bg-highlight/10 hover:text-highlight dark:hover:text-highlight hover:border-highlight dark:hover:border-highlight hover:data-[active=true]:text-highlight dark:hover:data-[active=true]:text-highlight',
        size === 'sm' && 'text-xs',
        size === 'md' && 'text-sm',
        'group-data-[collapsible=icon]:hidden',
        className,
      )}
      {...props}
    />
  );
};

export {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
};
