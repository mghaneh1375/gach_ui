import styled from 'styled-components';
import vars from './../root';
import {TextInput} from 'react-native';
import {DateTimePicker} from 'react-advance-jalaali-datepicker';
import SelectBox from 'react-native-multi-selectbox';

const CommonTextInputStyle = {
  backgroundColor: 'white',
  borderWidth: 1,
  borderRadius: 15,
  padding: 10,
  fontFamily: 'IRANSans',
  borderColor: vars.LIGHT_SILVER,
};

const CommonTextInputStyleAndroid = {
  ...CommonTextInputStyle,
};

export const CommonTextInputStyleWeb = {
  ...CommonTextInputStyle,
  direction: 'rtl',
  // width: 'calc(100% - 20px)',
  display: 'block',
  // maxWidth: '300px',
  flexDirection: 'row',
};

export const CommonHalfTextInputStyleWeb = {
  ...CommonTextInputStyle,
  direction: 'rtl',
  flexDirection: 'row',
};

export const CommonTextInputElem = styled(TextInput)`
  ${CommonTextInputStyleAndroid}
`;

export const CommonSelectElem = styled(SelectBox)`
  ${CommonTextInputStyleAndroid}
`;

export const CommonDatePickerElem = styled(DateTimePicker)`
  ${CommonTextInputStyleAndroid}
`;
