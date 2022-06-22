import styled from 'styled-components';
import vars from './../root';
import {TextInput, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

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
  flexDirection: 'row',
};

export const CommonHalfTextInputStyleWeb = {
  ...CommonTextInputStyle,
  direction: 'rtl',
  flexDirection: 'row',
};

export const CommonTextInputContainer = styled(View)`
  margintop: 10px;
`;

export const CommonTextInputElem = styled(TextInput)`
  ${CommonTextInputStyleAndroid}
`;

export const CommonSelectElem = styled(SelectDropdown)`
  ${CommonTextInputStyleAndroid}
`;
