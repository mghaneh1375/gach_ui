import {CommonTextInput} from './CommonTextInput';

export const JustBottomBorderTextInput = props => {
  const customStyle = {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderRadius: 0,
    paddingBottom: 0,
  };
  return (
    <CommonTextInput
      onChangeText={props.onChangeText}
      justNum={props.justNum}
      isHalf={props.isHalf}
      placeholder={props.placeholder}
      subText={props.subText}
      resultPane={props.resultPane}
      style={customStyle}
    />
  );
};
