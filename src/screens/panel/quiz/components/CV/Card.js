import React, {useState} from 'react';
import {routes} from '../../../../../API/APIRoutes';
import UploadFile from '../../../../../components/web/UploadFile';
import {showSuccess} from '../../../../../services/Utility';
import {CommonButton, SimpleText, MyView} from '../../../../../styles/Common';
import commonTranslator from '../../../../../translator/Common';
import {dispatchQuizContext, quizContext} from '../Context';
import {correct} from '../Utility';

function Card(props) {
  const [showUploadPane, setShowUploadPane] = useState(false);
  // const [answerSheet, setAnswerSheet] = useState();
  // const [answerSheetAfterCorrection, setAnswerSheetAfterCorrection] =
  //   useState();

  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();

  // React.useEffect(() => {
  //   if (props.index === undefined) return;
  //   setAnswerSheet(state.selectedQuiz.answer_sheets[props.index].answerSheet);
  //   setAnswerSheetAfterCorrection(
  //     state.selectedQuiz.answer_sheets[props.index].answerSheetAfterCorrection,
  //   );
  // }, [props.index, state.selectedQuiz]);

  const afterAdd = res => {
    if (res !== null) {
      // setAnswerSheet(res);
      state.selectedQuiz.answer_sheets[props.index].answerSheet = res;
      dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
      showSuccess(commonTranslator.success);
      setShowUploadPane(false);
    }
  };

  return (
    <MyView>
      {showUploadPane && (
        <UploadFile
          token={props.token}
          accept={['image/*']}
          url={
            routes.setQuizAnswerSheet +
            state.selectedQuiz.generalMode +
            '/' +
            state.selectedQuiz.id +
            '/' +
            props.answerSheet.student.id
          }
          expectedRes={'file'}
          setResult={afterAdd}
          multi={false}
          maxFileSize={1}
          setLoading={props.setLoading}
          toggleShow={() => setShowUploadPane(false)}
        />
      )}
      <SimpleText
        style={{alignSelf: 'center'}}
        text={state.selectedQuiz.answer_sheets[props.index].student.name}
      />
      {props.index !== undefined &&
        state.selectedQuiz.answer_sheets[props.index].answerSheet !==
          undefined &&
        state.selectedQuiz.answer_sheets[props.index].answerSheet !== '' && (
          <img
            style={{width: 100}}
            src={state.selectedQuiz.answer_sheets[props.index].answerSheet}
          />
        )}
      {props.index !== undefined &&
        state.selectedQuiz.answer_sheets[props.index]
          .answerSheetAfterCorrection !== undefined &&
        state.selectedQuiz.answer_sheets[props.index]
          .answerSheetAfterCorrection !== '' && (
          <img
            src={
              state.selectedQuiz.answer_sheets[props.index]
                .answerSheetAfterCorrection
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
              state.selectedQuiz.answer_sheets[props.index].answers[index];
            return elem;
          });
          dispatch({
            wanted_answer_sheet: data,
            new_std_answer_sheet: state.selectedQuiz.answer_sheets[
              props.index
            ].answers.map(elem => {
              return elem;
            }),
          });
          props.setSelectedAnswerSheetIdx(props.index);
        }}
        theme={'dark'}
        title={'وارد کردن پاسخ ها'}
      />
      {state.selectedQuiz.answer_sheets[props.index].answerSheet !==
        undefined &&
        state.selectedQuiz.answer_sheets[props.index].answerSheet !== '' && (
          <CommonButton
            onPress={async () => {
              props.setLoading(true);
              let res = await correct(
                state.selectedQuiz.id,
                props.answerSheet.student.id,
                props.token,
              );
              props.setLoading(false);
              if (res !== null) {
                state.selectedQuiz.answer_sheets[
                  props.index
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
