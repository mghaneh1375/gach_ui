import {Platform} from 'react-native';
import {CommonDatePickerElem, CommonTextInputContainer} from './CommonText';
import SubInputText from './SubInputText';
import {convertTimestamp} from '../../services/Utility';

export const CommonDatePicker = props => {
  const isHalf = props.isHalf !== undefined && props.isHalf;
  const isApp = Platform.OS !== 'web';

  let value = props.value;

  if (typeof value === 'string' && value.length === 0) value = undefined;

  if (
    value !== undefined &&
    (typeof value === 'number' || value.indexOf('ساعت') == -1)
  ) {
    value = convertTimestamp(value);
  }

  const inputProps = {
    placeholder: props.placeholder,
    format: 'تاریخ: jYYYY/jMM/jDD ساعت: HH:mm',
    containerClass: 'date-picker',
    onChange: e => {
      props.setter(e * 1000);
    },
  };
  if (value !== undefined) inputProps['preSelected'] = value;

  return (
    <CommonTextInputContainer
      style={
        isHalf
          ? {
              width: isApp ? 'auto' : 'calc(50% - 10px)',
              maxWidth: 300,
              direction: 'rtl',
              zIndex: 'unset',
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
