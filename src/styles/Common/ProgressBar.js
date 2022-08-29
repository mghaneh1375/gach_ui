import React from 'react';
import {MyView} from 'react-native-multi-selectbox';

function ProgressBar(props) {
  return (
    // <div className={'progress'}>
    //   <div className={'bars'} style={{width: props.bar}}></div>
    // </div>
    <MyView
      style={{
        display: 'block',
        width: '100%',
        height: 7,
        backgroundColor: '#013243',
        margin: 'auto',
      }}>
      <MyView
        style={{
          width: props.bar,
          display: 'block',
          height: 7,
          backgroundColor: '#ffaa00',
        }}></MyView>
    </MyView>
  );
}

export default ProgressBar;
