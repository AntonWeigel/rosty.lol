import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Separator } from '@/components/ui/Separator';
import { TestimonialsPlatform } from '@/constants/enums';
import { TestimonialsSourceIconMap } from '@/constants/maps';
import { LandingSectionsTestimonialsGridTestimonialsTextTestimonial } from '@/tina/__generated__/types';
import { getInitials } from '@/utils';

export const TextTestimonial: React.FC<
  LandingSectionsTestimonialsGridTestimonialsTextTestimonial
> = ({ quote, name, alias, avatar, source, image }) => {
  const PlatformIcon = source
    ? TestimonialsSourceIconMap[source?.platform as TestimonialsPlatform]
    : null;

  return (
    <div className="bg-secondary-light dark:bg-primary-dark flex break-inside-avoid flex-col rounded-xl shadow-md">
      {image?.src && image.width && image.height && (
        <div className="overflow-hidden rounded-t-xl">
          <Image
            src={image.src}
            alt={image.alt || quote}
            width={image.width}
            height={image.height}
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-col gap-6 p-6">
        <p className="text-secondary-dark dark:text-secondary-light text-sm leading-relaxed">
          {quote}
        </p>

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {avatar && (
              <Avatar className="border-secondary-dark/50 dark:border-neutral/50 border">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback>{getInitials(name)}</AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-col gap-1 text-xs leading-tight">
              {name && <div className="font-medium">{name}</div>}
              {alias && (
                <div className="text-secondary-dark dark:text-neutral">
                  {alias}
                </div>
              )}
            </div>
          </div>

          {source && PlatformIcon && (
            <Link href={source.url} target="_blank" rel="noopener noreferrer">
              <PlatformIcon />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
