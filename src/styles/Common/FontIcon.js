import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {Platform, Pressable} from 'react-native';
import {BigBoldBlueText} from '../Common';
import vars from './../root';

const FontIconStyle = {
  color: vars.WHITE,
  width: '100%',
  height: '100%',
};

const FontIconStyleAndroid = {
  ...FontIconStyle,
  padding: 15,
  alignSelf: 'center',
};

const FontIconStyleWeb = {
  ...FontIconStyle,
  padding: 4,
  cursor: 'pointer',
  alignSelf: 'center',
};

export const FontIcon = props => {
  let className = props.theme === 'transparent' ? 'myBtn-Transparent' : 'myBtn';
  const style1 = {
    backgroundColor:
      props.back === undefined || props.back === 'orange'
        ? vars.ORANGE_RED
        : props.back === 'blue'
        ? vars.DARK_BLUE
        : props.back === 'transparent'
        ? vars.transparent
        : props.back === 'dark'
        ? vars.DARK_WHITE
        : vars.YELLOW,
    cursor: 'pointer',
    width:
      props.kind === undefined || props.kind === 'full'
        ? '100%'
        : props.kind === 'normal'
        ? 30
        : props.kind === 'tiny'
        ? 10
        : 20,
    height:
      props.kind === undefined || props.kind === 'full'
        ? '100%'
        : props.kind === 'normal'
        ? 30
        : props.kind === 'tiny'
        ? 10
        : 20,
    borderRadius:
      props.theme === undefined || props.theme === 'circle' ? 20 : 7,
    alignSelf: 'center',
    justifyContent: 'center',
  };

  const allStyles =
    props.parentStyle === undefined
      ? style1
      : {...style1, ...props.parentStyle};

  if (Platform.OS === 'web') {
    return (
      <div className={className}>
        <Pressable style={allStyles} onPress={props.onPress}>
          {props.icon !== undefined && (
            <FontAwesomeIcon
              icon={props.icon}
              style={[
                Platform.OS === 'web' ? FontIconStyleWeb : FontIconStyleAndroid,
                props.style ? props.style : {},
                props.kind === undefined || props.kind === 'full'
                  ? {width: 22, height: 22}
                  : {width: '100%', height: '100%'},
              ]}
            />
          )}
          {props.text !== undefined && (
            <BigBoldBlueText
              style={{
                padding: 0,
                paddingRight: 10,
                fontSize: 11,
                color: props.textColor,
              }}
              text={props.text}
            />
          )}
        </Pressable>
      </div>
    );
  }

  return (
    <Pressable style={allStyles} onPress={props.onPress}>
      {props.icon !== undefined && (
        <FontAwesomeIcon
          icon={props.icon}
          style={[
            Platform.OS === 'web' ? FontIconStyleWeb : FontIconStyleAndroid,
            props.style ? props.style : {},
          ]}
        />
      )}
      {props.text !== undefined && (
        <BigBoldBlueText
          style={{
            padding: 0,
            paddingRight: 10,
            fontSize: 11,
            color: props.textColor,
          }}
          text={props.text}
        />
      )}
    </Pressable>
  );
};

export const SimpleFontIcon = props => {
  let allStyles = {
    cursor: 'pointer',
    width:
      props.kind === undefined || props.kind === 'full'
        ? '100%'
        : props.kind === 'large'
        ? 38
        : props.kind === 'normal'
        ? 28
        : props.kind === 'midSize'
        ? 22
        : props.kind === 'small'
        ? 11
        : 22,
    height:
      props.kind === undefined || props.kind === 'full'
        ? '100%'
        : props.kind === 'large'
        ? 38
        : props.kind === 'normal'
        ? 28
        : props.kind === 'midSize'
        ? 22
        : props.kind === 'small'
        ? 11
        : 22,
    alignSelf: 'center',
    color: vars.LIGHT_SILVER,
    justifyContent: 'center',
  };
  if (props.parentStyle !== undefined)
    allStyles = {...allStyles, ...props.parentStyle};

  return (
    <Pressable style={allStyles} onPress={props.onPress}>
      <FontAwesomeIcon
        icon={props.icon}
        style={[
          Platform.OS === 'web' ? FontIconStyleWeb : FontIconStyleAndroid,
          {
            color: vars.LIGHT_SILVER,
          },
          props.style ? props.style : {},
        ]}
      />
    </Pressable>
  );
};
