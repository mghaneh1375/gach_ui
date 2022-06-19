import {View, Platform} from 'react-native';
import {BigBoldBlueTextInline} from '../Common';
import {FontIcon} from './FontIcon';

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
