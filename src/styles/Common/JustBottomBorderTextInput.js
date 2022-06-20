import {CommonTextInput} from './CommonTextInput';

export const JustBottomBorderTextInput = props => {
  const customStyle = {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 0,
  };
  return (
    <CommonTextInput
      isHalf={props.isHalf}
      placeholder={props.placeholder}
      subText={props.subText}
      style={customStyle}
    />
  );
};
