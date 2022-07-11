import {CommonSelect} from './CommonSelect';

const JustBottomBorderSelect = props => {
  const customStyle =
    props.style === undefined
      ? {
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderRadius: 0,
          paddingBottom: 0,
        }
      : {
          ...props.style,
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
          borderRadius: 0,
          paddingBottom: 0,
        };

  return (
    <CommonSelect
      setter={props.setter}
      isHalf={props.isHalf}
      placeholder={props.placeholder}
      style={customStyle}
      values={props.values}
      value={props.value}
      subText={props.subText}
    />
  );
};

export default JustBottomBorderSelect;
