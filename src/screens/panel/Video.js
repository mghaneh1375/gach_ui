import React, {useState} from 'react';
import VideoJS from './VideoJS';

function Video(props) {
  const playerRef = React.useRef(null);

  const [videoJsOptions, setVideoJsOptions] = useState({
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
  });

  React.useEffect(() => {
    setVideoJsOptions({
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
    });
  }, [props.src]);

  const handlePlayerReady = player => {
    playerRef.current = player;
  };

  return (
    <VideoJS
      myOptions={{
        disableSeekbar: props.disableSeekbar,
      }}
      onFinish={props.onFinish}
      options={videoJsOptions}
      onReady={handlePlayerReady}
      end={true}
    />
  );
}

export default Video;
