import {Platform} from 'react-native';
import {Background} from 'victory-core';
import {EqualTwoTextInputs, MyView} from '../Common';
import vars from '../root';
import {
  calcInputWidth,
  CommonHalfTextInputStyleWeb,
  CommonTextInputElem,
  CommonTextInputStyleWeb,
} from './CommonText';

import SubInputText from './SubInputText';
import SubInputTextTwo from './SubInputTextTwo';

export const CommonTextInput = props => {
  const isHalf = props.isHalf !== undefined && props.isHalf;
  const isApp = Platform.OS !== 'web';
  let style1 = !isApp
    ? isHalf
      ? CommonHalfTextInputStyleWeb
      : CommonTextInputStyleWeb
    : {};

  if (props.multiline !== undefined && props.multiline)
    style1 = {...style1, ...{height: 100, maxWidth: 500, overflow: 'auto'}};

  let allStyle =
    props.style !== undefined
      ? {
          ...style1,
          ...props.style,
        }
      : style1;

  if (props.disable !== undefined && props.disable) {
    if (props.backgroundColor === undefined)
      allStyle.backgroundColor = '#d1d1d1';
    else allStyle.backgroundColor = props.backgroundColor;
  }

  const inputProps = {
    placeholder: props.placeholder,
    onChangeText: props.onChangeText,
    style: allStyle,
    editable: !props.disable,
  };

  if (props.onEnter !== undefined) {
    inputProps.onKeyPress = e => {
      var charCode = e.which ? e.which : e.keyCode;
      if (charCode === 13) props.onEnter();
    };
  }

  if (props.value !== undefined) inputProps.value = props.value;
  if (props.type !== undefined && props.type === 'password')
    inputProps.secureTextEntry = true;
  if (props.justNum !== undefined && props.justNum && Platform.OS === 'web') {
    inputProps.onKeyPress = e => {
      var charCode = e.which ? e.which : e.keyCode;
      if (
        charCode === 188 &&
        props.acceptComma !== undefined &&
        props.acceptComma
      )
        return;
      if (charCode === 190) {
        if (props.float === undefined || !props.float) e.preventDefault();
      } else if (
        charCode !== 9 &&
        charCode !== 8 &&
        charCode !== 37 &&
        charCode !== 39 &&
        charCode !== 96 &&
        charCode !== 97 &&
        charCode !== 98 &&
        charCode !== 99 &&
        charCode !== 100 &&
        charCode !== 101 &&
        charCode !== 102 &&
        charCode !== 103 &&
        charCode !== 104 &&
        charCode !== 105 &&
        charCode !== 46 &&
        String.fromCharCode(charCode).match(/[^0-9]/g)
      )
        e.preventDefault();
    };
  } else if (props.justNum !== undefined && props.justNum)
    inputProps.keyboardType = 'numeric';

  if (props.multiline !== undefined && props.multiline)
    inputProps.multiline = true;

  if (props.onPress !== undefined) inputProps.onClick = props.onPress;

  let parentAllStyles = isHalf
    ? {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 5,
        paddingBottom: 0,
      }
    : {paddingLeft: 0, paddingRight: 0, paddingTop: 5, paddingBottom: 0};

  if (props.parentStyle !== undefined)
    parentAllStyles = {...parentAllStyles, ...props.parentStyle};

  parentAllStyles = calcInputWidth(15, isHalf, parentAllStyles);

  return (
    <MyView style={parentAllStyles}>
      <CommonTextInputElem {...inputProps} />
      <EqualTwoTextInputs>
        {props.subText !== undefined ? (
          <SubInputText>{props.subText}</SubInputText>
        ) : null}
        {props.subTextTwo !== undefined ? (
          <SubInputTextTwo>{props.subTextTwo}</SubInputTextTwo>
        ) : null}
      </EqualTwoTextInputs>
    </MyView>
  );
};
