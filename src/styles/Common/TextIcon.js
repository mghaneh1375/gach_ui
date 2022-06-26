import {View, Platform} from 'react-native';
import {BigBoldBlueTextInline, EqualTwoTextInputs, SimpleText} from '../Common';
import vars from '../root';
import {FontIcon} from './FontIcon';

const style = {
  paddingLeft: 10,
  paddingRight: 10,
  marginTop: 0,
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

  if (props.theme !== undefined) {
    fontProps.parentStyle = {
      borderRadius: 7,
      backgroundColor: vars.YELLOW,
      width: 30,
      height: 30,
    };
  }

  return (
    <EqualTwoTextInputs style={allStyles}>
      <BigBoldBlueTextInline text={props.text} />

      <View style={InnerViewStyle}>
        <FontIcon {...fontProps} />
      </View>
    </EqualTwoTextInputs>
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
