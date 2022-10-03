import React from 'react';

import {MyView, PhoneView} from '../styles/Common';
import {styles} from '../styles/Common/Styles';

export const LoadingCommonWebBox = props => (
  <MyView
    style={{
      ...styles.positionAbsolute,
      width: '100%',
      height: '100%',
      top: 0,
      right: 0,
      backgroundColor: '#e6e6e6cc',
      borderRadius: 7,
      zIndex: 1,
    }}>
    <PhoneView style={{...styles.marginAuto}}>{props.children}</PhoneView>
  </MyView>
);
