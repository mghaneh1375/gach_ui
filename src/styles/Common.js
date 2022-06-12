import {RadioButton} from 'react-native-paper';
import styled from 'styled-components';
import vars from './root';
import {Text, Platform, View, Image, ScrollView} from 'react-native';
import {Button, CommonButtonTextStyleAndroid} from './Common/Button';
import BlueTextInlineElem from './Common/BlueTextInline';

import CountDown from 'react-native-countdown-component';
import {Device} from '../models/Device';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  CommonTextInputElem,
  CommonTextInputContainer,
} from './Common/CommonText';

import {
  BigBoldBlueTextElem,
  BigBoldBlueTextInlineElem,
} from './Common/BigBoldTextElem';

import {FontIconStyleAndroid, FontIconStyleWeb} from './Common/FontIcon';
import SubInputText from './Common/SubInputText';

export const BigBoldBlueTextInline = props => (
  <BigBoldBlueTextInlineElem>{props.text}</BigBoldBlueTextInlineElem>
);

export const BigBoldBlueText = props => (
  <BigBoldBlueTextElem>{props.text}</BigBoldBlueTextElem>
);

export const BlueTextInline = props => (
  <BlueTextInlineElem style={props.style !== undefined ? props.style : null}>
    {props.text}
  </BlueTextInlineElem>
);

export const OrangeTextInline = props => (
  <BlueTextInlineElem
    style={[
      {color: vars.ORANGE, marginRight: 10},
      props.style !== undefined ? props.style : {},
    ]}>
    {props.text}
  </BlueTextInlineElem>
);

export const SilverTextInline = props => (
  <BlueTextInlineElem style={[{color: vars.LIGHT_SILVER}, props.style]}>
    {props.text}
  </BlueTextInlineElem>
);

// const IconElem =
//   Platform.OS === 'android' || Platform.OS === 'ios'
//     ? styled(Image)``
//     : styled.img``;

// export const Icon = props =>
//   Platform.OS === 'android' || Platform.OS === 'ios' ? (
//     <IconElem source={props.src} />
//   ) : (
//     <IconElem src={props.src} />
//   );

export const FontIcon = props =>
  Platform.OS === 'android' || Platform.OS === 'ios' ? (
    <View style={{position: 'absolute', right: 10}}>
      <FontAwesomeIcon icon={props.icon} style={FontIconStyleAndroid} />
    </View>
  ) : (
    <FontAwesomeIcon icon={props.icon} style={FontIconStyleWeb} />
  );

export const ScreenScroll =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(ScrollView)`
        margin-top: 20px;
        margin-left: 20px;
        margin-right: 20px;
      `
    : styled.div`
        margin-top: 50px;
      `;

export const CommonTextInput = props => (
  <CommonTextInputContainer>
    <CommonTextInputElem
      secureTextEntry={props.type !== undefined && props.type === 'password'}
      onChangeText={props.onChangeText}
      keyboardType={props.justNum !== undefined ? 'numeric' : null}
      placeholder={props.placeholder}
      style={props.style !== undefined ? props.style : null}
    />
    {props.subText !== undefined ? (
      <SubInputText>{props.subText}</SubInputText>
    ) : null}
  </CommonTextInputContainer>
);

export const CommonButton = props => (
  <Button
    style={props.style !== undefined ? props.style : null}
    onPress={props.onPress}>
    <Text style={CommonButtonTextStyleAndroid}>{props.title}</Text>
  </Button>
);

export const InlineTextContainer =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(Text)`
        flex-direction: row-reverse;
      `
    : styled.div``;

export const EqualTwoTextInputs =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(View)`
        flex-direction: row-reverse;
        justify-content: space-between;
      `
    : styled.div``;

export const CommonRadioButton = props => (
  <View style={{flexDirection: 'row-reverse'}}>
    <Text style={{marginTop: 10}}>{props.text}</Text>
    <RadioButton
      value={props.value}
      status={props.status}
      onPress={props.onPress}
    />
  </View>
);

export const MyCountDown = props => (
  <CountDown
    until={props.until}
    onFinish={props.onFinish}
    timeToShow={['M', 'S']}
    digitStyle={[
      {
        backgroundColor: 'white',
        borderColor: vars.LIGHT_SILVER,
        borderWidth: 1,
        color: vars.RED,
        borderRadius: 10,
      },
      props.style !== undefined ? props.style : {},
    ]}
    timeLabels={{m: null, s: null}}
    size={20}
  />
);

export const RoleCard = props => (
  <View
    style={[
      {
        backgroundColor: '#FFFFFFD6',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 20,
        elevation: 10,
        width: '46%',
        marginRight: 4,
        marginLeft: 4,
        height: 130,
        borderRadius: 20,
        direction: 'row-reverse',
      },
      props.style !== undefined ? props.style : {},
    ]}>
    <Image
      resizeMode="contain"
      style={{
        width: 70,
        height: 70,
        marginTop: 20,
        tintColor: props.color,
        alignSelf: 'center',
      }}
      source={props.source}
    />
    <BlueTextInline
      style={[
        {
          fontWeight: '900',
          alignSelf: 'center',
          marginTop: 10,
        },
        props.color !== undefined
          ? {color: props.color}
          : {color: vars.DARK_BLUE},
      ]}
      text={props.text}
    />
  </View>
);
