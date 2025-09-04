import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {PhoneView, SimpleText} from '../../../../../styles/Common';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import {translator} from '../../translate';
import {styles} from '../../../../../styles/Common/Styles';

function Metric(props) {
  return (
    <PhoneView style={{gap: '30px', width: '100%'}}>
      <SimpleFontIcon
        onPress={props.onRemove}
        kind={'normal'}
        style={{alignSelf: 'center', color: 'red'}}
        icon={faTrash}
      />
      <SimpleText
        style={{
          ...styles.fontSize17,
          ...styles.BlueBold,
          ...{minWidth: '300px'},
        }}
        text={translator.metric + ': ' + props.metric.actionFa}
      />
      <SimpleText
        style={{...styles.fontSize17, ...styles.BlueBold}}
        text={translator.count + ': ' + props.metric.count}
      />
    </PhoneView>
  );
}

export default Metric;
