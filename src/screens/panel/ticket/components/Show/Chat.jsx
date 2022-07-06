import {View} from 'react-native-web';
import {
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';

const Chat = props => {
  const commonStyles = {};
  const myMsgStyle = {backgroundColor: 'red', alignSelf: 'flex-start'};
  const notForMeMsgStyle = {backgroundColor: 'blue', alignSelf: 'flex-end'};
  const allStyles = props.isForUser
    ? {...commonStyles, ...myMsgStyle}
    : {...commonStyles, ...notForMeMsgStyle};

  return (
    <CommonWebBox
      style={allStyles}
      child={
        <View>
          <PhoneView>
            <SimpleText text={props.createdAt} />
          </PhoneView>
          <SimpleText text={props.msg} />
        </View>
      }
    />
  );
};

export default Chat;
