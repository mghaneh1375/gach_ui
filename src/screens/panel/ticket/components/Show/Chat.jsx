import {View} from 'react-native-web';
import {
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import AttachBox from './AttachBox/AttachBox';

const Chat = props => {
  const commonStyles = {};
  const myMsgStyle = {backgroundColor: 'red', alignSelf: 'flex-start'};
  const notForMeMsgStyle = {backgroundColor: 'blue', alignSelf: 'flex-end'};
  const allStyles = props.isForUser
    ? {...commonStyles, ...myMsgStyle}
    : {...commonStyles, ...notForMeMsgStyle};

  return (
    <CommonWebBox style={allStyles}>
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
