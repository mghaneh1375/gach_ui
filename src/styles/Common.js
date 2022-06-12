import styled from 'styled-components';
import vars from './root';
import {Text, Platform, View, Image, ScrollView, TextInput} from 'react-native';
import {Button, CommonButtonTextStyleAndroid} from './Common/Button';
import BlueTextInlineElem from './Common/BlueTextInline';

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
  <BlueTextInlineElem>{props.text}</BlueTextInlineElem>
);

export const OrangeTextInline = props => (
  <BlueTextInlineElem style={{color: vars.ORANGE}}>
    {props.text}
  </BlueTextInlineElem>
);

export const SilverTextInline = props => (
  <BlueTextInlineElem style={{color: vars.LIGHT_SILVER}}>
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
        margin-top: 50px;
      `
    : styled.div`
        margin-top: 50px;
      `;

export const CommonTextInput = props => (
  <CommonTextInputContainer>
    <CommonTextInputElem
      secureTextEntry={props.type !== undefined && props.type === 'password'}
      onChangeText={props.onChangeText}
      keyboardType={props.justNum !== undefined ? 'numeric' : ''}
      placeholder={props.placeholder}
    />
    {props.subText !== undefined ? (
      <SubInputText>props.subInputText</SubInputText>
    ) : null}
  </CommonTextInputContainer>
);

export const CommonButton = props => (
  <Button onPress={props.onPress}>
    <Text style={CommonButtonTextStyleAndroid}>{props.title}</Text>
  </Button>
);

export const InlineTextContainer =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(Text)`
        flex-direction: row-reverse;
      `
    : styled.div``;
