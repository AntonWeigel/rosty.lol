'use client';

import { useTheme } from 'next-themes';
import * as React from 'react';

import animationDataDark from '@/assets/animation/page-not-found-dark.json';
import animationDataLight from '@/assets/animation/page-not-found-light.json';
import { Animation } from '@/components/Animation';

export const PageNotFoundAnimation: React.FC = () => {
  const { resolvedTheme } = useTheme();
  const animationData =
    resolvedTheme === 'dark' ? animationDataDark : animationDataLight;

  return <Animation animationData={animationData} />;
};
