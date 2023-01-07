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
      <VideoJS
        myOptions={{
          disableSeekbar: props.disableSeekbar,
        }}
        onFinish={props.onFinish}
        options={videoJsOptions}
        onReady={handlePlayerReady}
        end={true}
      />
    </>
  );
}

export default Video;
