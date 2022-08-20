import {faClose} from '@fortawesome/free-solid-svg-icons';
import {CommonButton} from '../../../styles/Common';

const Box = props => {
  return (
    <CommonButton
      style={{gap: 15}}
      onPress={() => props.removeItem()}
      iconDir="left"
      iconTheme="remove"
      padding="unset"
      title={props.title}
      theme={'transparent'}
      icon={faClose}
    />
  );
};

export default Box;
