import {RadioButton} from 'react-native-paper';
import styled from 'styled-components';
import vars from './root';
import {
  Text,
  Platform,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import {
  Button,
  CommonButtonTextStyleAndroid,
  CommonButtonTextStyleWeb,
} from './Common/Button';
import BlueTextInlineElem from './Common/BlueTextInline';

import {Device} from '../models/Device';

import {
  BigBoldBlueTextElem,
  BigBoldBlueTextInlineElem,
} from './Common/BigBoldTextElem';

import {getScreenHeight, getWidthHeight} from '../services/Utility';
import {Link} from 'react-router-dom';
import {style} from '../components/web/LargeScreen/Header/style';

export const BigBoldBlueTextInline = props => (
  <BigBoldBlueTextInlineElem
    style={props.style !== undefined ? props.style : {}}>
    {props.text}
  </BigBoldBlueTextInlineElem>
);

export const BigBoldBlueText = props => (
  <BigBoldBlueTextElem style={props.style !== undefined ? props.style : {}}>
    {props.text}
  </BigBoldBlueTextElem>
);

export const BlueTextInline = props => (
  <BlueTextInlineElem style={props.style !== undefined ? props.style : {}}>
    {props.text}
  </BlueTextInlineElem>
);

export const OrangeTextInline = props => (
  <BlueTextInlineElem
    style={[
      {color: vars.ORANGE},
      props.style !== undefined ? props.style : {},
    ]}>
    {props.text}
  </BlueTextInlineElem>
);

export const TextLink = props =>
  Platform.OS === 'android' || Platform.OS === 'ios' ? (
    <BlueTextInlineElem
      onPress={props.onPress}
      style={[
        {color: vars.ORANGE},
        props.style !== undefined ? props.style : {},
      ]}>
      {props.text}
    </BlueTextInlineElem>
  ) : props.href !== undefined ? (
    <Link
      style={{
        color: vars.ORANGE,
        fontFamily: 'IRANSans',
        textDecoration: 'none',
      }}
      to={props.href}>
      {props.text}
    </Link>
  ) : (
    <BlueTextInlineElem
      onClick={props.onPress}
      style={{color: vars.ORANGE, cursor: 'pointer'}}>
      {props.text}
    </BlueTextInlineElem>
  );

export const SilverTextInline = props => {
  const style1 = {color: vars.LIGHT_SILVER};
  const allStyle =
    props.style !== undefined ? {...style1, ...props.style} : style1;
  return <BlueTextInlineElem style={allStyle}>{props.text}</BlueTextInlineElem>;
};

export const ScreenScroll =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(ScrollView)`
        margin-bottom: 30px;
        width: 100%;
      `
    : styled.div``;

// style={ScreenScrollBar}
// contentContainerStyle={ScreenContentContainerStyle}

export const CommonButton = props =>
  Platform.OS === 'android' || Platform.OS === 'ios' ? (
    <Button
      style={props.style !== undefined ? props.style : null}
      onPress={props.onPress}>
      <Text style={CommonButtonTextStyleAndroid}>{props.title}</Text>
    </Button>
  ) : props.href !== undefined ? (
    <Button style={props.style !== undefined ? props.style : null}>
      <Link
        to={props.href !== undefined ? props.href : '/'}
        style={{textDecoration: 'none'}}>
        <Text style={CommonButtonTextStyleWeb}>{props.title}</Text>
      </Link>
    </Button>
  ) : (
    <Button
      style={props.style !== undefined ? props.style : null}
      onClick={props.onPress}>
      <Text style={CommonButtonTextStyleWeb}>{props.title}</Text>
    </Button>
  );

export const InlineTextContainer =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(Text)`
        justify-content: center;
        align-items: center;
      `
    : styled.div``;

export const SimpleText = props => {
  const style1 = {fontFamily: 'IRANSans'};
  const allStyle =
    props.style !== undefined ? {...style1, ...props.style} : style1;
  return <Text style={allStyle}>{props.text}</Text>;
};

export const CommonRadioButton = props => (
  <View style={{display: 'flex', flexDirection: 'row'}}>
    <SimpleText text={props.text} style={{marginTop: 10}} />
    <RadioButton
      value={props.value}
      status={props.status}
      onPress={props.onPress}
    />
  </View>
);

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

export const BlueTextFromStart = props => (
  <View style={{flexDirection: 'row', alignSelf: vars.alignSelf}}>
    <BlueTextInline text={props.text} />
  </View>
);

export const TextWithLink = props => {
  return (
    <InlineTextContainer style={props.style !== undefined ? props.style : {}}>
      <BlueTextInline text={props.text} />

      <TextLink onPress={props.onPress} href={props.href} text={props.link} />
    </InlineTextContainer>
  );
};

export const CommonWebBox = props => {
  const style1 = {
    backgroundColor: vars.WHITE,
    borderRadius: 10,
    direction: 'rtl',
    padding: 10,
    margin: 10,
    zIndex: 1,
    width: props.width !== undefined ? props.width : 'auto',
    boxShadow: '0px 3px 6px #00000029',
  };

  const allStyle =
    props.style !== undefined ? {...style1, ...props.style} : {...style1};

  return <View style={allStyle}>{props.child}</View>;
};

export const PhoneContentConianerStyle = {
  width: '100%',
};

export const LargeContentConianerStyle = {
  width: 'calc(100% - 200px)',
  minHeight: 'calc(100vh - 60px)',
};

export function EqualTwoTextInputs(props) {
  return (
    <PhoneView
      style={{
        justifyContent: 'space-between',
        marginTop: 20,
      }}>
      {props.children}
    </PhoneView>
  );
}

export function PhoneView(props) {
  const style1 = {flexDirection: Platform.OS === 'web' ? 'row' : 'row-reverse'};

  const allStyles =
    props.style !== undefined ? {...style1, ...props.style} : style1;

  let viewProps = {
    style: allStyles,
  };

  if (props.onClick !== undefined) viewProps.onClick = props.onClick;

  return <View {...viewProps}>{props.children}</View>;
}

export const ContentView = styled(View)``;
