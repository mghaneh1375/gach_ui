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
  padding: 20,
};

const FontIconStyleWeb = {
  ...FontIconStyle,
  padding: 5,
  cursor: 'pointer',
  alignSelf: 'center',
};

export const FontIcon = props => (
  <Pressable
    style={{
      backgroundColor: vars.ORANGE_RED,
      cursor: 'pointer',
      width: '100%',
      height: '100%',
      borderRadius: 20,
    }}
    onPress={props.onPress}>
    <FontAwesomeIcon
      icon={props.icon}
      style={[
        Platform.OS === 'web' ? FontIconStyleWeb : FontIconStyleAndroid,
        props.style ? props.style : {},
      ]}
    />
  </Pressable>
);
