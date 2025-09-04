import React, {useState} from 'react';
import {
  BigBoldBlueText,
  CommonButton,
  CommonWebBox,
  PhoneView,
  MyView,
} from '@/styles';
import translator from '../../translator';
import AddBatch from './AddBatch.jsx';
import JustBottomBorderTextInput from '../../../../../styles/common/JustBottomBorderTextInput.jsx';
import {changeText, showError} from '../../../../../services/utility';
import {styleGap10Wrap} from '../detail/style';
import commonTranslator from '@/translator/common';
import {addQuestion, editQuestion} from '../utility';
import QuestionFile from './QuestionFile.jsx';
import {dispatchQuestionContext, questionContext} from '../detail/Context.jsx';
import UploadFile from '@/components/web/UploadFile.jsx';
import {CV_BASE_URL} from '../../../../../api/utility';
import RenderHTML from 'react-native-render-html';
function Create(props) {
  const useGlobalState = () => [
    React.useContext(questionContext),
    React.useContext(dispatchQuestionContext),
  ];
  const [state, dispatch] = useGlobalState();
  React.useEffect(() => {
    if (props.isInEditMode && state.selectedQuestion !== undefined) {
      setOrganizationId(state.selectedQuestion.organizationId);
      setAnswer(state.selectedQuestion.answer);
    }
  }, [state.selectedQuestion, props.isInEditMode]);
  const [finalMsg, setFinalMsg] = useState();
  const setResult = res => {
    setFinalMsg(
      <RenderHTML
        contentWidth={'100%'}
        source={{
          html:
            "<a href='" +
            res +
            "'>دانلود فایل اکسل اسامی فایل‌های بارگذاری شده</a>",
        }}
      />,
    );
  };
  const [showAddBatchPopUp, setShowAddBatchPopUp] = useState(false);
  const [showAddPDFPopUp, setShowAddPDFPopUp] = useState(false);
  const [answer, setAnswer] = useState();
  const [organizationId, setOrganizationId] = useState();
  const [questionFile, setQuestionFile] = useState();
  const [answerFile, setAnswerFile] = useState();
  const toggleShowAddBatchPopUp = () => {
    setShowAddBatchPopUp(!showAddBatchPopUp);
  };
  const toggleShowAddPDFFilePopUp = () => {
    setShowAddPDFPopUp(!showAddPDFPopUp);
  };
  const sendData = async () => {
    if (!props.isInEditMode && questionFile === undefined) {
      showError(commonTranslator.pleaseFillAllFields);
      return;
    }
    const data = {
      answer: answer,
      organizationId: organizationId,
    };
    props.setLoading(true);
    const res = props.isInEditMode
      ? await editQuestion(
          state.selectedQuestion.id,
          data,
          questionFile,
          answerFile,
          props.token,
        )
      : await addQuestion(data, questionFile, answerFile, props.token);
    props.setLoading(false);
    if (res !== null) {
      dispatch({
        questions: undefined,
      });
      props.setMode('detail');
    }
  };
  return (
    <MyView>
      <CommonWebBox
        onBackClick={() => props.setMode('list')}
        header={translator.addQuestions}
        backBtn={true}>
        {showAddBatchPopUp && (
          <AddBatch
            toggleShowPopUp={toggleShowAddBatchPopUp}
            token={props.token}
            setLoading={props.setLoading}
            setMode={props.setMode}
          />
        )}
        {showAddPDFPopUp && (
          <UploadFile
            toggleShow={toggleShowAddPDFFilePopUp}
            token={props.token}
            maxFileSize={5}
            accepts={['pdf']}
            expectedRes={'url'}
            setResult={setResult}
            finalMsg={finalMsg}
            multi={false}
            title={translator.uploadPDFFile}
            url={CV_BASE_URL + 'cropPDFForEscapeQuiz'}
            setLoading={props.setLoading}
          />
        )}
        <PhoneView
          style={{
            ...styleGap10Wrap,
          }}>
          <CommonButton
            onPress={() => toggleShowAddBatchPopUp()}
            theme={'dark'}
            title={translator.uploadExcelFile}
          />

          <CommonButton
            onPress={() => toggleShowAddPDFFilePopUp()}
            theme={'dark'}
            title={translator.uploadPDFFile}
          />
        </PhoneView>
        <PhoneView
          style={{
            gap: 15,
          }}>
          <JustBottomBorderTextInput
            placeholder={translator.organizationCode}
            subText={translator.organizationCode}
            value={organizationId}
            onChangeText={e => changeText(e, setOrganizationId)}
          />

          <JustBottomBorderTextInput
            placeholder={translator.answer}
            subText={translator.answer}
            value={answer}
            onChangeText={e => changeText(e, setAnswer)}
          />

          <PhoneView>
            <QuestionFile
              setFile={setQuestionFile}
              label={translator.questionFile}
            />
            <QuestionFile
              setFile={setAnswerFile}
              label={translator.answerFile}
            />
          </PhoneView>

          {props.isInEditMode && state.selectedQuestion !== undefined && (
            <PhoneView
              style={{
                width: '100%',
              }}>
              <BigBoldBlueText text={'تصویر صورت سوال فعلی'} />
              <img width={'75%'} src={state.selectedQuestion.questionFile} />
            </PhoneView>
          )}

          {props.isInEditMode &&
            state.selectedQuestion !== undefined &&
            state.selectedQuestion.answerFile !== undefined && (
              <PhoneView
                style={{
                  width: '100%',
                }}>
                <BigBoldBlueText text={'تصویرپاسخ تشریحی فعلی'} />
                <img width={'75%'} src={state.selectedQuestion.answerFile} />
              </PhoneView>
            )}
        </PhoneView>
        <CommonButton
          onPress={() => sendData()}
          title={commonTranslator.confirm}
        />
      </CommonWebBox>
    </MyView>
  );
}
export default Create;
