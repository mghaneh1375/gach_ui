import React, {useRef} from 'react';
import {MyView} from '../../styles/Common';
import VideoJS from './VideoJS';

function Video(props) {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    displayCurrentQuality: true,
    sources: [
      {
        src: 'https://statics.irysc.com/videos/playlist.m3u8',
        // type: 'video/mp4',
      },
    ],
  };

  const handlePlayerReady = player => {
    playerRef.current = player;

    // You can handle player events here, for example:
    player.on('waiting', () => {
      console.log('player is waiting');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });
  };

  return (
    <>
      <div>Rest of app here</div>
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
      <div>Rest of app here</div>
    </>
  );
}

export default Video;
