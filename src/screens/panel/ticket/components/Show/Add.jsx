import {faPaperclip, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {View} from 'react-native';
import {
  CommonWebBox,
  EqualTwoTextInputs,
  PhoneView,
} from '../../../../../styles/Common';
import {FontIcon} from '../../../../../styles/Common/FontIcon';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../../Translator';
import {useFilePicker} from 'use-file-picker';
import AttachBox from './AttachBox/AttachBox';
import {
  getSimpleCurrTime,
  showError,
  showSuccess,
} from '../../../../../services/Utility';
import {addFile, addMsg} from './Utility';

const Add = props => {
  const [msg, setMsg] = useState();
  const [openFileSelector, {filesContent, loading, errors, clear, remove}] =
    useFilePicker({
      maxFileSize: 6,
      accept: ['image/*', '.pdf', '.xls', '.xlsx', '.docx'],
      readAs: 'DataURL',
      multiple: true,
      limitFilesConfig: {max: 5},
    });

  const changeText = text => {
    setMsg(text);
  };

  const sendMsg = async () => {
    if (msg === undefined || msg.length === 0) {
      showError('لطفا متن پیام خود را وارد نمایید.');
      return;
    }

    if (filesContent.length > 0) {
      props.setLoading(true);

      let res;
      let ticket = props.ticket;
      let files = [];

      for (let i = 0; i < filesContent.length; i++) {
        res = await addFile(props.token, filesContent[i], props.ticket.id);
        if (res !== null) files.push(res);
      }

      res = await addMsg(props.ticket.id, props.token, msg);
      props.setLoading(false);
      let chats = ticket.chats;
      const isForUser = !chats[chats.length - 1].isForUser;

      if (res !== null) {
        chats.push({
          msg: msg,
          isForUser: isForUser,
          files: files,
          createdAt: getSimpleCurrTime(),
        });
        ticket.chats = chats;
        props.updateTicket(ticket);
        showSuccess(translator.successSendAnswer);
      }
    }
  };

  const removeAttach = index => {
    remove(index);
  };

  return (
    <View style={{zIndex: 5}}>
      <CommonWebBox
        child={
          <View>
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
                  onPress={() => openFileSelector()}
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
            <PhoneView style={{marginTop: 20}}>
              {filesContent.map((file, index) => {
                return (
                  <AttachBox
                    key={index}
                    filename={file.name}
                    fileContent={file.content}
                    removeAttach={() => removeAttach(index)}
                  />
                );
              })}
            </PhoneView>
          </View>
        }
      />
    </View>
  );
};

export default Add;
