import {CommonDatePicker} from './CommonDatePicker';

const JustBottomBorderDatePicker = props => {
  return (
    <CommonDatePicker
      setter={props.setter}
      isHalf={props.isHalf}
      placeholder={props.placeholder}
      value={props.value}
      subText={props.subText}
    />
  );
};

export default JustBottomBorderDatePicker;
