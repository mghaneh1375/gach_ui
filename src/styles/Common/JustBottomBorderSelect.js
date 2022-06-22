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
      onSelect={props.onSelect}
      isHalf={props.isHalf}
      placeholder={props.placeholder}
      style={customStyle}
      values={props.values}
    />
  );
};

export default JustBottomBorderSelect;
