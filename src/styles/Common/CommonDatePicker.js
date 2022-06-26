import {Platform} from 'react-native';
import {CommonDatePickerElem, CommonTextInputContainer} from './CommonText';

import SubInputText from './SubInputText';

export const CommonDatePicker = props => {
  const isHalf = props.isHalf !== undefined && props.isHalf;
  const isApp = Platform.OS !== 'web';

  const inputProps = {
    placeholder: props.placeholder,
    format: 'تاریخ: jYYYY/jMM/jDD ساعت: HH:mm',
    containerClass: 'date-picker',
    onChange: props.onChange,
    preSelected: props.value,
  };

  return (
    <CommonTextInputContainer
      style={
        isHalf
          ? {
              width: isApp ? 'auto' : 'calc(50% - 10px)',
              maxWidth: 300,
              direction: 'rtl',
            }
          : {}
      }>
      <CommonDatePickerElem {...inputProps} />
      {props.subText !== undefined ? (
        <SubInputText>{props.subText}</SubInputText>
      ) : null}
    </CommonTextInputContainer>
  );
};
