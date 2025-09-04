import React, {useState} from 'react';
import {setPDFQuestions} from '../utility';
import {CommonButton, CommonWebBox, PhoneView, SimpleText} from '@/styles';
import translator from '../../translator';
import commonTranslator from '@/translator/common';
import JustBottomBorderTextInput from '../../../../../styles/common/JustBottomBorderTextInput.jsx';
import {
  changeText,
  showError,
  showSuccess,
} from '../../../../../services/utility';
import {useFilePicker} from 'use-file-picker';
import {faPaperclip} from '@fortawesome/free-solid-svg-icons';
import AttachBox from '../../../ticket/components/show/attachBox/AttachBox.jsx';
import {SimpleFontIcon} from '../../../../../styles/common/FontIcon.jsx';
import {styles} from '@/styles/common/styles';
function UploadQuestions(props) {
  const [openFileSelector, {filesContent, errors, clear}] = useFilePicker({
    maxFileSize: 6,
    accept: ['pdf/*'],
    readAs: 'ArrayBuffer',
    multiple: false,
  });
  const [count, setCount] = useState(props.state.selectedQuiz.qNo);
  React.useEffect(() => {
    if (errors[0]?.fileSizeToolarge)
      showError('حداکثر حجم مجاز 6 مگابایت می باشد');
  }, [errors]);
  return (
    <CommonWebBox
      backBtn={true}
      onBackClick={() => props.setMode('list')}
      header={translator.pdfQuestion}>
      <JustBottomBorderTextInput
        onChangeText={text => changeText(text, setCount)}
        placeholder={translator.qNo}
        subText={translator.qNo}
        value={count}
        isHalf={true}
        justNum={true}
      />

      <PhoneView
        style={{
          ...styles.gap15,
        }}>
        <SimpleText
          style={{
            ...styles.alignSelfCenter,
            ...styles.BlueBold,
          }}
          text={translator.questionFile}
        />
        <SimpleFontIcon
          onPress={() => openFileSelector()}
          kind={'normal'}
          icon={faPaperclip}
        />

        <PhoneView
          style={{
            marginTop: 20,
          }}>
          {props.state.selectedQuiz.pdfQuestionFile && (
            <AttachBox
              onClick={() =>
                window.open(props.state.selectedQuiz.pdfQuestionFile)
              }
              filename={props.state.selectedQuiz.pdfQuestionFile}
            />
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
                    clear();
                  }}
                />
              );
            })}
        </PhoneView>
      </PhoneView>

      <CommonButton
        onPress={async () => {
          if (count === undefined) {
            showError('لطفا تعداد سوالات را وارد نمایید');
            return;
          }
          props.setLoading(true);
          const res = await setPDFQuestions(
            props.state.selectedQuiz.id,
            props.token,
            count,
            filesContent[0],
          );
          props.setLoading(false);
          if (res == null) return;
          showSuccess();
          props.state.selectedQuiz.qNo = count;
          props.state.selectedQuiz.questionsCount = count;
          props.state.selectedQuiz.subjects = undefined;
          props.dispatch({
            selectedQuiz: props.state.selectedQuiz,
          });
        }}
        theme={'dark'}
        title={commonTranslator.confirm}
      />
    </CommonWebBox>
  );
}
export default UploadQuestions;
