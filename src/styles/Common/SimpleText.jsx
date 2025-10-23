import {Text} from 'react-native';

const SimpleText = props => {
  const style1 = {fontFamily: 'IRANSans'};
  const allStyle =
    props.style !== undefined ? {...style1, ...props.style} : style1;

  const textProps = {
    style: allStyle,
  };

  if (props.onPress !== undefined) textProps.onClick = props.onPress;
  return <Text {...textProps}>{props.text}</Text>;
};

export default SimpleText;
