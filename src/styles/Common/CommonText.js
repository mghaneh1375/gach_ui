import styled from 'styled-components';
import vars from './../root';
import {TextInput, View, Platform} from 'react-native';

const CommonTextInputStyle = {
  padding: 10,
  backgroundColor: 'white',
  borderWidth: 1,
  borderRadius: 15,
  fontFamily: 'IRANSans',
  borderColor: vars.LIGHT_SILVER,
};

const CommonTextInputStyleAndroid = {
  ...CommonTextInputStyle,
  flexDirection: 'row-reverse',
};

export const CommonTextInputStyleWeb = {
  ...CommonTextInputStyle,
  direction: 'rtl',
  width: 'calc(100% - 20px)',
  display: 'block',
  maxWidth: '300px',
};

export const CommonTextInputContainer = styled(View)`
  margintop: 10px;
`;

export const CommonTextInputElem = styled(TextInput)`
  ${CommonTextInputStyleAndroid}
`;
