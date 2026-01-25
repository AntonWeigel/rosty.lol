'use client';

import { useLottie } from 'lottie-react';
import * as React from 'react';

import { useInView } from '@/hooks';
import { cn } from '@/utils';

type AnimationOptions = {
  loop: boolean;
  autoplay: boolean;
  style?: React.CSSProperties;
};

const defaultOptions: AnimationOptions = {
  loop: true,
  autoplay: true,
  style: { display: 'flex', width: '100%', height: '100%' },
};

type AnimationProps = React.HTMLAttributes<HTMLDivElement> & {
  animationData: object;
  options?: AnimationOptions;
};

export const Animation: React.FC<AnimationProps> = ({
  animationData,
  options,
  className,
  ...props
}) => {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.5 });
  const { loop, autoplay, style } = options || defaultOptions;
  const config = React.useMemo(
    () => ({
      animationData,
      loop,
      autoplay,
    }),
    [animationData, loop, autoplay],
  );
  const { View, play, stop } = useLottie(config, style);

  React.useEffect(() => {
    if (isInView && autoplay) {
      play();
    } else {
      stop();
    }
  }, [isInView, autoplay, play, stop]);

  return (
    <div className={cn('flex', className)} ref={ref} {...props}>
      {View}
    </div>
  );
};
