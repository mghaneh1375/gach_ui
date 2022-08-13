import {View} from 'react-native';

function ChatImage(props) {
  const style = {
    width: 40,
    height: 40,
    borderRadius: '50%',
    padding: 0,
    margin: 0,
    position: 'absolute',
    backgroundColor: 'green',
    right: props.dir === 'right' ? -20 : 'unset',
    left: props.dir === 'left' ? -20 : 'unset',
    top: -20,
    backgroundImage: `url(${props.src})`,
    backgroundSize: 'cover',
    backgroundPosition: 'Center',
  };
  return <MyView style={style} />;
}

export default ChatImage;
