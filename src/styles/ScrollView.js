import styled from 'styled-components';
import {View, Text, Platform} from 'react-native';
import {Device} from '../models/Device';
import vars from '../styles/root';

export const MyScrollView =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(View)`
        flex-direction: column-reverse;
      `
    : styled.div`
        display: flex;
        position: relative;
        flex-direction: ${props =>
          props.device === Device.Large ? 'row' : 'column-reverse'};
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
  //   fontWeight: '900 !important',
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
        ${props =>
          props.device === Device.PhonePort ? ScrollViewTitle_PHONE : {}};
      `;

export const ScrollViewSubTitle =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(Text)`
        font-size: 16px !important;
        margin-top: 100px;
      `
    : styled.p`
        font-size: 22px !important;
        ${props =>
          props.device === Device.PhonePort
            ? {
                marginTop: '100px',
              }
            : {}};
      `;

export const ScrollViewText =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(Text)`
        font-size: 10px !important;
      `
    : styled.p`
        font-size: 18px !important;
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
  top: 50,
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
