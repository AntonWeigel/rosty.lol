import * as React from 'react';

import { Separator } from '@/components/ui/Separator';
import { cn } from '@/utils';

type DashboardCardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export const DashboardSection: React.FC<DashboardCardProps> & {
  Header: typeof Header;
  Content: typeof Content;
  Footer: typeof Footer;
  Actions: typeof Actions;
} = ({ children, className, ...props }) => (
  <div
    className={cn(
      'bg-secondary-light dark:bg-primary-dark flex flex-col gap-6 rounded-2xl p-6 shadow-sm',
      className,
    )}
    {...props}
  >
    {children}
  </div>
);

const Header: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <>
    <div
      className={cn(
        'flex w-full flex-col items-center justify-between gap-4 sm:flex-row',
        className,
      )}
      {...props}
    >
      {children}
    </div>
    <Separator />
  </>
);

const Content: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn('flex flex-col items-center gap-8', className)}
      {...props}
    >
      {children}
    </div>
  );
};

const Actions: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => (
  <div className={cn('flex gap-2', className)} {...props}>
    {children}
  </div>
);

const Footer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <>
      <Separator />
      <div className={cn('flex justify-center', className)} {...props}>
        {children}
      </div>
    </>
  );
};

DashboardSection.Header = Header;
DashboardSection.Content = Content;
DashboardSection.Footer = Footer;
DashboardSection.Actions = Actions;
