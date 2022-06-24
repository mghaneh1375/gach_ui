import {Platform} from 'react-native';
import {
  CommonHalfTextInputStyleWeb,
  CommonTextInputContainer,
  CommonTextInputElem,
  CommonTextInputStyleWeb,
} from './CommonText';

import SubInputText from './SubInputText';

export const CommonTextInput = props => {
  const isHalf = props.isHalf !== undefined && props.isHalf;
  const isApp = Platform.OS !== 'web';
  const style1 = !isApp
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

  return (
    <CommonTextInputContainer
      style={
        isHalf
          ? {
              width: isApp ? 'auto' : 'calc(50% - 10px)',
              maxWidth: 300,
            }
          : {}
      }>
      <CommonTextInputElem {...inputProps} />
      {props.subText !== undefined ? (
        <SubInputText>{props.subText}</SubInputText>
      ) : null}
    </CommonTextInputContainer>
  );
};
