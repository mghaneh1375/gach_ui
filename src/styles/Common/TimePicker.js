import React, {useState} from 'react';
import {EqualTwoTextInputs, MyView} from '../Common';
import {
  calcInputWidth,
  CommonTextInputElem,
  CommonTextInputStyleWeb,
} from './CommonText';
import SubInputText from './SubInputText';

function TimePicker(props) {
  const [value, setValue] = useState('');

  let style1 = CommonTextInputStyleWeb;

  let allStyle = {
    ...style1,
    ...{
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderRadius: 0,
      padding: 5,
    },
  };

  if (props.disable !== undefined && props.disable) {
    if (props.backgroundColor === undefined)
      allStyle.backgroundColor = '#d1d1d1';
    else allStyle.backgroundColor = props.backgroundColor;
  }

  const inputProps = {
    placeholder: props.placeholder,
    onChangeText: e => {
      let v = e.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d));
      v = v.replace(/[^0-9]/g, '');

      if (v.length > 2) v = v.slice(0, 2) + ':' + v.slice(2);

      setValue(v);
      props.onChangeText(v);
    },
    style: allStyle,
    editable: !props.disable,
  };

  if (value !== undefined) inputProps.value = value;

  inputProps.onKeyPress = e => {
    var charCode = e.which ? e.which : e.keyCode;

    if (
      charCode == 9 ||
      charCode == 8 ||
      charCode == 37 ||
      charCode == 39 ||
      charCode == 46
    )
      return;

    if (value.length === 5) {
      e.preventDefault();
      return;
    }

    if (value.length < 1) {
      if (
        charCode !== 96 &&
        charCode !== 97 &&
        charCode !== 98 &&
        String.fromCharCode(charCode).match(/[^0-2]/g)
      ) {
        e.preventDefault();
        return;
      }
    }
    if (value.length < 2) {
      if (value[0] == 2) {
        if (
          charCode !== 96 &&
          charCode !== 97 &&
          charCode !== 98 &&
          charCode !== 99 &&
          charCode !== 100 &&
          String.fromCharCode(charCode).match(/[^0-4]/g)
        ) {
          e.preventDefault();
          return;
        }
      } else {
        if (
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
          String.fromCharCode(charCode).match(/[^0-9]/g)
        ) {
          e.preventDefault();
          return;
        }
      }
    } else if (value.length < 3) {
      if (
        charCode !== 96 &&
        charCode !== 97 &&
        charCode !== 98 &&
        charCode !== 99 &&
        charCode !== 100 &&
        charCode !== 101 &&
        String.fromCharCode(charCode).match(/[^0-5]/g)
      ) {
        e.preventDefault();
        return;
      }
    } else if (
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
      String.fromCharCode(charCode).match(/[^0-9]/g)
    ) {
      e.preventDefault();
      return;
    }

    let v = value + String.fromCharCode(charCode);
    for (let i = v.length; i < 4; i++) v += '0';

    if (v.indexOf(':') === -1) v = v.slice(0, 2) + ':' + v.slice(2);

    if (!v.match(/([01][01]?[0-9]|2[0-3]):[0-5][0-9]/g)) e.preventDefault();
  };

  inputProps.keyboardType = 'numeric';

  let parentAllStyles = false
    ? {
        paddingLeft: 0,
        paddingRight: 0,
        paddingTop: 5,
        paddingBottom: 0,
      }
    : {paddingLeft: 0, paddingRight: 0, paddingTop: 5, paddingBottom: 0};

  if (props.parentStyle !== undefined)
    parentAllStyles = {...parentAllStyles, ...props.parentStyle};

  parentAllStyles = calcInputWidth(15, false, parentAllStyles);

  return (
    <MyView style={parentAllStyles}>
      <CommonTextInputElem {...inputProps} />
      <EqualTwoTextInputs>
        {props.subText !== undefined ? (
          <SubInputText>{props.subText}</SubInputText>
        ) : null}
      </EqualTwoTextInputs>
    </MyView>
  );
}

export default TimePicker;
