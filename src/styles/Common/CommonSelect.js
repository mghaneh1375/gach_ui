import React from 'react';
import {Platform} from 'react-native';
import {CommonSelectElem} from './CommonText';

import vars from '../root';
import SubInputText from './SubInputText';
import {MyView} from '../Common';
import {getWidthHeight} from '../../services/Utility';

export const CommonSelect = props => {
  const isHalf = props.isHalf !== undefined && props.isHalf;
  const isApp = Platform.OS !== 'web';

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
      paddingBottom: 0,
      paddingTop: 13,
      borderBottomWidth: 1,

      // zIndex: 5,
      borderColor: vars.LIGHT_SILVER,
    },
    optionContainerStyle: {
      borderRadius: 0,
      borderWidth: 1,
      borderColor: '#ffaa00',
      borderTopWidth: 0,
      backgroundColor: vars.transparent,
      paddingTop: 6,
      paddingBottom: 6,
      width: '100%',
      height: '100%',
    },
    selectedItemStyle: {
      fontFamily: 'IRANSans',
      color: vars.LIGHT_SILVER,
      paddingRight: 0,
      fontSize: 15,
      paddingBottom: 1,
      width: '100%',
      height: '100%',
    },
    arrowIconColor: vars.LIGHT_SILVER,
    optionsLabelStyle: {
      fontFamily: 'IRANSans',
      fontSize: 15,
      color: vars.LIGHT_SILVER,
      minWidth: 170,
    },
    hideInputFilter: true,
  };

  if (props.value !== undefined) inputProps.defaultValue = props.value;

  let parentStyle = props.style !== undefined ? props.style : {};

  let width = getWidthHeight()[0];

  parentStyle = isHalf
    ? {
        ...parentStyle,
        ...{
          width: isApp || width < 768 ? '100%' : 'calc(50% - 10px)',
          maxWidth: width > 768 ? 'calc(25% - 20px)' : '100%',
          direction: 'rtl',
          paddingLeft: 10,
          paddingRight: 10,
          textAlign: 'right',
          height: 60,
          // zIndex: 5,
        },
      }
    : {
        ...parentStyle,
        ...{maxWidth: 300, textAlign: 'right'}, // zIndex: 5,
      };

  return (
    <MyView className={'myView mySelect'} style={parentStyle}>
      <CommonSelectElem {...inputProps} />
      {props.subText !== undefined ? (
        <SubInputText style={{width: '100%', height: '100%'}}>
          {props.subText}
        </SubInputText>
      ) : null}
    </MyView>
  );
};
