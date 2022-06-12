import vars from './../root';

const FontIconStyle = {
  backgroundColor: vars.ORANGE,
  color: vars.WHITE,
  borderRadius: 50,
};

export const FontIconStyleAndroid = {
  ...FontIconStyle,
  padding: 20,
  textAlign: 'left',
};

export const FontIconStyleWeb = {
  ...FontIconStyle,
  padding: 5,
  cursor: 'pointer',
  alignSelf: 'end',
  marginRight: 'auto',
};
