import React, {useRef} from 'react';
import ReactHlsPlayer from 'react-hls-player';
import {MyView, SimpleText} from '../../styles/Common';
import ReactPlayer from 'react-player';
import NVideo from 'react-native-video';

function Video(props) {
  return (
    <MyView style={{padding: 50}}>
      <NVideo
        source={{uri: 'https://statics.irysc.com/videos/playlist.m3u8'}} // Can be a URL or a local file.
        ref={ref => {
          this.player = ref;
        }} // Store reference
        onBuffer={this.onBuffer} // Callback when remote video is buffering
        onError={this.videoError} // Callback when video cannot be loaded
      />
    </MyView>
  );
}

export default Video;
