import {PhoneView, SimpleText} from '../../styles/Common';
import {styles} from '../../styles/Common/Styles';

function Circle(props) {
  return (
    <PhoneView
      style={{
        ...props.style,
        ...styles.justifyContentCenter,
        ...styles.alignItemsCenter,
        overflow: 'hidden',
        width: props.diameter,
        height: props.diameter,
        ...styles.borderRadius50,
        backgroundColor: props.backgroundColor,
      }}>
      <SimpleText text={props.text} style={{color: props.color}} />
    </PhoneView>
  );
}

export default Circle;
