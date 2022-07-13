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
  let style1 = !isApp
    ? isHalf
      ? CommonHalfTextInputStyleWeb
      : CommonTextInputStyleWeb
    : {};

  if (props.multiline !== undefined && props.multiline)
    style1 = {...style1, ...{height: 100, maxWidth: 500, overflow: 'auto'}};

  const allStyle =
    props.style !== undefined ? {...style1, ...props.style} : style1;

  const inputProps = {
    placeholder: props.placeholder,
    onChangeText: props.onChangeText,
    style: allStyle,
    editable: !props.disable,
  };
  if (props.value !== undefined) inputProps.value = props.value;
  if (props.type !== undefined && props.type === 'password')
    inputProps.secureTextEntry = true;

  if (props.justNum !== undefined && Platform.OS === 'web') {
    inputProps.keyboardType = 'numeric';
    inputProps.onKeyPress = e => {
      var charCode = e.which ? e.which : e.keyCode;

      if (charCode === 190) {
        if (props.float === undefined || !props.float) e.preventDefault();
      } else if (
        charCode !== 9 &&
        charCode !== 8 &&
        charCode !== 37 &&
        charCode !== 39 &&
        String.fromCharCode(charCode).match(/[^0-9]/g)
      )
        e.preventDefault();
    };
  }

  if (props.multiline !== undefined && props.multiline)
    inputProps.multiline = true;

  if (props.onPress !== undefined) inputProps.onClick = props.onPress;

  let parentAllStyles = isHalf
    ? {
        width: isApp ? 'auto' : 'calc(50% - 10px)',
        maxWidth: 300,
        paddingLeft: 10,
        paddingRight: 10,
      }
    : {};

  if (props.parentStyle !== undefined)
    parentAllStyles = {...parentAllStyles, ...props.parentStyle};

  return (
    <CommonTextInputContainer style={parentAllStyles}>
      <CommonTextInputElem {...inputProps} />
      {props.subText !== undefined ? (
        <SubInputText>{props.subText}</SubInputText>
      ) : null}
    </CommonTextInputContainer>
  );
};
