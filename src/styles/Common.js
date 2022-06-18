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
} from 'react-native';
import {
  Button,
  CommonButtonTextStyleAndroid,
  CommonButtonTextStyleWeb,
} from './Common/Button';
import BlueTextInlineElem from './Common/BlueTextInline';

import {Device} from '../models/Device';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  CommonTextInputElem,
  CommonTextInputContainer,
  CommonTextInputStyleWeb,
} from './Common/CommonText';

import {
  BigBoldBlueTextElem,
  BigBoldBlueTextInlineElem,
} from './Common/BigBoldTextElem';

import {FontIconStyleAndroid, FontIconStyleWeb} from './Common/FontIcon';
import SubInputText from './Common/SubInputText';
import {getScreenHeight, getWidthHeight} from '../services/Utility';
import {Link} from 'react-router-dom';

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

export const CommonTextInput = props => {
  const style1 = Platform.OS === 'web' ? CommonTextInputStyleWeb : {};
  const allStyle =
    props.style !== undefined ? {...style1, ...props.style} : style1;

  const inputProps = {
    placeholder: props.placeholder,
    onChangeText: props.onChangeText,
    style: allStyle,
  };
  if (props.value !== undefined) inputProps.value = props.value;
  if (props.type !== undefined && props.type === 'password')
    inputProps.secureTextEntry = true;

  if (props.justNum !== undefined && Platform.OS === 'web') {
    inputProps.keyboardType = 'numeric';
    inputProps.onKeyPress = e => {
      var charCode = e.which ? e.which : e.keyCode;
      if (charCode !== 8 && String.fromCharCode(charCode).match(/[^0-9]/g))
        e.preventDefault();
    };
  }
  return (
    <CommonTextInputContainer>
      <CommonTextInputElem {...inputProps} />
      {props.subText !== undefined ? (
        <SubInputText>{props.subText}</SubInputText>
      ) : null}
    </CommonTextInputContainer>
  );
};

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
        flex-direction: row-reverse;
        justify-content: center;
        align-items: center;
      `
    : styled.div``;

export const EqualTwoTextInputs =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(View)`
        flex-direction: row-reverse;
        justify-content: space-between;
      `
    : styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding-left: 10px;
        padding-right: 10px;
      `;

const androidCommonStyles = {flexDirection: 'row-reverse'};

export const SimpleText = props => {
  const style1 = {fontFamily: 'IRANSans'};
  const allStyle =
    props.style !== undefined ? {...style1, ...props.style} : style1;

  return <Text style={allStyle}>{props.text}</Text>;
};

export const CommonRadioButton = props => (
  <View
    style={
      Platform.OS === 'android' || Platform.OS === 'ios'
        ? androidCommonStyles
        : {display: 'flex', flexDirection: 'row'}
    }>
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

export const ContentView = styled(View)`
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
`;

export const BlueTextFromStart = props => (
  <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
    <BlueTextInline text={props.text} />
  </View>
);
