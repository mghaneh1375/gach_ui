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
    width: '90%',
    fontSize: '10px important',
  };
  const myMsgStyle = {
    backgroundColor: 'white',
    direction: 'rtl',
    alignSelf: 'flex-start',
  };
  const notForMeMsgStyle = {
    backgroundColor: '#F1F1F1',
    alignSelf: 'flex-end',
  };
  const allStyles = props.isForUser
    ? {...commonStyles, ...myMsgStyle}
    : {...commonStyles, ...notForMeMsgStyle};

  return (
    <CommonWebBox style={allStyles}>
      <ChatImage dir={props.isForUser ? 'right' : 'left'} src={props.pic} />
      <View>
        <PhoneView style={{alignSelf: props.isForUser ? '' : 'flex-end'}}>
          <SimpleText
            style={{
              fontSize: 10,
              marginTop: -7,
              marginLeft: 10,
              marginRight: 15,
            }}
            text={props.createdAt}
          />
        </PhoneView>
        <SimpleText text={props.msg} />
        <PhoneView style={{alignSelf: props.isForUser ? 'flex-start' : ''}}>
          {props.files.map((elem, index) => {
            return <AttachBox key={index} filename={elem} />;
          })}
        </PhoneView>
      </View>
    </CommonWebBox>
  );
};

export default Chat;
