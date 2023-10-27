import React from 'react';
import {dispatchQuizContext, quizContext} from '../Context';
import {setPDFSubjects} from '../Utility';
import {
  CommonButton,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import translator from '../../Translator';
import commonTranslator from '../../../../../translator/Common';
import {showError, showSuccess} from '../../../../../services/Utility';
import {useFilePicker} from 'use-file-picker';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons';
import AttachBox from '../../../ticket/components/Show/AttachBox/AttachBox';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import {styles} from '../../../../../styles/Common/Styles';

function UploadSubjects(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];

  const [state, dispatch] = useGlobalState();

  const [openFileSelector, {filesContent, loading, errors, clear, remove}] =
    useFilePicker({
      maxFileSize: 6,
      accept: ['excel/*'],
      readAs: 'ArrayBuffer',
      multiple: false,
    });

  return (
    <>
      <PhoneView style={{...styles.gap15}}>
        <SimpleText
          style={{...styles.alignSelfCenter, ...styles.BlueBold}}
          text={translator.subjectsFile}
        />
        <SimpleFontIcon
          onPress={() => openFileSelector()}
          kind={'normal'}
          icon={faPaperclip}
        />

        <PhoneView style={{marginTop: 20}}>
          {state.selectedQuiz.file !== undefined && (
            <AttachBox filename={state.selectedQuiz.file} />
          )}

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

      <CommonButton
        onPress={async () => {
          if (
            filesContent === undefined ||
            filesContent.length < 1 ||
            filesContent[0] === undefined ||
            filesContent[0] === null
          ) {
            showError('لطفا فایل اکسل را مشخص کنید');
            return;
          }

          props.setLoading(true);
          let res = await setPDFSubjects(
            state.selectedQuiz.id,
            props.token,
            filesContent[0],
          );

          props.setLoading(false);
          if (res[0] == null) return;

          showSuccess();
        }}
        theme={'dark'}
        title={commonTranslator.confirm}
      />
    </>
  );
}

export default UploadSubjects;
