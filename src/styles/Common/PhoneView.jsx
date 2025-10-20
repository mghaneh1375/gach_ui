import MyView from './MyView';
import {Platform} from 'react-native';

const PhoneView = props => {
  const style1 = {
    flexDirection: Platform.OS === 'web' ? 'row' : 'row-reverse',
    flexShrink: 1,
    flexWrap: 'wrap',
  };

  const allStyles =
    props.style !== undefined ? {...style1, ...props.style} : style1;

  let viewProps = {
    style: allStyles,
  };

  if (props.onClick !== undefined) viewProps.onClick = props.onClick;

  return (
    <MyView className={props.className} {...viewProps}>
      {props.children}
    </MyView>
  );
};

export default PhoneView;
