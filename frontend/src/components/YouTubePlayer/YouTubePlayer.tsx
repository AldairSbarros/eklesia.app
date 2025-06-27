import YouTube from 'react-youtube';

interface YouTubePlayerProps {
  videoId: string;
}

function YouTubePlayer({ videoId }: YouTubePlayerProps) {
  return (
    <YouTube
      videoId={videoId}
      opts={{
        width: '100%',
        height: '390',
        playerVars: { autoplay: 0 }
      }}
      style={{ borderRadius: 10, overflow: 'hidden' }}
    />
  );
}

export default YouTubePlayer;