import styled from 'styled-components';
import vars from './../root';
import {Text, Platform} from 'react-native';

const BigBoldBlueTextStyle = {
  fontWeight: 900,
  fontSize: 28,
  color: vars.DARK_BLUE,
  fontFamily: 'IRANSans',
};

export const BigBoldBlueTextElem =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(Text)`
        ${BigBoldBlueTextStyle}
      `
    : styled.p`
        ${BigBoldBlueTextStyle}
        margin-bottom: 5px;
      `;

export const BigBoldBlueTextInlineElem =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(Text)`
        ${BigBoldBlueTextStyle}
      `
    : styled.span`
        ${BigBoldBlueTextStyle}
      `;
