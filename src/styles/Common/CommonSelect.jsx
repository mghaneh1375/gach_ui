import React from 'react';
import {calcInputWidth, CommonSelectElem} from './CommonText';

import vars from '../root';
import SubInputText from './SubInputText';
import {MyView} from '../Common';

export const CommonSelect = props => {
  const isHalf = props.isHalf !== undefined && props.isHalf;

  const inputProps = {
    options: props.values,
    value: props.value === undefined ? {} : props.value,
    label: '',
    inputPlaceholder:
      props.placeholder === undefined ? 'انتخاب کنید' : props.placeholder,
    onChange: e => {
      props.setter(e.id);
      if (props.afterSetter !== undefined) {
        if (props.args === undefined) props.afterSetter(e.id);
        else props.afterSetter(props.args, e.id);
      }
    },
    containerStyle: {
      backgroundColor: vars.transparent,
      paddingRight: 7,
      paddingLeft: 10,
      paddingBottom: props.paddingLeft !== undefined ? 6 : 2,
      paddingTop: props.paddingLeft !== undefined ? 5 : 9,
      borderBottomWidth: 1,
      borderColor:
        props.style.color === undefined ? vars.LIGHT_SILVER : props.style.color,
    },
    optionContainerStyle: {
      borderRadius: 0,
      borderWidth: 0,
      borderColor: 'gray',
      borderTopWidth: 0,
      backgroundColor: vars.transparent,
      paddingTop: 6,
      paddingBottom: 6,
      width: '100%',
      height: '100%',
    },
    selectedItemStyle: {
      fontFamily: 'IRANSans',
      color:
        props.style !== undefined && props.style.color !== undefined
          ? props.style.color
          : vars.LIGHT_SILVER,
      fontSize: 13,
      paddingBottom: 1,
      paddingLeft: props.paddingLeft !== undefined ? props.paddingLeft : 0,
    },
    arrowIconColor:
      props.style.color === undefined ? vars.LIGHT_SILVER : props.style.color,
    optionsLabelStyle: {
      fontFamily: 'IRANSans',
      fontSize: 13,
      color: vars.LIGHT_SILVER,
      minWidth: 170,
    },
    hideInputFilter: true,
  };

  if (props.value !== undefined) inputProps.defaultValue = props.value;

  let parentAllStyles = isHalf
    ? {
        ...{
          direction: 'rtl',
          paddingLeft: 0,
          paddingRight: 0,
          textAlign: 'right',
          height: 60,
        },
      }
    : {
        ...props.parentStyle,
        ...{textAlign: 'right'}, // zIndex: 5,
      };
  if (props.parentStyle !== undefined)
    parentAllStyles = {...parentAllStyles, ...props.parentStyle};

  parentAllStyles = calcInputWidth(20, isHalf, parentAllStyles);
  return (
    <MyView className={'myView mySelect'} style={parentAllStyles}>
      <CommonSelectElem className={'myView2'} {...inputProps} />
      {props.subText !== undefined ? (
        <SubInputText
          style={
            props.style.color !== undefined
              ? {width: '100%', height: '100%', color: props.style.color}
              : {width: '100%', height: '100%'}
          }>
          {props.subText}
        </SubInputText>
      ) : null}
    </MyView>
  );
};
