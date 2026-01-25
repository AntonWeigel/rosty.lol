import Image from 'next/image';
import * as React from 'react';

import {
  DocSectionsImage,
  PageSectionsImage,
  PostSectionsImage,
} from '@/tina/__generated__/types';

type ImageTemplateProps =
  | PageSectionsImage
  | PostSectionsImage
  | DocSectionsImage;

export const ImageTemplate: React.FC<ImageTemplateProps> = ({
  src,
  alt,
  height,
  width,
  source,
}) => {
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="w-full overflow-hidden rounded-2xl">
        <Image
          src={src}
          alt={alt || source?.title || ''}
          width={width || 800}
          height={height || 600}
          className="h-auto w-full"
        />
      </div>
      {source && (
        <figcaption className="text-secondary-dark dark:text-neutral text-center text-sm">
          Source:{' '}
          <a
            href={source.url}
            rel="noopener noreferrer"
            target={'_blank'}
            className="hover:text-highlight underline"
          >
            {source.title}
          </a>
        </figcaption>
      )}
    </div>
  );
};
