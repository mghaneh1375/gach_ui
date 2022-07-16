import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Platform, Pressable} from 'react-native';
import vars from './../root';

const FontIconStyle = {
  color: vars.WHITE,
  width: '100%',
  height: '100%',
};

const FontIconStyleAndroid = {
  ...FontIconStyle,
  padding: 15,
  alignSelf: 'center',
};

const FontIconStyleWeb = {
  ...FontIconStyle,
  padding: 5,
  cursor: 'pointer',
  alignSelf: 'center',
};

export const FontIcon = props => {
  const style1 = {
    backgroundColor:
      props.back === undefined || props.back === 'orange'
        ? vars.ORANGE_RED
        : vars.YELLOW,
    cursor: 'pointer',
    width:
      props.kind === undefined || props.kind === 'full'
        ? '100%'
        : props.kind === 'normal'
        ? 30
        : 20,
    height:
      props.kind === undefined || props.kind === 'full'
        ? '100%'
        : props.kind === 'normal'
        ? 30
        : 20,
    borderRadius:
      props.theme === undefined || props.theme === 'circle' ? 20 : 7,
    alignSelf: 'center',
    justifyContent: 'center',
  };

  const allStyles =
    props.parentStyle === undefined
      ? style1
      : {...style1, ...props.parentStyle};

  return (
    <Pressable style={allStyles} onPress={props.onPress}>
      <FontAwesomeIcon
        icon={props.icon}
        style={[
          Platform.OS === 'web' ? FontIconStyleWeb : FontIconStyleAndroid,
          props.style ? props.style : {},
        ]}
      />
    </Pressable>
  );
};

export const SimpleFontIcon = props => (
  <Pressable
    style={{
      cursor: 'pointer',
      width: props.kind === undefined || props.kind === 'full' ? '100%' : 30,
      height: props.kind === undefined || props.kind === 'full' ? '100%' : 30,
      alignSelf: 'center',
      color: vars.LIGHT_SILVER,
      justifyContent: 'center',
    }}
    onPress={props.onPress}>
    <FontAwesomeIcon
      icon={props.icon}
      style={[
        Platform.OS === 'web' ? FontIconStyleWeb : FontIconStyleAndroid,
        {color: vars.LIGHT_SILVER},
        props.style ? props.style : {},
      ]}
    />
  </Pressable>
);
