import styled from 'styled-components';
import vars from './../root';
import {Text, Platform} from 'react-native';

const style = {
  fontSize: 14,
  marginTop: 5,
  marginRight: 5,
  color: vars.LIGHT_SILVER,
};

const SubInputText =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(Text)`
        ${style}
      `
    : styled.span`
        ${style}
      `;

export default SubInputText;
