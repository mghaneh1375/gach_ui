import styled from 'styled-components';
import {Platform, Text} from 'react-native';

const InlineTextContainer =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(Text)`
        justify-content: center;
        align-items: center;
      `
    : styled.div``;

export default InlineTextContainer;
