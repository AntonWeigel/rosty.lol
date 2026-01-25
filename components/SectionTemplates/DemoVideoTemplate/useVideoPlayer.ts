/**
 * Handles custom video playback logic, including play/pause toggling,
 * fullscreen handling, auto-hiding controls, and internal refs.
 *
 * @returns Video/player refs, playback state, control state, and event handlers.
 */
import * as React from 'react';

export const useVideoPlayer = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isFullscreen, setIsFullscreen] = React.useState(false);
  const [showControls, setShowControls] = React.useState(false);

  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

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

  const handleFullscreenToggle = () => {
    const video = videoRef.current;
    const container = containerRef.current;

    if ((video as any)?.webkitEnterFullscreen) {
      if (!isFullscreen) {
        (video as any).webkitEnterFullscreen();
      } else {
        (document as any).webkitExitFullscreen?.();
      }
    } else if (container?.requestFullscreen) {
      if (!document.fullscreenElement) {
        container.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  };

  const handleShowControls = () => {
    if (!isPlaying) return;
    setShowControls(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowControls(false), 3000);
  };

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () =>
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return {
    videoRef,
    containerRef,
    isPlaying,
    isFullscreen,
    showControls,
    setIsPlaying,
    handleToggle,
    handleFullscreenToggle,
    handleShowControls,
  };
};
