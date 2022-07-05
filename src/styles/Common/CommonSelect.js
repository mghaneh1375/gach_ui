import React from 'react';
import {Platform} from 'react-native';
import {
  CommonHalfTextInputStyleWeb,
  CommonSelectElem,
  CommonTextInputContainer,
  CommonTextInputStyleWeb,
} from './CommonText';

import vars from '../root';
import SubInputText from './SubInputText';
import {SimpleFontIcon} from './FontIcon';
import {
  faAngleDown,
  faArrowDown,
  faClose,
} from '@fortawesome/free-solid-svg-icons';

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
    options: props.values.map(elem => {
      return {item: elem.name, id: elem.id};
    }),
    value: props.value === undefined ? {} : props.value,
    label: '',
    inputPlaceholder:
      props.placeholder === undefined ? 'انتخاب کنید' : props.placeholder,
    onChange: (selectedItem, index) => {
      props.onSelect(selectedItem, index);
    },
    containerStyle: {
      backgroundColor: vars.transparent,
      paddingRight: 0,
      paddingLeft: 10,
      paddingBottom: 0,
      borderBottomWidth: 2,
      borderColor: vars.BLACK,
    },
    // selectIcon: <SimpleFontIcon icon={faAngleDown} />,
    optionContainerStyle: {
      borderRadius: 0,
      borderWidth: 1,
      borderTopWidth: 0,
      borderColor: vars.BLACK,
      backgroundColor: vars.transparent,
      padding: 0,
    },
    selectedItemStyle: {
      fontFamily: 'IRANSans',
      color: vars.BLACK,
      paddingRight: 0,
    },
    arrowIconColor: vars.BLACK,
    optionsLabelStyle: {fontFamily: 'IRANSans', color: vars.BLACK},
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
