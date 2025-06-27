import { useEffect, useRef } from 'react';
import Hls from 'hls.js';

interface HlsVideoPlayerProps {
  src: string;
}

function HlsVideoPlayer({ src }: HlsVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(src);
        hls.attachMedia(videoRef.current);
        return () => {
          hls.destroy();
        };
      } else if (videoRef.current.canPlayType('application/vnd.apple.mpegurl')) {
        // Safari suporta nativamente
        videoRef.current.src = src;
      }
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls
      style={{ width: '100%', maxWidth: 520, borderRadius: 10, background: '#f0f4fa' }}
    />
  );
}

export default HlsVideoPlayer;