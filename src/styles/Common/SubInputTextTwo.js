import styled from 'styled-components';
import vars from '../root';
import {Text, Platform} from 'react-native';

const style = {
  marginTop: 5,
  marginRight: 15,
  color: vars.LIGHT_SILVER,
  fontFamily: 'IRANSans',
  fontWeight: 600,
};

const SubInputTextTwo =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(Text)`
        ${style}
        font-size: 14px;
      `
    : styled.span`
        ${style}
        font-size: 11px;
      `;

export default SubInputTextTwo;
