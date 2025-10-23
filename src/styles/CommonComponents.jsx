import {Platform, ScrollView, StyleSheet, Text, View} from 'react-native';
import styled from 'styled-components';
import vars from './root';
import {getScreenHeight} from '../services/utility';
import {BigBoldBlueTextElem} from './common/bigBoldTextElem.js';
import BlueTextInlineElem from './common/blueTextInline.js';

export const BigBoldBlueText = props => (
  <BigBoldBlueTextElem style={props.style !== undefined ? props.style : {}}>
    {props.text}
  </BigBoldBlueTextElem>
);

export const OrangeTextInline = props => (
  <BlueTextInlineElem
    style={[
      {
        color: vars.ORANGE,
      },
      props.style !== undefined ? props.style : {},
    ]}>
    {props.text}
  </BlueTextInlineElem>
);

export const SilverTextInline = props => {
  const style1 = {
    color: vars.LIGHT_SILVER,
  };
  const allStyle =
    props.style !== undefined
      ? {
          ...style1,
          ...props.style,
        }
      : style1;
  return <BlueTextInlineElem style={allStyle}>{props.text}</BlueTextInlineElem>;
};
export const ScreenScroll =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(ScrollView)`
        margin-bottom: 30px;
        width: 100%;
      `
    : styled.div`
        height: calc(100vh - 60px);
      `;

// style={ScreenScrollBar}
// contentContainerStyle={ScreenContentContainerStyle}

export const ErrorText = props => {
  const style1 = {
    fontFamily: 'IRANSans',
    color: vars.RED,
  };
  const allStyle =
    props.style !== undefined
      ? {
          ...style1,
          ...props.style,
        }
      : style1;
  const textProps = {
    style: allStyle,
  };
  if (props.onPress !== undefined) textProps.onClick = props.onPress;
  return <Text {...textProps}>{props.text}</Text>;
};

export const MinFullHeightView = styled(View)`
  min-height: ${getScreenHeight()}px;
`;
export const commonStyles = StyleSheet.create({
  ContentView: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});

export {default as BigBoldBlueTextInline} from './common/BigBoldBlueTextInline';
export {default as BlueTextFromStart} from './common/BlueTextFromStart';
export {default as BlueTextInline} from './common/blueTextInline.js';
export {default as CommonButton} from './common/CommonButton';
export {default as CommonRadioButton} from './common/CommonRadioButton';
export {default as CommonWebBox} from './common/CommonWebBox';
export {default as EqualTwoTextInputs} from './common/EqualTwoTextInputs';
export {default as InlineTextContainer} from './common/InlineTextContainer';
export {default as MyView} from './common/MyView';
export {default as MyViewWithRef} from './common/MyViewWithRef';
export {default as PhoneView} from './common/PhoneView';
export {default as ShrinkView} from './common/ShrinkView';
export {default as SimpleText} from './common/SimpleText';
export {default as SimpleTextWithRef} from './common/SimpleTextWithRef';
export {default as TextWithLink} from './common/TextWithLink';
export {default as TextLink} from './common/TextLink';

export const PhoneContentConianerStyle = {
  width: '100%',
};
export const PhoneContentConianerStyle2 = {
  width: '100%',
  display: 'none',
};

export const LargeContentConianer = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 1;
  flex-wrap: wrap;
  width: calc(100% - ${vars.RIGHT_MENU_WIDTH}px);
  min-height: calc(100vh - 60px);
  background-color: ${props => props.theme.colors.background.primary};
`;

export const ContentView = styled(View)``;
