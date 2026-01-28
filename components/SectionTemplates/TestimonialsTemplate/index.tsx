'use client';

import * as React from 'react';

import { SectionHeader } from '@/components/SectionHeader';
import { TemplateSection } from '@/components/TemplateSection';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/Carousel';
import { QuoteSymbol } from '@/icons';
import { LandingSectionsTestimonials } from '@/tina/__generated__/types';
import { cn, getInitials } from '@/utils';

import { useTestimonials } from './useTestimonials';

export const TestimonialsTemplate: React.FC<LandingSectionsTestimonials> = ({
  id,
  animation,
  header,
  items = [],
}) => {
  const {
    selectedIndex,
    setMainCarouselApi,
    thumbnailCarouselRef,
    onThumbnailClick,
  } = useTestimonials();

  return (
    <TemplateSection id={id} animation={animation} className="gap-16 pt-0" highlighted>
      {header?.title && (
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

      <div className="container flex max-w-2xl flex-col items-center gap-4">
        {/* Main Carousel */}
        <Carousel
          setApi={setMainCarouselApi}
          opts={{ loop: true }}
          className="w-full max-w-2xl"
        >
          <CarouselContent>
            {items.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="flex w-full flex-col items-center gap-10"
              >
                <div className="flex w-full max-w-2xl flex-col gap-4 sm:flex-row">
                  <div>
                    <QuoteSymbol />
                  </div>
                  <p className="text-secondary-dark dark:text-neutral text-lg font-medium">
                    {testimonial.quote}
                  </p>
                </div>

                <div className="flex items-center gap-4 p-1">
                  <div className="bg-primary-light dark:bg-secondary-dark flex min-w-[260px] items-center gap-5 rounded-full px-6 py-4 shadow-xs">
                    <Avatar className="size-12">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name || 'NA'}
                      />
                      <AvatarFallback>
                        {getInitials(testimonial.name || 'NA')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-primary-dark dark:text-primary-light text-sm font-medium">
                        {testimonial.name}
                      </span>
                      <span className="text-secondary-dark dark:text-neutral text-xs">
                        {testimonial.useCase}
                      </span>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Thumbnail Carousel */}
        <div className="flex">
          <div
            className="flex max-w-[176px] overflow-hidden"
            ref={thumbnailCarouselRef}
          >
            <div className="grid auto-cols-[33%] grid-flow-col">
              {items.map((testimonial, index) => (
                <div
                  key={index}
                  className="ml-2 min-w-0 shrink-0 grow-0 basis-1/3"
                >
                  <button
                    onClick={() => onThumbnailClick(index)}
                    className={cn(
                      'flex size-12 items-center justify-center overflow-hidden rounded-full',
                      index === selectedIndex
                        ? 'dark:border-neutral/50 border-secondary-dark/50 border-2'
                        : '',
                    )}
                  >
                    <Avatar className="size-full">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name || 'NA'}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        {getInitials(testimonial.name || 'NA')}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </TemplateSection>
  );
};
