import React from 'react';
import {ActivityIndicator} from 'react-native';
import {MyView} from 'react-native-multi-selectbox';
import {PhoneView, SimpleText} from '../styles/Common';
import {styles} from '../styles/Common/Styles';
import vars from '../styles/root';
import commonTranslator from '../translator/Common';

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
    }}>
    <PhoneView style={{...styles.marginAuto}}>{props.child}</PhoneView>
  </MyView>
);
