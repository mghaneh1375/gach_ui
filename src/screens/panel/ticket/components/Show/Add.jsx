import {faPaperclip, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import {useState} from 'react';
import {View} from 'react-native';
import {
  CommonWebBox,
  EqualTwoTextInputs,
  PhoneView,
} from '../../../../../styles/Common';
import {FontIcon} from '../../../../../styles/Common/FontIcon';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../../Translator';
import UploadFile from './../../../../../components/web/UploadFile';

const Add = props => {
  const [msg, setMsg] = useState();
  const [showUploadPopUp, setShowUploadPopUp] = useState();

  const changeText = text => {
    setMsg(text);
  };

  const sendMsg = () => {};

  const toggleShowUploadPopUp = () => {
    setShowUploadPopUp(!showUploadPopUp);
  };

  return (
    <View style={{zIndex: 5}}>
      {showUploadPopUp && (
        <UploadFile
          accept={['image/*', '.pdf', 'video/*']}
          maxFileSize={6}
          toggleShow={toggleShowUploadPopUp}
        />
      )}
      <CommonWebBox
        child={
          <EqualTwoTextInputs>
            <JustBottomBorderTextInput
              multiline={true}
              placeholder={translator.msgText}
              value={msg}
              style={{minWidth: 500, height: 40}}
              onChangeText={e => changeText(e)}
            />
            <PhoneView>
              <FontIcon
                onPress={() => toggleShowUploadPopUp()}
                theme={'rect'}
                kind={'normal'}
                icon={faPaperclip}
              />
              <FontIcon
                onPress={() => sendMsg()}
                theme={'rect'}
                kind={'normal'}
                icon={faPaperPlane}
              />
            </PhoneView>
          </EqualTwoTextInputs>
        }
      />
    </View>
  );
};

export default Add;
