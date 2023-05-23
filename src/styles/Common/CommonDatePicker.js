import {Platform} from 'react-native';
import {
  calcInputWidth,
  CommonDatePickerElem,
  CommonJustDatePickerElem,
} from './CommonText';
import SubInputText from './SubInputText';
import {
  convertTimestamp,
  convertTimestampToJustDate,
} from '../../services/Utility';
import {MyView} from '../Common';

export const CommonDatePicker = props => {
  const isHalf = props.isHalf !== undefined && props.isHalf;
  const isApp = Platform.OS !== 'web';

  let value = props.value;

  if (typeof value === 'string' && value.length === 0) value = undefined;

  if (
    value !== undefined &&
    (typeof value === 'number' || value.indexOf('ساعت') == -1)
  ) {
    value = props.justDate
      ? convertTimestampToJustDate(value)
      : convertTimestamp(value);
  }

  const inputProps = {
    placeholder: props.placeholder,
    format: props.justDate
      ? 'jYYYY/jMM/jDD'
      : 'تاریخ: jYYYY/jMM/jDD ساعت: HH:mm',
    containerClass: 'date-picker',
    onChange: e => {
      props.setter(e * 1000);
    },
  };
  if (value !== undefined) inputProps['preSelected'] = value;

  let parentAllStyles = isHalf
    ? {
        ...{
          direction: 'rtl',
          zIndex: 'unset',
          paddingRight: 0,
          paddingLeft: 0,
        },
      }
    : {
        ...props.parentStyle,
        ...{textAlign: 'right', paddingRight: 0, paddingLeft: 0}, // zIndex: 5,
      };
  if (props.parentStyle !== undefined)
    parentAllStyles = {...parentAllStyles, ...props.parentStyle};

  parentAllStyles = calcInputWidth(15, isHalf, parentAllStyles);

  return (
    <MyView style={parentAllStyles}>
      {(props.justDate === undefined || !props.justDate) && (
        <CommonDatePickerElem {...inputProps} />
      )}
      {props.justDate !== undefined && props.justDate && (
        <CommonJustDatePickerElem {...inputProps} />
      )}

      {props.subText !== undefined ? (
        <SubInputText>{props.subText}</SubInputText>
      ) : null}
    </MyView>
  );
};
