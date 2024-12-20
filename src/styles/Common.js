import React from 'react';
import {RadioButton} from 'react-native-paper';
import styled from 'styled-components';
import vars from './root';
import {Text, Platform, View, ScrollView, StyleSheet} from 'react-native';
import {
  Button,
  chooseTheme,
  CommonButtonTextStyleAndroid,
  CommonButtonTextStyleWeb,
  CommonButtonTextStyleWebPhone,
} from './Common/Button';
import BlueTextInlineElem from './Common/BlueTextInline';

import {
  BigBoldBlueTextElem,
  BigBoldBlueTextInlineElem,
} from './Common/BigBoldTextElem';

import {getDevice, getScreenHeight} from '../services/Utility';
import {Link} from 'react-router-dom';

import JustBottomBorderTextInput from './Common/JustBottomBorderTextInput';
import {FontIcon, SimpleFontIcon} from './Common/FontIcon';
import {
  faArrowLeft,
  faPlus,
  faVenusMars,
} from '@fortawesome/free-solid-svg-icons';
import {styles} from './Common/Styles';

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

export const MyViewWithRef = React.forwardRef((props, ref) => {
  if (Platform.OS === 'web') {
    let style = props.style;
    if (props.style instanceof Array) style = undefined;

    if (style !== undefined) {
      return (
        <div
          ref={ref}
          className={props.className === undefined ? 'myView' : props.className}
          style={style}>
          {props.children}
        </div>
      );
    }

    return (
      <div ref={ref} className={'myView'}>
        {props.children}
      </div>
    );
  }

  return (
    <View ref={ref} style={props.style}>
      {props.children}
    </View>
  );
});

export const MyView = props => {
  if (Platform.OS === 'web') {
    let style = props.style;
    if (props.style instanceof Array) style = undefined;

    if (style !== undefined) {
      return (
        <div
          className={props.className === undefined ? 'myView' : props.className}
          style={style}>
          {props.children}
        </div>
      );
    }

    return <div className={'myView'}>{props.children}</div>;
  }

  return <View style={props.style}>{props.children}</View>;
};

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
            color: 'white',
            fontFamily: 'IRANSans',
            textDecoration: 'none',
          }
        : {color: 'white', cursor: 'pointer'}
      : {color: 'white'};

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
    : styled.div`
        height: calc(100vh - 60px);
      `;

// style={ScreenScrollBar}
// contentContainerStyle={ScreenContentContainerStyle}

export const CommonButton = props => {
  let allStyles = props.style !== undefined ? props.style : {...styles.flexEnd};
  let className = props.theme === 'transparent' ? 'myBtn-Transparent' : 'myBtn';

  if (props.style === undefined || props.style.justifyContent === undefined)
    className += ' flex-end';

  const isInWebPhone =
    Platform.OS === 'web' && getDevice().indexOf('WebPort') !== -1;

  let textStyle =
    Platform.OS === 'web'
      ? isInWebPhone
        ? CommonButtonTextStyleWebPhone
        : CommonButtonTextStyleWeb
      : CommonButtonTextStyleAndroid;

  if (props.textStyle !== undefined)
    textStyle = {
      ...textStyle,
      ...props.textStyle,
    };

  if (props.theme !== undefined) {
    const themeRes = chooseTheme(props.theme, allStyles, textStyle);
    allStyles = themeRes[0];
    textStyle = themeRes[1];
  }

  allStyles.alignSelf =
    props.dir !== undefined && props.dir === 'rtl' ? 'flex-start' : 'flex-end';
  let hrefStyle = {textDecoration: 'none'};
  if (props.href === undefined) {
    allStyles.padding =
      props.padding !== undefined && props.padding === 'unset'
        ? isInWebPhone
          ? 5
          : '9px 15px'
        : props.padding !== undefined
        ? props.padding
        : isInWebPhone
        ? 5
        : '5px 30px';
  } else {
    // allStyles.padding = '5px 0';
    // hrefStyle.padding =
    //   props.padding !== undefined && props.padding === 'unset'
    //     ? isInWebPhone
    //       ? '5px 5px'
    //       : '9px 15px'
    //     : isInWebPhone
    //     ? 5
    //     : '5px 30px';
  }

  if (props.icon !== undefined) {
    allStyles.display = 'flex';
    allStyles.alignItems = 'center';
    allStyles.justifyContent = 'space-around';
  }

  return Platform.OS === 'android' || Platform.OS === 'ios' ? (
    <Button style={allStyles} onPress={props.onPress}>
      <Text style={textStyle}>{props.title}</Text>
    </Button>
  ) : props.href !== undefined ? (
    <Button style={allStyles}>
      <Link to={props.href !== undefined ? props.href : '/'} style={hrefStyle}>
        <Text style={textStyle}>{props.title}</Text>
      </Link>
    </Button>
  ) : (
    <div className={className}>
      <Button
        disabled={props.disabled}
        style={allStyles}
        onClick={props.onPress}>
        {props.icon !== undefined &&
          (props.iconDir === undefined || props.iconDir === 'right') && (
            <SimpleFontIcon
              kind={'normal'}
              style={{color: vars.WHITE}}
              icon={props.icon}
              onPress={props.onPress}
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
              onPress={props.onPress}
            />
          )}
        {props.icon !== undefined &&
          props.iconDir !== undefined &&
          props.iconTheme !== undefined &&
          props.iconDir === 'left' && (
            <FontIcon
              kind={'small'}
              icon={props.icon}
              onPress={props.onPress}
            />
          )}
      </Button>
    </div>
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

export const SimpleTextWithRef = React.forwardRef((props, ref) => {
  const style1 = {fontFamily: 'IRANSans'};
  const allStyle =
    props.style !== undefined ? {...style1, ...props.style} : style1;

  let textProps = {
    style: allStyle,
  };

  if (props.onPress !== undefined) textProps.onClick = props.onPress;
  return (
    <Text ref={ref} {...textProps}>
      {props.text}
    </Text>
  );
});

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
  <PhoneView
    style={
      props.style !== undefined
        ? {
            ...{height: props.isCheckBox ? 20 : 60, alignItems: 'center'},
            ...props.style,
          }
        : {height: props.isCheckBox ? 20 : 60, alignItems: 'center'}
    }>
    {props.isCheckBox === undefined && (
      <RadioButton
        color={vars.ORANGE}
        value={props.value}
        status={props.status}
        onPress={props.onPress}
      />
    )}
    {props.isCheckBox !== undefined && (
      <input
        type="checkbox"
        onChange={props.onPress}
        checked={props.status === 'checked'}
      />
    )}

    {(props.type === undefined || props.type === 'simple') && (
      <SimpleText
        style={
          props.textStyle !== undefined
            ? props.textStyle
            : {
                color:
                  props.style === undefined || props.style.color === undefined
                    ? 'black'
                    : props.style.color,
                alignSelf: 'center',
              }
        }
        text={props.text}
      />
    )}
    {props.type !== undefined && props.type === 'textInput' && (
      <JustBottomBorderTextInput
        onChangeText={props.onChangeText}
        justNum={props.justNum}
        placeholder={props.text}
        subText={props.text}
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
  <MyView style={{flexDirection: 'row', alignSelf: vars.alignSelf}}>
    <BlueTextInline text={props.text} />
  </MyView>
);

export const TextWithLink = props => {
  return (
    <InlineTextContainer style={props.style !== undefined ? props.style : {}}>
      <BlueTextInline text={props.text} />
      <button
        style={{
          border: 'none',
          padding: '5px 10px',
          marginRight: '2px',
          borderRadius: '10px',
          backgroundColor: vars.ORANGE,
        }}>
        <TextLink onPress={props.onPress} href={props.href} text={props.link} />
      </button>
    </InlineTextContainer>
  );
};

export const CommonWebBox = props => {
  const style1 = {
    direction: 'rtl',
    padding: 10,
    width: props.width !== undefined ? props.width : 'auto',
  };

  const allStyle =
    props.style !== undefined ? {...style1, ...props.style} : {...style1};

  return (
    <MyView style={allStyle}>
      <MyView
        style={{
          overflow: props.rowId ? 'hidden' : 'visible',
          backgroundColor: vars.WHITE,
          padding:
            props.style === undefined || props.style.padding === undefined
              ? 10
              : props.style.padding,
          ...props.childStyle,
          boxShadow: '0px 3px 16px 4px rgb(0 0 0 / 16%)',
          borderRadius: 10,
          gap: props.no_gap === undefined || !props.no_gap ? 15 : 0,
        }}>
        {props.rowId !== undefined && (
          <>
            <PhoneView
              style={{
                ...styles.circleBoxUp,
              }}>
              <SimpleText
                style={{
                  ...styles.circleNumberBox,
                }}
                text={props.rowId}
              />
            </PhoneView>
            <PhoneView
              style={{
                ...styles.circleBoxDown,
              }}></PhoneView>
          </>
        )}
        {props.header !== undefined && (
          <EqualTwoTextInputs>
            <BigBoldBlueTextInline
              style={{
                // alignSelf: 'center',
                marginRight: props.rowId !== undefined ? 45 : 0,
              }}
              text={props.header}
            />
            {props.btn !== undefined && props.btn}
            {(props.addBtn !== undefined || props.backBtn !== undefined) && (
              <PhoneView style={{gap: 10, marginBottom: 10, text: 'center'}}>
                {props.addBtn !== undefined && props.addBtn && (
                  <FontIcon
                    onPress={props.onAddClick}
                    theme="rect"
                    kind="normal"
                    back={'yellow'}
                    icon={faPlus}
                  />
                )}
                {props.backBtn !== undefined && props.backBtn && (
                  <FontIcon
                    onPress={props.onBackClick}
                    theme="rect"
                    kind="normal"
                    icon={faArrowLeft}
                  />
                )}
              </PhoneView>
            )}
          </EqualTwoTextInputs>
        )}
        {props.child !== undefined && props.child}
        {props.children !== undefined && props.children}
      </MyView>
    </MyView>
  );
};

export const PhoneContentConianerStyle = {
  width: '100%',
};

export const PhoneContentConianerStyle2 = {
  width: '100%',
  display: 'none',
};

export const LargeContentConianerStyle = {
  width: 'calc(100% - ' + vars.RIGHT_MENU_WIDTH + 'px)',
  minHeight: 'calc(100vh - 60px)',
};

export function EqualTwoTextInputs(props) {
  const allStyle =
    props.style === undefined
      ? {
          justifyContent: 'space-between',
        }
      : {
          ...props.style,
          ...{
            justifyContent: 'space-between',
          },
        };

  return <PhoneView style={allStyle}>{props.children}</PhoneView>;
}

export function PhoneView(props) {
  const style1 = {
    flexDirection: Platform.OS === 'web' ? 'row' : 'row-reverse',
    flexShrink: 1,
    flexWrap: 'wrap',
  };

  const allStyles =
    props.style !== undefined ? {...style1, ...props.style} : style1;

  let viewProps = {
    style: allStyles,
  };

  if (props.onClick !== undefined) viewProps.onClick = props.onClick;

  return (
    <MyView className={props.className} {...viewProps}>
      {props.children}
    </MyView>
  );
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

  return <MyView {...viewProps}>{props.children}</MyView>;
}

export const ContentView = styled(View)``;
