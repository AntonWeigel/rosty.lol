import useEmblaCarousel from 'embla-carousel-react';
import * as React from 'react';

import { CarouselApi } from '@/components/ui/Carousel';

/**
 * Manages testimonial carousel logic including syncing main and thumbnail carousels.
 *
 * @returns Selected index, carousel refs, and handlers for setting API and thumbnail clicks.
 */
export const useTestimonials = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [mainCarouselApi, setMainCarouselApi] =
    React.useState<CarouselApi | null>(null);

  const [thumbnailCarouselRef, thumbnailCarouselApi] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
    loop: true,
  });

  // Sync the selected index between main and thumbnail carousels
  const syncSelection = React.useCallback(() => {
    if (!mainCarouselApi || !thumbnailCarouselApi) return;

    const selectedSnap = mainCarouselApi.selectedScrollSnap();
    setSelectedIndex(selectedSnap);
    thumbnailCarouselApi.scrollTo(selectedSnap);
  }, [mainCarouselApi, thumbnailCarouselApi]);

  React.useEffect(() => {
    if (!mainCarouselApi) return;
    syncSelection();
    mainCarouselApi.on('select', syncSelection).on('reInit', syncSelection);
    return () => {
      mainCarouselApi.off('select', syncSelection).off('reInit', syncSelection);
    };
  }, [mainCarouselApi, syncSelection]);

  const onThumbnailClick = React.useCallback(
    (index: number) => {
      if (!mainCarouselApi) return;
      mainCarouselApi.scrollTo(index);
    },
    [mainCarouselApi],
  );

  return {
    selectedIndex,
    setMainCarouselApi,
    thumbnailCarouselRef,
    onThumbnailClick,
  };
};
