import {showError} from '@/services/utility.js';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '@/styles';
import {SimpleFontIcon} from '@/styles/common/FontIcon.jsx';
import JustBottomBorderTextInput from '@/styles/common/JustBottomBorderTextInput.jsx';
import {styles} from '@/styles/common/styles.js';
import commonTranslator from '@/translator/common.js';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import {useFilePicker} from 'use-file-picker';
import AttachBox from '../../../ticket/components/show/attachBox/AttachBox.jsx';
import {contentContext, dispatchContentContext} from '../Context.jsx';
import {removeSessionFile, setSessionFile} from '../utility.js';
function Attach(props) {
  const useGlobalState = () => [
    React.useContext(contentContext),
    React.useContext(dispatchContentContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [title, setTitle] = useState();
  const [openFileSelector, {filesContent, remove}] = useFilePicker({
    maxFileSize: 8,
    accept: ['image/*', '.pdf', '.docx', '.ppt', '.pptx', 'video/*', '.zip'],
    readAs: 'DataURL',
    multiple: true,
  });
  const removeUploadedAttach = async filename => {
    props.setLoading(true);
    const splited_filename = filename.split('/');
    const res = await removeSessionFile(
      props.token,
      state.selectedContent.id,
      state.selectedSession.id,
      'attach',
      splited_filename[splited_filename.length - 1],
    );
    props.setLoading(false);
    if (res === null) return;

    state.selectedSession.attaches = state.selectedSession.attaches.filter(
      elem => {
        return elem.filename !== filename;
      },
    );
    dispatch({
      selectedSession: state.selectedSession,
      needUpdateSession: true,
    });
  };
  return (
    <CommonWebBox
      header={''}
      backBtn={true}
      onBackClick={() => props.setMode('sessions')}>
      <SimpleText text={'فایل‌های ضمیمه'} />
      {state.selectedSession &&
        state.selectedSession.attaches &&
        state.selectedSession.attaches.length > 0 &&
        state.selectedSession.attaches.map((elem, index) => {
          return (
            <PhoneView>
              <SimpleText text={elem.title} />
              <AttachBox
                key={index}
                filename={elem.filename}
                removeAttach={async () => {
                  await removeUploadedAttach(elem.filename);
                }}
              />
            </PhoneView>
          );
        })}

      <MyView
        style={{
          ...styles.gap15,
        }}>
        <SimpleText text={'فایل جدید'} />
        <JustBottomBorderTextInput
          value={title}
          onChangeText={e => setTitle(e)}
          placeholder={commonTranslator.title}
          subText={commonTranslator.title}
        />
        <PhoneView>
          <SimpleText text={'انتخاب فایل'} />
          <SimpleFontIcon
            onPress={() => openFileSelector()}
            kind={'normal'}
            icon={faPaperclip}
          />

          <PhoneView
            style={{
              marginTop: 20,
            }}>
            {filesContent &&
              filesContent.length > 0 &&
              filesContent.map((elem, index) => {
                return (
                  <AttachBox
                    key={index}
                    filename={elem.name}
                    fileContent={elem.content}
                    removeAttach={() => {
                      remove(index);
                    }}
                  />
                );
              })}
          </PhoneView>
        </PhoneView>
      </MyView>
      <EqualTwoTextInputs>
        <CommonButton
          onPress={() => props.setMode('sessions')}
          title={commonTranslator.back}
        />
        <CommonButton
          onPress={async () => {
            if (!title || title.length === 0) {
              showError(commonTranslator.pleaseFillAllFields);
              return;
            }
            const session = state.selectedSession;
            let all_attaches = session.attaches;
            if (filesContent.length > 0) {
              props.setLoading(true);
              for (let i = 0; i < filesContent.length; i++) {
                const fileRes = await setSessionFile(
                  props.token,
                  filesContent[i],
                  title,
                  state.selectedContent.id,
                  session.id,
                );
                if (fileRes !== null && fileRes !== undefined) {
                  if (all_attaches === undefined) all_attaches = [];
                  all_attaches.push(fileRes);
                }
              }
              props.setLoading(false);
              session.attaches = all_attaches;
            }
            const sessions = state.selectedContent.sessions.map(elem => {
              if (elem.id === session.id) return session;
              return elem;
            });
            state.selectedContent.sessions = sessions;
            dispatch({
              selectedContent: state.selectedContent,
              needUpdate: true,
            });
            props.setMode('sessions');
          }}
          title={commonTranslator.confirm}
          theme="dark"
        />
      </EqualTwoTextInputs>
    </CommonWebBox>
  );
}
export default Attach;
