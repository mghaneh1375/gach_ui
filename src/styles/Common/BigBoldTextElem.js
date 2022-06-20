import styled from 'styled-components';
import vars from './../root';
import {Text, Platform} from 'react-native';

const BigBoldBlueTextStyle = {
  fontWeight: 900,
  color: vars.DARK_BLUE,
  fontFamily: 'IRANSans',
};

const BigBoldBlueTextStyleAndroid = {
  ...BigBoldBlueTextStyle,
  fontSize: 28,
};

const BigBoldBlueTextStyleWeb = {
  ...BigBoldBlueTextStyle,
  fontSize: 20,
  marginBottom: 5,
};

export const BigBoldBlueTextElem =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(Text)`
        ${BigBoldBlueTextStyleAndroid}
      `
    : styled.p`
        ${BigBoldBlueTextStyleWeb}
      `;

export const BigBoldBlueTextInlineElem =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(Text)`
        ${BigBoldBlueTextStyle}
      `
    : styled.span`
        ${BigBoldBlueTextStyle}
      `;
