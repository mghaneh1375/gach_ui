import {faClose} from '@fortawesome/free-solid-svg-icons';
import {CommonButton} from '../../../styles/Common';

const Box = props => {
  return (
    <CommonButton
      onPress={() => props.removeItem(props.id)}
      iconDir="left"
      iconTheme="remove"
      title={props.title}
      theme={'transparent'}
      icon={faClose}
    />
  );
};

export default Box;
