import * as React from 'react';

import { Separator } from '@/components/ui/Separator';
import { cn } from '@/utils';

type DashboardCardProps = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
};

export const DashboardCard: React.FC<DashboardCardProps> & {
  Header: typeof Header;
  Content: typeof Content;
  Footer: typeof Footer;
} = ({ children, className, ...props }) => (
  <div
    className={cn(
      'bg-secondary-light dark:bg-primary-dark flex w-full flex-col gap-6 rounded-xl p-6 shadow-sm sm:w-[340px]',
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
  <div className={cn('flex flex-col gap-2', className)} {...props}>
    <h3 className="text:secondary-dark dark:text-secondary-light text-sm font-medium">
      {children}
    </h3>
    <Separator />
  </div>
);

const Content: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn(className)} {...props}>
      {children}
    </div>
  );
};

const Footer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={cn('flex justify-center', className)} {...props}>
      {children}
    </div>
  );
};

DashboardCard.Header = Header;
DashboardCard.Content = Content;
DashboardCard.Footer = Footer;
