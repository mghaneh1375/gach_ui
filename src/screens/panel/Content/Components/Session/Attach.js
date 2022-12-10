import {faPaperclip} from '@fortawesome/free-solid-svg-icons';
import {useFilePicker} from 'use-file-picker';
import {PhoneView, SimpleText} from '../../../../../styles/Common';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import AttachBox from '../../../ticket/components/Show/AttachBox/AttachBox';
import Translator from '../../Translate';
import {contentContext, dispatchContentContext} from '../Context';
import {removeSessionFile} from '../Utility';
import React from 'react';
import {styles} from '../../../../../styles/Common/Styles';

function Attach(props) {
  const useGlobalState = () => [
    React.useContext(contentContext),
    React.useContext(dispatchContentContext),
  ];
  const [state, dispatch] = useGlobalState();

  const [openFileSelector, {filesContent, loading, errors, clear, remove}] =
    useFilePicker({
      maxFileSize: 6,
      accept: ['image/*', 'pdf', 'docx', 'ppt', 'pptx', 'video/*', 'zip'],
      readAs: 'DataURL',
      multiple: true,
    });

  const removeUploadedAttach = async filename => {
    props.setLoading(true);
    let res = await removeSessionFile(
      props.token,
      state.selectedContent.id,
      state.selectedSession.id,
      'attach',
      filename,
    );
    props.setLoading(false);
    if (res === null) return;

    let attaches = state.selectedSession.attaches.filter(elem => {
      return elem !== filename;
    });

    state.selectedSession.attaches = attaches;
    dispatch({selectedSession: state.selectedSession, needUpdateSession: true});
  };

  //   if (state.filesContentAttaches.length > 0) {
  //     let all_attaches = undefined;

  //     for (let i = 0; i < state.filesContentAttaches.length; i++) {
  //       let fileRes = await setSessionFile(
  //         props.token,
  //         state.filesContentAttaches[i],
  //         state.selectedContent.id,
  //         sessionId,
  //         'attach',
  //       );
  //       if (fileRes !== null && fileRes !== undefined)
  //         all_attaches.push(fileRes);
  //     }

  //     res.attaches = all_attaches;
  //   }

  return (
    <PhoneView style={{...styles.gap15}}>
      <SimpleText
        style={{...styles.alignSelfCenter, ...styles.BlueBold}}
        text={Translator.attaches}
      />
      <SimpleFontIcon
        onPress={() => openFileSelector()}
        kind={'normal'}
        icon={faPaperclip}
      />

      <PhoneView style={{marginTop: 20}}>
        {state.selectedSession !== undefined &&
          state.selectedSession.attaches !== undefined &&
          state.selectedSession.attaches.length > 0 &&
          state.selectedSession.attaches.map((elem, index) => {
            return (
              <AttachBox
                key={index}
                filename={elem}
                removeAttach={async () => {
                  await removeUploadedAttach();
                }}
              />
            );
          })}

        {filesContent !== undefined &&
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
  );
}

export default Attach;
