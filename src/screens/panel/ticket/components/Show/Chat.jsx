import {View} from 'react-native-web';
import {
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import AttachBox from './AttachBox/AttachBox';
import ChatImage from './ChatImage/ChatImage';

const Chat = props => {
  const commonStyles = {};
  const myMsgStyle = {
    backgroundColor: 'white',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
    width: '95%',
    direction: 'rtl',
    alignSelf: 'flex-start',
  };
  const notForMeMsgStyle = {
    backgroundColor: 'white',
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 20,
    marginRight: 20,
    width: '95%',
    alignSelf: 'flex-end',
  };
  const allStyles = props.isForUser
    ? {...commonStyles, ...myMsgStyle}
    : {...commonStyles, ...notForMeMsgStyle};

  console.log('====================================');
  console.log(props.pic);
  console.log('====================================');

  return (
    <CommonWebBox style={allStyles}>
      <ChatImage src={props.pic} />
      <View>
        <PhoneView>
          <SimpleText text={props.createdAt} />
        </PhoneView>
        <SimpleText text={props.msg} />
        <PhoneView>
          {props.files.map((elem, index) => {
            return <AttachBox key={index} filename={elem} />;
          })}
        </PhoneView>
      </View>
    </CommonWebBox>
  );
};

export default Chat;
