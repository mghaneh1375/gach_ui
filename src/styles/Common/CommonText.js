import styled from 'styled-components';
import vars from './../root';
import {Platform, TextInput, View} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import {DateTimePicker} from 'react-advance-jalaali-datepicker';
import SelectBox from 'react-native-multi-selectbox';

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

export const CommonSelectContainer =
  Platform.OS === 'web'
    ? styled.div``
    : styled(View)`
        ${{marginTop: 10}}
      `;

export const CommonTextInputContainer = styled(View)`
  ${{marginTop: 10}}
`;

export const CommonTextInputElem = styled(TextInput)`
  ${CommonTextInputStyleAndroid}
`;

export const CommonSelectElem = styled(SelectBox)`
  ${CommonTextInputStyleAndroid}
`;

export const CommonDatePickerElem = styled(DateTimePicker)`
  ${CommonTextInputStyleAndroid}
`;
