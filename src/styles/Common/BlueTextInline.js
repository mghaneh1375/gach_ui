import styled from 'styled-components';
import vars from './../root';
import {Text, Platform} from 'react-native';

const style = {
  fontSize: 18,
  color: vars.DARK_BLUE,
  fontFamily: 'IRANSans',
  fontWeight: 600,
  lineHeight: '20px',
  alignSelf: 'center',
};

const BlueTextInlineElem =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(Text)`
        ${style}
      `
    : styled.span`
        ${style}
      `;

export default BlueTextInlineElem;
