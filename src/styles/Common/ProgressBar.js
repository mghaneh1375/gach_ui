import React from 'react';
import {MyView} from '../Common';

function ProgressBar(props) {
  return (
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
          width: props.percent + '%',
          display: 'block',
          height: 7,
          backgroundColor: '#ffaa00',
        }}
      />
    </MyView>
  );
}

export default ProgressBar;
