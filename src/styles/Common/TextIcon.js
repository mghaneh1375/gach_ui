import styled from 'styled-components';
import vars from './../root';
import {View, Platform} from 'react-native';

const TextIconStyle = {
  display: 'flex',
  direction: 'rtl',
  paddingLeft: 10,
  paddingRight: 10,
};

export const TextIcon =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(View)`
        flex-direction: row-reverse;
        ${TextIconStyle}
      `
    : styled.div`
        flex-direction: row;
        ${TextIconStyle}
      `;
