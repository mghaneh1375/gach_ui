import {PhoneView, SimpleText} from '../../styles/CommonComponents.jsx';
import {styles} from '../../styles/common/styles.js';
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
      {props.child}
      <SimpleText
        text={props.text}
        style={{
          color: props.color,
        }}
      />
    </PhoneView>
  );
}
export default Circle;
