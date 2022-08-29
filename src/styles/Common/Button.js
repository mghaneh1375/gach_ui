import vars from './../root';
import {Platform, Pressable} from 'react-native';
import styled from 'styled-components';

const style = {
  textAlign: 'center',
  color: vars.WHITE,
  backgroundColor: vars.ORANGE,
  borderRadius: 10,
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 15,
  paddingRight: 15,
  // minWidth: 150,
  alignSelf: vars.alignSelfRev,
};

const CommonButtonStyleAndroid = {
  ...style,
  fontSize: 24,
  width: '50%',
};

const CommonButtonStyleWeb = {
  ...style,
  textAlign: 'center',
  color: vars.WHITE,
  margin: 10,
  fontSize: '16px',
  // fontSize: 24,
  // width: '50%',
  // float: 'right',
  // clear: 'both',
  border: 'none',
  cursor: 'pointer',
};

export const CommonButtonTextStyleAndroid = {
  textAlign: 'center',
  color: vars.WHITE,
  fontSize: 24,
};

export const CommonButtonTextStyleWeb = {
  textAlign: 'center',
  color: vars.WHITE,
  fontSize: 14,
  fontFamily: 'IRANSans',
};
export const justifyContentEnd = {
  justifyContent: 'end',
};

export const Button =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(Pressable)`
        ${CommonButtonStyleAndroid}
      `
    : styled.button`
        ${CommonButtonStyleWeb}
      `;

const TransparentButtonStyle = {
  borderWidth: 1,
  borderStyle: 'solid',
};

export const chooseTheme = (theme, allStyles, textStyle) => {
  allStyles.backgroundColor =
    theme === 'transparent' || theme === 'yellow-transparent'
      ? 'transparent'
      : theme === 'yellow'
      ? vars.YELLOW
      : theme === 'orangeRed'
      ? vars.ORANGE_RED
      : vars.DARK_BLUE;

  if (theme === 'transparent') {
    // className = 'myTransparentBtn';
    allStyles = {
      ...allStyles,
      ...TransparentButtonStyle,
      ...{
        borderColor: vars.LIGHT_SILVER,
      },
    };
    textStyle = {
      ...textStyle,
      ...{
        color: vars.LIGHT_SILVER,
      },
    };
  } else if (theme === 'yellow-transparent') {
    allStyles = {
      ...allStyles,
      ...TransparentButtonStyle,
      ...{
        borderColor: vars.YELLOW,
      },
    };
    textStyle = {
      ...textStyle,
      ...{
        color: vars.YELLOW,
      },
    };
  }
  return [allStyles, textStyle];
};
