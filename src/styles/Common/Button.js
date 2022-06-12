import vars from './../root';
import {Platform, Pressable} from 'react-native';
import styled from 'styled-components';

const CommonButtonStyleAndroid = {
  backgroundColor: vars.ORANGE,
  textAlign: 'center',
  color: vars.WHITE,
  borderRadius: 20,
  fontSize: 24,
  width: '50%',
  alignSelf: 'flex-end',
  padding: 10,
};

export const CommonButtonTextStyleAndroid = {
  textAlign: 'center',
  color: vars.WHITE,
  fontSize: 24,
};

const CommonButtonStyleWeb = {
  backgroundColor: vars.ORANGE,
  textAlign: 'center',
  color: vars.WHITE,
  margin: 20,
  borderRadius: 20,
  fontSize: 24,
  width: '50%',
  float: 'right',
  clear: 'both',
  border: 'none',
  padding: '10px',
};

export const Button =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(Pressable)`
        ${CommonButtonStyleAndroid}
      `
    : styled.button`
        ${CommonButtonStyleWeb}
      `;
