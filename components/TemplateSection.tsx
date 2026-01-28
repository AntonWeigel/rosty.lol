'use client';

import * as React from 'react';

import { SectionAnimation } from '@/constants/enums';
import { useInView } from '@/hooks';
import { cn, normalizeValueFromTina } from '@/utils';

const animationClasses: Record<SectionAnimation, string> = {
  [SectionAnimation.None]: '',
  [SectionAnimation.Fade]: 'animate-in fade-in duration-700',
  [SectionAnimation.SlideUp]:
    'animate-in fade-in slide-in-from-bottom-8 duration-700',
  [SectionAnimation.SlideLeft]:
    'animate-in fade-in slide-in-from-left-8 duration-700',
  [SectionAnimation.SlideRight]:
    'animate-in fade-in slide-in-from-right-8 duration-700',
  [SectionAnimation.Zoom]: 'animate-in fade-in zoom-in-95 duration-700',
};

export type TemplateSectionProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  'id'
> & {
  id?: string | null;
  highlighted?: boolean;
  animation?: SectionAnimation | string | null;
};

export const TemplateSection = ({
  id,
  className,
  highlighted,
  animation,
  children,
  ...props
}: TemplateSectionProps) => {
  const [ref, isInView] = useInView<HTMLElement>({ threshold: 0.1 });
  const [hasAnimated, setHasAnimated] = React.useState(false);

  const animationType =
    (animation as SectionAnimation) || SectionAnimation.None;
  const shouldAnimate = animationType !== SectionAnimation.None;

  React.useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <section
      ref={shouldAnimate ? ref : undefined}
      id={normalizeValueFromTina(id)}
      className={cn(
        'flex w-full flex-col items-center justify-center gap-12',
        highlighted
          ? 'bg-secondary-light dark:bg-primary-dark -mt-24 w-screen py-24'
          : 'scroll-mt-24',
        shouldAnimate && (hasAnimated ? animationClasses[animationType] : 'opacity-0'),
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
};
