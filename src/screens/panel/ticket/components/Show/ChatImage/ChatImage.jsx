import {View} from 'react-native';
import {CommonWebBox} from '../../../../../../styles/Common';

function ChatImage(props) {
  const style = {
    width: 40,
    height: 40,
    borderRadius: '50%',
    padding: 0,
    margin: 0,
    position: 'absolute',
    backgroundColor: 'green',
    right: -20,
    top: -20,
    backgroundImage: `url(${props.src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'Center',
  };
  return <View style={style} />;
}

export default ChatImage;
