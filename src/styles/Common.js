import {RadioButton} from 'react-native-paper';
import styled from 'styled-components';
import vars from './root';
import {Text, Platform, View, ScrollView, TouchableOpacity} from 'react-native';
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
  ) : (
    <Link to={props.href}>{props.text}</Link>
  );

export const SilverTextInline = props => (
  <BlueTextInlineElem style={[{color: vars.LIGHT_SILVER}, props.style]}>
    {props.text}
  </BlueTextInlineElem>
);

export const FontIcon = props =>
  Platform.OS === 'android' || Platform.OS === 'ios' ? (
    <TouchableOpacity
      style={{
        marginLeft: 'auto',
        width: 40,
        height: 40,
      }}
      onPress={props.onPress}>
      <FontAwesomeIcon icon={props.icon} style={FontIconStyleAndroid} />
    </TouchableOpacity>
  ) : (
    <FontAwesomeIcon icon={props.icon} style={FontIconStyleWeb} />
  );

export const ScreenScroll =
  Platform.OS === 'android' || Platform.OS === 'ios'
    ? styled(ScrollView)`
        margin-bottom: 30px;
        width: 100%;
      `
    : styled.div`
        margin-top: 50px;
      `;

// style={ScreenScrollBar}
// contentContainerStyle={ScreenContentContainerStyle}

export const CommonTextInput = props => (
  <CommonTextInputContainer>
    {Platform.OS === 'android' && (
      <CommonTextInputElem
        secureTextEntry={props.type !== undefined && props.type === 'password'}
        onChangeText={props.onChangeText}
        keyboardType={props.justNum !== undefined ? 'numeric' : null}
        placeholder={props.placeholder}
        style={props.style !== undefined ? props.style : null}
      />
    )}
    {Platform.OS === 'web' && (
      <CommonTextInputElem
        type={props.type !== undefined ? props.type : 'null'}
        value={props.value}
        onChange={e => {
          if (props.justNum !== undefined)
            props.onChangeText(e.target.value.replace(/[^0-9]/g, ''));
          else props.onChangeText(e.target.value);
        }}
        keyboardType={props.justNum !== undefined ? 'numeric' : null}
        placeholder={props.placeholder}
        style={props.style !== undefined ? props.style : null}
      />
    )}
    {props.subText !== undefined ? (
      <SubInputText>{props.subText}</SubInputText>
    ) : null}
  </CommonTextInputContainer>
);

export const CommonButton = props =>
  Platform.OS === 'android' || Platform.OS === 'ios' ? (
    <Button
      style={props.style !== undefined ? props.style : null}
      onPress={props.onPress}>
      <Text style={CommonButtonTextStyleAndroid}>{props.title}</Text>
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

export const MinFullHeightView = styled(View)`
  min-height: ${getScreenHeight()}px;
`;

export const ContentView = styled(View)`
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
`;
