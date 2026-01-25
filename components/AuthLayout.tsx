import * as React from 'react';

import { cn } from '@/utils';

export const AuthLayout: React.FC<{ children: React.ReactNode }> & {
  Header: typeof AuthHeader;
  Title: typeof AuthTitle;
  Subtitle: typeof AuthSubtitle;
  Form: typeof AuthForm;
  Separator: typeof AuthSeparator;
  Social: typeof AuthSocial;
} = ({ children }) => (
  <div className="flex min-h-[calc(100vh-192px)] min-w-64 flex-1 flex-col items-center justify-center gap-8">
    {children}
  </div>
);

export const AuthHeader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => <div className="flex flex-col items-center gap-2">{children}</div>;

export const AuthTitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <h1 className="text-highlight text-sm font-semibold tracking-wider uppercase">
    {children}
  </h1>
);

export const AuthSubtitle: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <p className="text-secondary-dark dark:text-neutral text-center text-sm">
    {children}
  </p>
);

export const AuthForm: React.FC<React.FormHTMLAttributes<HTMLFormElement>> = ({
  children,
  className,
  ...props
}) => (
  <form
    className={cn(
      'flex w-full max-w-xs flex-col items-center gap-5',
      className,
    )}
    {...props}
  >
    {children}
  </form>
);

export const AuthSeparator: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
  <div className="relative flex w-full max-w-xs items-center">
    <div className="border-secondary-dark/50 dark:border-neutral/50 grow border-t" />
    <span className="text-secondary-dark dark:text-neutral mx-4 text-xs font-semibold uppercase">
      {children}
    </span>
    <div className="border-secondary-dark/50 dark:border-neutral/50 grow border-t" />
  </div>
);

export const AuthSocial: React.FC<{
  children: React.ReactNode;
  label?: string;
}> = ({ children, label = 'Sign in with social account' }) => (
  <div className="flex flex-col items-center gap-2">
    <div className="flex justify-center gap-3">{children}</div>
    <p className="text-secondary-dark dark:text-neutral text-xs">{label}</p>
  </div>
);

AuthLayout.Header = AuthHeader;
AuthLayout.Title = AuthTitle;
AuthLayout.Subtitle = AuthSubtitle;
AuthLayout.Form = AuthForm;
AuthLayout.Separator = AuthSeparator;
AuthLayout.Social = AuthSocial;
