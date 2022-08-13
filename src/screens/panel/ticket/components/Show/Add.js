import {faPaperclip, faPaperPlane} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {View} from 'react-native';
import {
  CommonWebBox,
  EqualTwoTextInputs,
  PhoneView,
  MyView,
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
import Translator from '../../Translator';

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
      showError(Translator.insetYourMsg);
      return;
    }

    let res;
    let ticket = props.ticket;
    let files = [];
    props.setLoading(true);

    if (filesContent.length > 0) {
      for (let i = 0; i < filesContent.length; i++) {
        res = await addFile(props.token, filesContent[i], props.ticket.id);
        if (res !== null) files.push(res);
      }
    }

    res = await addMsg(props.ticket.id, props.token, msg);
    props.setLoading(false);

    if (res !== null) {
      ticket = res;
      props.setSelectedTicket(ticket);
      props.updateTicket(ticket);
      showSuccess(translator.successSendAnswer);
      clear();
      setMsg('');
    }
  };

  const removeAttach = index => {
    remove(index);
  };

  return (
    <MyView style={{zIndex: 5}}>
      <CommonWebBox
        child={
          <MyView>
            <EqualTwoTextInputs>
              <JustBottomBorderTextInput
                multiline={true}
                placeholder={translator.msgText}
                value={msg}
                parentStyle={{width: '90%'}}
                style={{width: '100%', maxWidth: 'unset', height: 40}}
                onChangeText={e => changeText(e)}
              />
              <PhoneView
                style={{
                  alignSelf: 'flex-end',
                  width: '8%',
                  justifyContent: 'inherit',
                }}>
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
          </MyView>
        }
      />
    </MyView>
  );
};

export default Add;
