import {faClose} from '@fortawesome/free-solid-svg-icons';
import {CommonButton} from '../../../../../styles/Common';

function BuiltFilter(props) {
  return (
    <CommonButton
      onPress={() => props.remove()}
      icon={faClose}
      theme={'dark'}
      iconDir={'left'}
      title={
        props.elem.valueText === undefined
          ? props.elem.label
          : props.elem.label + ': ' + props.elem.valueText
      }
    />
  );
}

export default BuiltFilter;
