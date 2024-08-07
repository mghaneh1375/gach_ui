import React, {useState} from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import qualitySelector from 'videojs-hls-quality-selector';
import contribQualityLevels from 'videojs-contrib-quality-levels';

videojs.registerPlugin('qualityLevel', contribQualityLevels);
videojs.registerPlugin('hlsQualitySelector', qualitySelector);

export const VideoJS = props => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const {myOptions, onFinish, options, onReady} = props;
  const [init, setInit] = useState(false);
  const [isWorking, setIsWorking] = useState();

  React.useEffect(() => {
    if (isWorking || init) return;

    setIsWorking(true);

    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement('video-js');

      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        if (myOptions.disableSeekbar) {
          player.on('ready', () => {
            let div = document.createElement('div');
            div.innerHTML = `<p style=" margin-top: -70px; color: wihte; font-size: 11px;
    position: absolute;
    padding: 5px;
    background-color: #3a3a3a;
    width: 123px;
    font-family: 'IRANSans';">تا چند ثانیه دیگه فیلم این جلسه را می‌بینی!</p>`;
            player.el().appendChild(div);
          });
        }

        player.on('ended', function () {
          onFinish();
        });

        player.hlsQualitySelector({
          displayCurrentQuality: true,
        });

        if (myOptions.disableSeekbar)
          player.controlBar.progressControl.disable();

        onReady && onReady(player);
      }));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      if (myOptions.disableSeekbar) player.controlBar.progressControl.disable();

      player.hlsQualitySelector({
        displayCurrentQuality: true,
      });
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }

    setInit(true);
    setIsWorking(false);
  }, [
    options,
    videoRef,
    onReady,
    myOptions.disableSeekbar,
    onFinish,
    isWorking,
    init,
  ]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        // player.hlsQualitySelector({displayCurrentQuality: true});
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJS;
