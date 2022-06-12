import styled from 'styled-components';
import vars from './../root';
import {TextInput, View, Platform} from 'react-native';

const CommonTextInputStyle = {
  padding: 10,
  backgroundColor: 'white',
  borderWidth: 2,
  borderRadius: 15,
  borderColor: vars.LIGHT_SILVER,
};

const CommonTextInputStyleAndroid = {
  ...CommonTextInputStyle,
  flexDirection: 'row-reverse',
};

const CommonTextInputStyleWeb = {
  ...CommonTextInputStyle,
  direction: 'rtl',
  width: 'calc(100% - 60px)',
};

export const CommonTextInputContainer =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(View)`
        margin: 20px;
      `
    : styled.div``;

export const CommonTextInputElem =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(TextInput)`
        ${CommonTextInputStyleAndroid}
      `
    : styled.input`
        ${CommonTextInputStyleWeb}
      `;
