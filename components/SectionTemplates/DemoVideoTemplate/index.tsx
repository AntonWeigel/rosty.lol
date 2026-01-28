'use client';

import { MaximizeIcon, MinimizeIcon, PlayIcon } from 'lucide-react';
import * as React from 'react';

import { SectionHeader } from '@/components/SectionHeader';
import { TemplateSection } from '@/components/TemplateSection';
import { LandingSectionsDemoVideo } from '@/tina/__generated__/types';
import { cn } from '@/utils';

import { useVideoPlayer } from './useVideoPlayer';

export const DemoVideoTemplate: React.FC<LandingSectionsDemoVideo> = ({
  id,
  animation,
  header,
  videoUrl,
  posterImage,
}) => {
  const {
    videoRef,
    containerRef,
    isPlaying,
    isFullscreen,
    showControls,
    setIsPlaying,
    handleToggle,
    handleFullscreenToggle,
    handleShowControls,
  } = useVideoPlayer();

  return (
    <TemplateSection id={id} animation={animation} className="mb-24">
      {header && (
        <SectionHeader>
          {header.label && (
            <SectionHeader.Label>{header.label}</SectionHeader.Label>
          )}
          <SectionHeader.Title>{header.title}</SectionHeader.Title>
          {header.subtitle && (
            <SectionHeader.Subtitle>{header.subtitle}</SectionHeader.Subtitle>
          )}
        </SectionHeader>
      )}

      <div
        ref={containerRef}
        onMouseMove={handleShowControls}
        onTouchStart={handleShowControls}
        className="group relative mx-auto w-full max-w-5xl overflow-hidden rounded-md shadow-lg sm:rounded-xl"
      >
        <video
          ref={videoRef}
          onClick={handleToggle}
          onEnded={() => setIsPlaying(false)}
          className="aspect-video w-full rounded-md object-cover sm:rounded-xl"
          poster={posterImage}
          playsInline
          preload="auto"
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay when paused */}
        {!isPlaying && (
          <div className="pointer-events-none absolute inset-0 z-10 bg-black/40 transition-opacity" />
        )}

        {/* Play button */}
        {!isPlaying && (
          <button
            onClick={handleToggle}
            aria-label="Play demo video"
            className={cn(
              'absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full p-4 shadow-xs backdrop-blur-sm transition-transform ease-in hover:scale-105 sm:p-6',
              'bg-primary-light/80 text-secondary-dark dark:bg-primary-dark/80 dark:text-secondary-light',
            )}
          >
            <PlayIcon className="size-8 sm:size-16" />
          </button>
        )}

        {/* Fullscreen toggle */}
        {(showControls || !isPlaying) && (
          <button
            onClick={handleFullscreenToggle}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            className={cn(
              'text-secondary-light absolute right-2 bottom-2 z-20 rounded-md p-1 sm:right-4 sm:bottom-4',
              'opacity-100 transition-all ease-in hover:scale-105 sm:opacity-0 sm:group-hover:opacity-100',
            )}
          >
            {isFullscreen ? (
              <MinimizeIcon className="size-5" />
            ) : (
              <MaximizeIcon className="size-5" />
            )}
          </button>
        )}
      </div>
    </TemplateSection>
  );
};
