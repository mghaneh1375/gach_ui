import styled from 'styled-components';
import vars from './../root';
import {Text, Platform} from 'react-native';

const style = {
  color: vars.DARK_BLUE,
  fontFamily: 'IRANSans',
  lineHeight: '20px',
  alignSelf: 'center',
};

const BlueTextInlineElem =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(Text)`
        ${style}
        font-size: 18px;
        font-weight: 600;
      `
    : styled.span`
        ${style}
        font-size: 14px;
        font-weight: 300;
      `;

export default BlueTextInlineElem;
