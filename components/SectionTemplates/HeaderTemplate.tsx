import { cva, VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { ComponentVariant } from '@/constants/enums';
import { cn } from '@/utils';

const headerVariants = cva(
  'mt-6 w-full font-medium text-primary-dark dark:text-primary-light',
  {
    variants: {
      variant: {
        primary: 'text-3xl',
        secondary: 'text-2xl',
      },
    },
    defaultVariants: {
      variant: 'primary',
    },
  },
);

export interface HeaderProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headerVariants> {
  text: string;
}

const Header: React.FC<HeaderProps> = ({
  text,
  variant,
  className,
  ...props
}) => {
  const HeadingTag = variant === 'primary' ? 'h2' : 'h3';
  return (
    <HeadingTag
      className={cn(headerVariants({ variant }), className)}
      {...props}
    >
      {text}
    </HeadingTag>
  );
};

export const HeaderTemplate: React.FC<{
  text: string;
  variant: string;
}> = ({ text, variant }) => {
  const mappedVariant =
    variant === ComponentVariant.Primary ? 'primary' : 'secondary';

  return <Header text={text} variant={mappedVariant} />;
};
