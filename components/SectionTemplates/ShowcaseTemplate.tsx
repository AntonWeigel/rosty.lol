'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { SectionHeader } from '@/components/SectionHeader';
import { TemplateSection } from '@/components/TemplateSection';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarouselDots,
} from '@/components/ui/Carousel';
import { Screen } from '@/constants/screens';
import { useScreenBreakpoint } from '@/hooks';
import { LandingSectionsShowcase } from '@/tina/__generated__/types';
import { cn } from '@/utils';

export const ShowcaseTemplate: React.FC<LandingSectionsShowcase> = ({
  id,
  animation,
  header,
  projects = [],
}) => {
  const [api, setApi] = React.useState<any>(null);
  const { selectedIndex, scrollSnaps, scrollTo } = useCarouselDots(api);
  const isMobile = useScreenBreakpoint(Screen.sm);

  return (
    <TemplateSection id={id} animation={animation} className="w-screen sm:w-full">
      {header && (
        <SectionHeader className="px-4 sm:px-0">
          {header.label && (
            <SectionHeader.Label>{header.label}</SectionHeader.Label>
          )}
          <SectionHeader.Title>{header.title}</SectionHeader.Title>
          {header.subtitle && (
            <SectionHeader.Subtitle>{header.subtitle}</SectionHeader.Subtitle>
          )}
        </SectionHeader>
      )}

      <div className="relative mx-auto w-full lg:max-w-screen-lg">
        <Carousel
          opts={{
            align: isMobile ? 'center' : 'start',
            containScroll: 'trimSnaps',
            loop: false,
          }}
          setApi={setApi}
        >
          <CarouselContent className="mr-4 pl-2 sm:mr-0 sm:pl-0">
            {projects.map((project, index) => (
              <CarouselItem
                key={index}
                className={cn(
                  'flex justify-center pb-6',
                  'max-w-[18rem] basis-[80%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4',
                )}
              >
                <Link
                  href={project.link || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300',
                    'hover:bg-secondary-light dark:hover:bg-primary-dark hover:shadow-md',
                  )}
                >
                  <div className="relative w-full overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      width={300}
                      height={200}
                      className="rounded-2xl object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                  </div>

                  <div className="text-secondary-dark dark:text-neutral flex items-center justify-between gap-4 p-6 text-sm">
                    <span className="font-medium">{project.name}</span>
                    <span className="underline">
                      {project.website || project.link}
                    </span>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Arrows on desktop only */}
          <div className="mt-4 hidden w-full justify-end sm:flex">
            <div className="flex gap-4">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </div>

          {/* Dots on mobile */}
          <div className="mt-4 flex min-h-2 justify-center gap-2 sm:hidden">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                className={cn(
                  'h-2 w-2 rounded-full shadow-xs transition-colors',
                  index === selectedIndex
                    ? 'bg-accent'
                    : 'bg-secondary-dark/50 dark:bg-neutral/50',
                )}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </TemplateSection>
  );
};
