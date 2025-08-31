import React from 'react';
import {Text} from 'react-native';

const SimpleTextWithRef = React.forwardRef((props, ref) => {
  const style1 = {fontFamily: 'IRANSans'};
  const allStyle =
    props.style !== undefined ? {...style1, ...props.style} : style1;

  let textProps = {
    style: allStyle,
  };

  if (props.onPress !== undefined) textProps.onClick = props.onPress;
  return (
    <Text ref={ref} {...textProps}>
      {props.text}
    </Text>
  );
});

export default SimpleTextWithRef;
