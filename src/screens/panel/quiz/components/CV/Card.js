import React, {useState} from 'react';
import {routes} from '../../../../../API/APIRoutes';
import UploadFile from '../../../../../components/web/UploadFile';
import {showSuccess} from '../../../../../services/Utility';
import {CommonButton, SimpleText, MyView} from '../../../../../styles/Common';
import commonTranslator from '../../../../../translator/Common';
import {correct} from '../Utility';

function Card({
  index,
  setLoading,
  token,
  setSelectedAnswerSheetIdx,
  studentId,
  state,
  dispatch,
}) {
  const [showUploadPane, setShowUploadPane] = useState(false);
  // const [answerSheet, setAnswerSheet] = useState();
  // const [answerSheetAfterCorrection, setAnswerSheetAfterCorrection] =
  //   useState();

  // React.useEffect(() => {
  //   if (index === undefined) return;
  //   setAnswerSheet(state.selectedQuiz.answer_sheets[index].answerSheet);
  //   setAnswerSheetAfterCorrection(
  //     state.selectedQuiz.answer_sheets[index].answerSheetAfterCorrection,
  //   );
  // }, [index, state.selectedQuiz]);

  const afterAdd = res => {
    if (res !== null) {
      // setAnswerSheet(res);
      state.selectedQuiz.answer_sheets[index].answerSheet = res;
      dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
      showSuccess(commonTranslator.success);
      setShowUploadPane(false);
    }
  };

  return (
    <MyView>
      {showUploadPane && (
        <UploadFile
          token={token}
          accept={['image/*']}
          url={
            routes.setQuizAnswerSheet +
            state.selectedQuiz.generalMode +
            '/' +
            state.selectedQuiz.id +
            '/' +
            studentId
          }
          expectedRes={'file'}
          setResult={afterAdd}
          multi={false}
          maxFileSize={1}
          setLoading={setLoading}
          toggleShow={() => setShowUploadPane(false)}
        />
      )}
      <SimpleText
        style={{alignSelf: 'center'}}
        text={state.selectedQuiz.answer_sheets[index].student.name}
      />
      {index !== undefined &&
        state.selectedQuiz.answer_sheets[index].answerSheet !== undefined &&
        state.selectedQuiz.answer_sheets[index].answerSheet !== '' && (
          <img
            style={{width: 100}}
            src={state.selectedQuiz.answer_sheets[index].answerSheet}
          />
        )}
      {index !== undefined &&
        state.selectedQuiz.answer_sheets[index].answerSheetAfterCorrection !==
          undefined &&
        state.selectedQuiz.answer_sheets[index].answerSheetAfterCorrection !==
          '' && (
          <img
            src={
              state.selectedQuiz.answer_sheets[index].answerSheetAfterCorrection
            }
          />
        )}
      <CommonButton
        onPress={() => setShowUploadPane(true)}
        theme={'dark'}
        title={'آپلود تصویر پاسخ برگ'}
      />
      <CommonButton
        onPress={() => {
          let data = state.selectedQuiz.answer_sheet.map((elem, index) => {
            elem.studentAns =
              state.selectedQuiz.answer_sheets[index].answers[index];
            return elem;
          });
          dispatch({
            wanted_answer_sheet: data,
            new_std_answer_sheet: state.selectedQuiz.answer_sheets[
              index
            ].answers.map(elem => {
              return elem;
            }),
          });
          setSelectedAnswerSheetIdx(index);
        }}
        theme={'dark'}
        title={'وارد کردن پاسخ ها'}
      />
      {state.selectedQuiz.answer_sheets[index].answerSheet !== undefined &&
        state.selectedQuiz.answer_sheets[index].answerSheet !== '' && (
          <CommonButton
            onPress={async () => {
              setLoading(true);
              let res = await correct(
                state.selectedQuiz.id,
                state.selectedQuiz.generalMode,
                studentId,
                token,
              );
              setLoading(false);
              if (res !== null) {
                state.selectedQuiz.answer_sheets[
                  index
                ].answerSheetAfterCorrection = res.path;
                dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
              }
            }}
            theme={'dark'}
            title={'تصحیح'}
          />
        )}
    </MyView>
  );
}

export default Card;
