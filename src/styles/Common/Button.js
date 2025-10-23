import vars from '../root';
import {Platform, Pressable} from 'react-native';
import styled from 'styled-components';

const style = {
  textAlign: 'center',
  color: vars.WHITE,
  backgroundColor: porps => porps.theme.components.button.colors.primary,
  borderRadius: 10,
  paddingTop: 5,
  paddingBottom: 5,
  paddingLeft: 15,
  paddingRight: 15,
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
  fontSize: 20,
};
export const CommonButtonTextStyleWebPhone = {
  textAlign: 'center',
  color: vars.WHITE,
  fontSize: 14,
  fontFamily: 'IRANSans',
  whiteSpace: 'nowrap',
  paddingLeft: 20,
  paddingRight: 20,
};

export const CommonButtonTextStyleWeb = {
  textAlign: 'center',
  color: vars.WHITE,
  fontSize: 14,
  fontFamily: 'IRANSans',
  whiteSpace: 'nowrap',
  paddingLeft: undefined,
  paddingRight: undefined,
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

export const chooseTheme = (color, allStyles, textStyle, theme) => {
  allStyles.backgroundColor =
    color === 'transparent' || color === 'yellow-transparent'
      ? 'transparent'
      : color === 'yellow'
      ? vars.YELLOW
      : color === 'cream'
      ? vars.CREAM
      : color === 'green'
      ? vars.GREEN
      : color === 'orangeRed'
      ? vars.ORANGE_RED
      : theme.name === 'dark'
      ? vars.DARK_THEME_DARK
      : vars.DARK_BLUE;

  if (color === 'transparent' || color === 'cream') {
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
  } else if (color === 'yellow-transparent') {
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
