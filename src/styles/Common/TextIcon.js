import React from 'react';

import {Platform} from 'react-native';
import {
  BigBoldBlueTextInline,
  EqualTwoTextInputs,
  MyView,
  SimpleText,
} from '../Common';
import vars from '../root';
import {FontIcon, SimpleFontIcon} from './FontIcon';
import {styles} from './Styles';

const style = {
  paddingRight: 10,
  marginTop: 0,
};

const InnerViewCommonStyle = {
  width: 30,
  height: 30,
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
  if (props.onPress !== undefined) {
    fontProps.onPress = props.onPress;
  }

  if (props.theme !== undefined) {
    fontProps.parentStyle = {
      borderRadius: '50%',
      backgroundColor: vars.YELLOW,
      width: 30,
      height: 30,
    };
  }

  return (
    <EqualTwoTextInputs style={allStyles}>
      <BigBoldBlueTextInline text={props.text} />

      <MyView style={InnerViewStyle}>
        <FontIcon {...fontProps} />
      </MyView>
    </EqualTwoTextInputs>
  );
};

export const SimpleTextIcon = props => {
  const allStyles =
    props.style !== undefined ? {...style, ...props.style} : style;

  var fontProps = {icon: props.icon};
  if (props.onPress !== undefined) fontProps.onPress = props.onPress;

  if (props.iconStyle !== undefined) fontProps.style = props.iconStyle;
  if (props.iconKind !== undefined) fontProps.kind = props.iconKind;

  return (
    <EqualTwoTextInputs style={allStyles}>
      <SimpleText
        onPress={props.onPress}
        style={props.textStyle}
        text={props.text}
      />

      <MyView style={InnerViewStyle}>
        <SimpleFontIcon onPress={props.onPress} {...fontProps} />
      </MyView>
    </EqualTwoTextInputs>
  );
};

export const TinyTextIcon = props => {
  const allStyles =
    props.style !== undefined
      ? {...style, ...props.style, ...{paddingLeft: 3, paddingRight: 3}}
      : {...style, ...{paddingLeft: 3, paddingRight: 3}};

  var fontProps =
    props.icon === undefined
      ? undefined
      : {icon: props.icon, style: {padding: 2}};

  if (props.onPress !== undefined) {
    fontProps.onPress = props.onPress;
  }

  const tinyFontIconStyle = {
    width: 15,
    height: 15,
    alignSelf: 'center',
    marginRight: 5,
  };

  return (
    <MyView style={allStyles}>
      <SimpleText style={styles.fontSize11} text={props.text} />

      <MyView style={{...InnerViewStyle, ...tinyFontIconStyle}}>
        <FontIcon {...fontProps} />
      </MyView>
    </MyView>
  );
};
