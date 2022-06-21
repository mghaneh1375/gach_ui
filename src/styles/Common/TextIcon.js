import {View, Platform} from 'react-native';
import {BigBoldBlueTextInline, SimpleText} from '../Common';
import {FontIcon, SimpleFontIcon} from './FontIcon';

const style = {
  display: 'flex',
  direction: 'rtl',
  paddingLeft: 10,
  paddingRight: 10,
  flexDirection:
    Platform.OS === 'android' || Platform.OS === 'ios' ? 'row-reverse' : 'row',
};

const InnerViewCommonStyle = {
  width: 40,
  height: 40,
};

const InnerViewStyleAndroid = {
  marginLeft: 'auto',
};

const InnerViewStyleWeb = {
  marginRight: 'auto',
};

const InnerViewStyle =
  Platform.OS === 'web'
    ? {...InnerViewCommonStyle, ...InnerViewStyleWeb}
    : {...InnerViewCommonStyle, ...InnerViewStyleAndroid};

export const TextIcon = props => {
  const allStyles =
    props.style !== undefined ? {...style, ...props.style} : style;

  var fontProps = {icon: props.icon};
  if (props.onPress !== undefined) fontProps.onPress = props.onPress;

  return (
    <View style={allStyles}>
      <BigBoldBlueTextInline text={props.text} />

      <View style={InnerViewStyle}>
        <FontIcon {...fontProps} />
      </View>
    </View>
  );
};

export const TinyTextIcon = props => {
  const allStyles =
    props.style !== undefined
      ? {...style, ...props.style, ...{paddingLeft: 3, paddingRight: 3}}
      : {...style, ...{paddingLeft: 3, paddingRight: 3}};

  var fontProps = {icon: props.icon};
  if (props.onPress !== undefined) fontProps.onPress = props.onPress;

  fontProps.style = {padding: 2};

  const tinyFontIconStyle = {
    width: 15,
    height: 15,
    alignSelf: 'center',
    marginRight: 5,
  };

  return (
    <View style={allStyles}>
      <SimpleText style={{fontSize: 11}} text={props.text} />

      <View style={{...InnerViewStyle, ...tinyFontIconStyle}}>
        <FontIcon {...fontProps} />
      </View>
    </View>
  );
};
