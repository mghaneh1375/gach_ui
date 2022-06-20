import {Platform, View} from 'react-native';
import vars from '../root';
import {
  CommonHalfTextInputStyleWeb,
  CommonTextInputContainer,
  CommonTextInputElem,
  CommonTextInputStyleWeb,
} from './CommonText';

import SubInputText from './SubInputText';

export const CommonTextInput = props => {
  const isHalf = props.isHalf !== undefined && props.isHalf;
  const style1 =
    Platform.OS === 'web'
      ? isHalf
        ? CommonHalfTextInputStyleWeb
        : CommonTextInputStyleWeb
      : {};
  const allStyle =
    props.style !== undefined ? {...style1, ...props.style} : style1;

  const inputProps = {
    placeholder: props.placeholder,
    onChangeText: props.onChangeText,
    style: allStyle,
  };
  if (props.value !== undefined) inputProps.value = props.value;
  if (props.type !== undefined && props.type === 'password')
    inputProps.secureTextEntry = true;

  if (props.justNum !== undefined && Platform.OS === 'web') {
    inputProps.keyboardType = 'numeric';
    inputProps.onKeyPress = e => {
      var charCode = e.which ? e.which : e.keyCode;
      if (charCode !== 8 && String.fromCharCode(charCode).match(/[^0-9]/g))
        e.preventDefault();
    };
  }

  if (isHalf)
    return (
      <View
        style={{
          width: 'calc(50% - 10px)',
          maxWidth: '300px',
        }}>
        <CommonTextInputElem {...inputProps} />
        {props.subText !== undefined ? (
          <SubInputText>{props.subText}</SubInputText>
        ) : null}
        {props.resultPane !== undefined && props.resultPane ? (
          <View
            style={{
              position: 'absolute',
              width: '100%',
              top: 40,
              zIndex: 1000,
              left: 0,
              height: 100,
              backgroundColor: vars.WHITE,
              border: '1px solid',
            }}></View>
        ) : null}
      </View>
    );

  return (
    <CommonTextInputContainer>
      <CommonTextInputElem {...inputProps} />
      {props.subText !== undefined ? (
        <SubInputText>{props.subText}</SubInputText>
      ) : null}
    </CommonTextInputContainer>
  );
};
