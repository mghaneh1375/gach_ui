import React from 'react';
import VideoJS from './VideoJS';

function Video(props) {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: false,
    controls: true,
    responsive: true,
    fluid: true,
    displayCurrentQuality: true,
    sources: [
      {
        src: props.src,
      },
    ],
  };

  const handlePlayerReady = player => {
    playerRef.current = player;
  };

  return (
    <>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </>
  );
}

export default Video;
