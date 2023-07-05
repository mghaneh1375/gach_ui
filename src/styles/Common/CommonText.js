import styled from 'styled-components';
import vars from './../root';
import {Platform, TextInput} from 'react-native';
import {DatePicker, DateTimePicker} from 'react-advance-jalaali-datepicker';
import SelectBox from 'react-native-multi-selectbox';
import {getWidthHeight} from '../../services/Utility';

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
  display: 'block',
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

export const CommonJustDatePickerElem = styled(DatePicker)`
  ${CommonTextInputStyleAndroid}
`;

export const calcInputWidth = (padding, isHalf, style) => {
  if (style.minWidth !== undefined) return;
  if (isHalf) {
    style.minWidth = isApp ? '50%' : 'calc(50% - ' + padding + 'px)';
    style.maxWidth = isApp ? '50%' : 'calc(50% - ' + padding + 'px)';
    return style;
  }

  const isApp = Platform.OS !== 'web';
  let width = getWidthHeight()[0];

  style.minWidth = isApp
    ? '100%'
    : width > 960
    ? 'calc(25% - ' + padding + 'px)'
    : width > 768
    ? 'calc(33% - ' + padding + 'px)'
    : width > 576
    ? 'calc(50% - ' + padding + 'px)'
    : '100%';

  return style;
};
