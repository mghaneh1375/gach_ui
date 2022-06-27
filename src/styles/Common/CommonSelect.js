import {Platform} from 'react-native';
import {
  CommonHalfTextInputStyleWeb,
  CommonSelectElem,
  CommonTextInputContainer,
  CommonTextInputStyleWeb,
} from './CommonText';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';
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
      ? {...style1, ...props.style, ...{height: 35}}
      : {...style1, ...{height: 35}};

  const inputProps = {
    data: props.values.map(function (element) {
      return element.name;
    }),
    dropdownStyle: {
      padding: 10,
      backgroundColor: vars.WHITE,
      borderWidth: 1,
      borderRadius: 7,
    },
    buttonTextStyle: {
      fontFamily: 'IRANSans',
    },
    rowTextStyle: {
      fontFamily: 'IRANSans',
    },
    dropdownIconPosition: 'left',
    defaultButtonText:
      props.placeholder === undefined ? 'انتخاب کنید' : props.placeholder,

    buttonStyle: allStyle,
    onSelect: (selectedItem, index) => {
      props.onSelect(selectedItem, index);
    },
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
          : {}
      }>
      <CommonSelectElem {...inputProps} />
      {props.subText !== undefined ? (
        <SubInputText>{props.subText}</SubInputText>
      ) : null}
    </CommonTextInputContainer>
  );
};
