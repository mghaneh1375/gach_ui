import {RadioButton} from 'react-native-paper';
import styled from 'styled-components';
import vars from './root';
import {Text, Platform, View, ScrollView, StyleSheet} from 'react-native';
import {
  Button,
  CommonButtonTextStyleAndroid,
  CommonButtonTextStyleWeb,
} from './Common/Button';
import BlueTextInlineElem from './Common/BlueTextInline';

import {
  BigBoldBlueTextElem,
  BigBoldBlueTextInlineElem,
} from './Common/BigBoldTextElem';

import {getScreenHeight} from '../services/Utility';
import {Link} from 'react-router-dom';

import JustBottomBorderTextInput from './Common/JustBottomBorderTextInput';
import {FontIcon, SimpleFontIcon} from './Common/FontIcon';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

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

export const TextLink = props => {
  let allStyles =
    Platform.OS === 'web'
      ? props.href !== undefined
        ? {
            color: vars.ORANGE,
            fontFamily: 'IRANSans',
            textDecoration: 'none',
          }
        : {color: vars.ORANGE, cursor: 'pointer'}
      : {color: vars.ORANGE};

  allStyles =
    props.style !== undefined ? {...allStyles, ...props.style} : allStyles;

  return Platform.OS === 'android' || Platform.OS === 'ios' ? (
    <BlueTextInlineElem onPress={props.onPress} style={allStyles}>
      {props.text}
    </BlueTextInlineElem>
  ) : props.href !== undefined ? (
    <Link style={allStyles} to={props.href}>
      {props.text}
    </Link>
  ) : (
    <BlueTextInlineElem onClick={props.onPress} style={allStyles}>
      {props.text}
    </BlueTextInlineElem>
  );
};

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

export const CommonButton = props => {
  let allStyles = props.style !== undefined ? props.style : null;
  let textStyle =
    Platform.OS === 'web'
      ? CommonButtonTextStyleWeb
      : CommonButtonTextStyleAndroid;

  if (props.theme !== undefined) {
    if (props.theme === 'transparent') {
      allStyles = {
        ...allStyles,
        ...{
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: vars.LIGHT_SILVER,
        },
      };
      textStyle = {
        ...textStyle,
        ...{
          color: vars.LIGHT_SILVER,
        },
      };
    } else if (props.theme === 'yellow-transparent') {
      allStyles = {
        ...allStyles,
        ...{
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderStyle: 'solid',
          borderColor: vars.YELLOW,
        },
      };
      textStyle = {
        ...textStyle,
        ...{
          color: vars.YELLOW,
        },
      };
    } else if (props.theme === 'yellow') {
      allStyles = {
        ...allStyles,
        ...{
          backgroundColor: vars.YELLOW,
        },
      };
    } else
      allStyles = {
        ...allStyles,
        ...{
          backgroundColor: vars.DARK_BLUE,
        },
      };
  }

  if (props.dir !== undefined && props.dir === 'rtl') {
    allStyles = {
      ...allStyles,
      ...{
        alignSelf: 'flex-start',
      },
    };
  }
  allStyles = {
    ...allStyles,
    ...{
      display: 'flex',
    },
  };

  return Platform.OS === 'android' || Platform.OS === 'ios' ? (
    <Button style={allStyles} onPress={props.onPress}>
      <Text style={textStyle}>{props.title}</Text>
    </Button>
  ) : props.href !== undefined ? (
    <Button style={allStyles}>
      <Link
        to={props.href !== undefined ? props.href : '/'}
        style={{textDecoration: 'none'}}>
        <Text style={textStyle}>{props.title}</Text>
      </Link>
    </Button>
  ) : (
    <Button style={allStyles} onClick={props.onPress}>
      {props.icon !== undefined &&
        (props.iconDir === undefined || props.iconDir === 'right') && (
          <SimpleFontIcon
            kind={'normal'}
            style={{color: vars.WHITE}}
            icon={props.icon}
          />
        )}
      <Text style={textStyle}>{props.title}</Text>
      {props.icon !== undefined &&
        props.iconDir !== undefined &&
        props.iconTheme === undefined &&
        props.iconDir === 'left' && (
          <SimpleFontIcon
            kind={'normal'}
            style={{color: vars.WHITE}}
            icon={props.icon}
          />
        )}
      {props.icon !== undefined &&
        props.iconDir !== undefined &&
        props.iconTheme !== undefined &&
        props.iconDir === 'left' && (
          <FontIcon
            parentStyle={{marginRight: 20}}
            kind={'small'}
            icon={props.icon}
          />
        )}
    </Button>
  );
};

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

  let textProps = {
    style: allStyle,
  };

  if (props.onPress !== undefined) textProps.onClick = props.onPress;
  return <Text {...textProps}>{props.text}</Text>;
};

export const ErrorText = props => {
  const style1 = {fontFamily: 'IRANSans', color: vars.RED};
  const allStyle =
    props.style !== undefined ? {...style1, ...props.style} : style1;

  let textProps = {
    style: allStyle,
  };

  if (props.onPress !== undefined) textProps.onClick = props.onPress;
  return <Text {...textProps}>{props.text}</Text>;
};

export const CommonRadioButton = props => (
  <PhoneView style={props.style !== undefined ? props.style : {}}>
    <RadioButton
      value={props.value}
      status={props.status}
      onPress={props.onPress}
    />
    {(props.type === undefined || props.type === 'simple') && (
      <SimpleText text={props.text} style={{marginTop: 10}} />
    )}
    {props.type !== undefined && props.type === 'textInput' && (
      <JustBottomBorderTextInput
        onChangeText={props.onChangeText}
        justNum={props.justNum}
        placeholder={props.text}
        disable={props.disable}
        value={props.textValue}
      />
    )}
  </PhoneView>
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

  return (
    <View style={allStyle}>
      {props.header !== undefined && (
        <EqualTwoTextInputs>
          <BigBoldBlueTextInline
            style={{alignSelf: 'center'}}
            text={props.header}
          />
          {props.btn !== undefined && props.btn}
          {props.backBtn !== undefined && props.backBtn && (
            <FontIcon
              onPress={props.onBackClick}
              theme="rect"
              kind="normal"
              icon={faArrowLeft}
            />
          )}
        </EqualTwoTextInputs>
      )}
      {props.child !== undefined && props.child}
      {props.children !== undefined && props.children}
    </View>
  );
};

export const PhoneContentConianerStyle = {
  width: '100%',
};

export const LargeContentConianerStyle = {
  width: 'calc(100% - 200px)',
  minHeight: 'calc(100vh - 60px)',
};

export function EqualTwoTextInputs(props) {
  const allStyle =
    props.style === undefined
      ? {
          justifyContent: 'space-between',
          // marginTop: 20,
        }
      : {
          ...props.style,
          ...{
            justifyContent: 'space-between',
            // marginTop: 20,
          },
        };

  return <PhoneView style={allStyle}>{props.children}</PhoneView>;
}

export function PhoneView(props) {
  const style1 = {
    flexDirection: Platform.OS === 'web' ? 'row' : 'row-reverse',
    flexShrink: 1,
  };

  const allStyles =
    props.style !== undefined ? {...style1, ...props.style} : style1;

  let viewProps = {
    style: allStyles,
  };

  if (props.onClick !== undefined) viewProps.onClick = props.onClick;

  return <View {...viewProps}>{props.children}</View>;
}

export function ShrinkView(props) {
  const style1 = {
    flexShrink: 1,
  };

  const allStyles =
    props.style !== undefined ? {...style1, ...props.style} : style1;

  let viewProps = {
    style: allStyles,
  };

  if (props.onClick !== undefined) viewProps.onClick = props.onClick;

  return <View {...viewProps}>{props.children}</View>;
}

export const ContentView = styled(View)``;
