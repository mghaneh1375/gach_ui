import React, {useState} from 'react';
import {Platform} from 'react-native';
import {
  CommonHalfTextInputStyleWeb,
  CommonSelectElem,
  CommonTextInputContainer,
  CommonTextInputStyleWeb,
} from './CommonText';

import vars from '../root';
import SubInputText from './SubInputText';

export const CommonSelect = props => {
  const isHalf = props.isHalf !== undefined && props.isHalf;
  const isApp = Platform.OS !== 'web';
  const style1 = !isApp
    ? isHalf
      ? CommonHalfTextInputStyleWeb
      : CommonTextInputStyleWeb
    : {};
  const allStyle =
    props.style !== undefined
      ? {...style1, ...props.style, ...{}}
      : {...style1, ...{}};

  const inputProps = {
    options: props.values,
    value: props.value === undefined ? {} : props.value,
    label: '',
    inputPlaceholder:
      props.placeholder === undefined ? 'انتخاب کنید' : props.placeholder,
    onChange: e => {
      props.setter(e.id);
    },
    containerStyle: {
      backgroundColor: vars.transparent,
      paddingRight: 7,
      paddingLeft: 10,
      paddingBottom: 0,
      borderBottomWidth: 1,
      borderColor: vars.LIGHT_SILVER,
    },
    optionContainerStyle: {
      borderRadius: 0,
      borderWidth: 1,
      borderTopWidth: 0,
      borderColor: vars.LIGHT_SILVER,
      backgroundColor: vars.transparent,
      paddingTop: 6,
      paddingBottom: 6,
    },
    selectedItemStyle: {
      fontFamily: 'IRANSans',
      color: vars.LIGHT_SILVER,
      paddingRight: 0,
      fontSize: 15,
    },
    arrowIconColor: vars.LIGHT_SILVER,
    optionsLabelStyle: {
      fontFamily: 'IRANSans',
      fontSize: 15,
      color: vars.LIGHT_SILVER,
    },
    hideInputFilter: true,
  };

  if (props.value !== undefined) inputProps.defaultValue = props.value;

  return (
    <CommonTextInputContainer
      style={
        isHalf
          ? {
              width: isApp ? 'auto' : 'calc(50% - 10px)',
              maxWidth: 300,
              direction: 'rtl',
              paddingLeft: 10,
              paddingRight: 10,
            }
          : {maxWidth: 300}
      }>
      <CommonSelectElem {...inputProps} />

      {props.subText !== undefined ? (
        <SubInputText>{props.subText}</SubInputText>
      ) : null}
    </CommonTextInputContainer>
  );
};
