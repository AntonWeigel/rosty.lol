import { PauseIcon, PlayIcon } from 'lucide-react';
import * as React from 'react';

import { Rating } from '@/components/Rating';
import { LandingSectionsTestimonialsGridTestimonialsVideoTestimonial } from '@/tina/__generated__/types';

export const VideoTestimonial: React.FC<
  LandingSectionsTestimonialsGridTestimonialsVideoTestimonial
> = ({ quote, name, videoUrl, posterImage, starRating }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handleToggle = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="bg-secondary-light dark:bg-primary-dark break-inside-avoid overflow-hidden rounded-xl shadow-md">
      <div className="relative">
        <video
          ref={videoRef}
          onClick={handleToggle}
          className="aspect-[3/4] w-full object-cover"
          poster={posterImage}
          preload="metadata"
          playsInline
          controls={false}
          controlsList="nodownload nofullscreen noremoteplayback"
          disablePictureInPicture
          onEnded={() => setIsPlaying(false)}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {!isPlaying && (
          <>
            {/* Gradient */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-black/80 to-transparent" />

            {/* Overlay content */}
            <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between p-4">
              <button
                onClick={handleToggle}
                className="text-secondary-light flex transition-transform duration-100 ease-in hover:scale-105 focus:outline-hidden"
                aria-label="Play video"
              >
                <PlayIcon className="size-16" />
              </button>

              <div className="text-secondary-light flex flex-col items-center gap-0.5">
                <div className="text-sm font-medium">{name}</div>
                <Rating stars={starRating} />
              </div>
            </div>
          </>
        )}

        {isPlaying && (
          <div className="absolute bottom-4 left-4 z-20">
            <button
              onClick={handleToggle}
              className="text-secondary-light flex transition-transform duration-100 ease-in hover:scale-105 focus:outline-hidden"
              aria-label="Pause video"
            >
              <PauseIcon className="size-16" />
            </button>
          </div>
        )}
      </div>

      <div className="text-secondary-dark dark:text-secondary-light px-6 py-4 text-sm leading-relaxed">
        {quote}
      </div>
    </div>
  );
};
