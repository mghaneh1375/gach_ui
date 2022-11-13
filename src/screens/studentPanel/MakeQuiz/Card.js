import {CommonWebBox, PhoneView, SimpleText} from '../../../styles/Common';
import {styles} from '../../../styles/Common/Styles';
import Translate from './Translate';

function Card(props) {
  return (
    <CommonWebBox width={300}>
      <SimpleText
        style={styles.colorOrangeRed}
        text={Translate.questionCounts}
      />

      <SimpleText
        style={styles.dark_blue_color}
        text={
          props.limitEasy +
          Translate.easy +
          props.limitMid +
          Translate.mid +
          props.limitHard +
          Translate.hard
        }
      />
      <PhoneView
        style={{
          ...styles.cream_back,
          ...styles.borderRadius10,
          ...styles.padding5,
        }}>
        <SimpleText style={styles.BlueBold} text={props.header} />
      </PhoneView>
      <SimpleText text={props.desc} />
    </CommonWebBox>
  );
}

export default Card;
