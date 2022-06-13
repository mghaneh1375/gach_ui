import styled from 'styled-components';
import {View, Text, Platform} from 'react-native';
import vars from '../root';
import {BlueTextInline} from '../Common';

export const MyScrollView =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(View)`
        flex-direction: column-reverse;
      `
    : styled.div`
        display: flex;
        position: relative;
        flex-direction: ${props =>
          props.isPhonePortSize ? 'column-reverse' : 'row'};
        direction: rtl;
        justify-content: center;
        justify-items: center;
      `;

export const ScrollViewTextContainer =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(View)``
    : styled.div``;

const ScrollViewTitle_PHONE = {
  position: 'absolute',
  top: 0,
  lineHeight: '30px',
  marginTop: 0,
  marginBottom: 0,
  color: vars.DARK_BLUE,
  textAlign: 'center',
  width: '100%',
  fontFamily: 'AGhasem',
};

export const ScrollViewTitleAndroid =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(Text)`
        font-size: 24px !important;
        ${ScrollViewTitle_PHONE}
      `
    : styled.p`
        display: none;
      `;

export const ScrollViewTitle =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(Text)`
        display: none;
      `
    : styled.p`
        font-size: 26px !important;
        ${props => (props.isPhonePortSize ? ScrollViewTitle_PHONE : {})};
      `;

export const ScrollViewSubTitle =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(Text)`
        font-size: 24px !important;
        margin-top: 50px;
        color: ${vars.DARK_BLUE};
        font-weight: 600;
        font-family: 'IRANSans';
      `
    : styled.p`
        font-size: 22px !important;
        ${props =>
          props.isPhonePortSize
            ? {
                marginTop: '100px',
              }
            : {}};
      `;

const ArrowStyle = {
  backgroundColor: vars.YELLOW,
  color: vars.WHITE,
  borderRadius: 7,
  position: 'absolute',
  cursor: 'pointer',
};

const ArrowStyleAndroid = {
  padding: 15,
  top: 0,
};

const ArrowStyleWeb = {
  padding: 10,
  top: 'calc(50% - 18px + 80px)',
};

export const ArrowStyleLeft =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? {
        ...ArrowStyle,
        ...ArrowStyleAndroid,
        left: 0,
      }
    : {
        ...ArrowStyle,
        ...ArrowStyleWeb,
        left: 0,
      };

export const ArrowStyleRight =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? {
        ...ArrowStyle,
        ...ArrowStyleAndroid,
        right: 0,
      }
    : {
        ...ArrowStyle,
        ...ArrowStyleWeb,
        right: 0,
      };

export const MyImage = {
  marginTop: 50,
};
