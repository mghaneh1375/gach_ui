import {View} from 'react-native-web';
import {
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import AttachBox from './AttachBox/AttachBox';
import ChatImage from './ChatImage/ChatImage';

const Chat = props => {
  const commonStyles = {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
    width: '95%',
  };
  const myMsgStyle = {
    backgroundColor: 'white',
    direction: 'rtl',
    alignSelf: 'flex-start',
  };
  const notForMeMsgStyle = {
    backgroundColor: 'white',
    alignSelf: 'flex-end',
  };
  const allStyles = props.isForUser
    ? {...commonStyles, ...myMsgStyle}
    : {...commonStyles, ...notForMeMsgStyle};

  return (
    <CommonWebBox style={allStyles}>
      <ChatImage dir={props.isForUser ? 'right' : 'left'} src={props.pic} />
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
