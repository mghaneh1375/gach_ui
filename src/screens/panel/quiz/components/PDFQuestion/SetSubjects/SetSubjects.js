import React from 'react';
import {getGradesAndBranches, getPDFQuizInfo} from '../../Utility';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
} from '../../../../../../styles/Common';
import translator from '../../../Translator';
import EachQuestion from './EachQuestion';
import {showError, showSuccess} from '../../../../../../services/Utility';
import {generalRequest} from '../../../../../../API/Utility';
import {routes} from '../../../../../../API/APIRoutes';
import {dispatchSetSubjectContext, setSubjectContext} from './Context';

export default function SetSubjects({
  state,
  dispatch,
  setLoading,
  token,
  setMode,
}) {
  const [questions, setQuestions] = React.useState();

  const useGlobalState = () => [
    React.useContext(setSubjectContext),
    React.useContext(dispatchSetSubjectContext),
  ];
  const [localState, localDispatch] = useGlobalState();
  const [isWorking, setIsWorking] = React.useState(false);

  React.useEffect(() => {
    if (state.selectedQuiz.info === undefined) return;

    const questionsTmp = [];
    if (state.selectedQuiz.info.subjects.length === 0) {
      for (let i = 0; i < state.selectedQuiz.qNo; i++)
        questionsTmp.push({
          qNo: i,
          mark: 3,
          choicesCount: 4,
          ans: undefined,
          subject: undefined,
        });
    } else {
      for (let i = 0; i < state.selectedQuiz.info.subjects.length; i++) {
        questionsTmp.push({
          qNo: i,
          mark: state.selectedQuiz.info.marks[i],
          choicesCount: state.selectedQuiz.info.choicesCounts[i],
          ans: state.selectedQuiz.info.answers[i],
          subject: state.selectedQuiz.info.subjects[i],
          lesson: state.selectedQuiz.info.lessons[i],
          grade: state.selectedQuiz.info.grades[i],
        });
      }
    }

    setQuestions(questionsTmp);
  }, [state.selectedQuiz.info, state.selectedQuiz.qNo]);

  React.useEffect(() => {
    if (isWorking || state.selectedQuiz.info !== undefined) return;

    setIsWorking(true);
    setLoading(true);
    Promise.all([
      getPDFQuizInfo(token, state.selectedQuiz.id),
      getGradesAndBranches(token, state.selectedQuiz.id),
    ]).then(res => {
      setLoading(false);

      if (res[0] !== null && res[1] !== null) {
        state.selectedQuiz.info = res[0];
        localDispatch({
          grades: res[1],
        });

        dispatch({
          selectedQuiz: state.selectedQuiz,
          needUpdate: true,
        });
      } else setMode('list');

      setIsWorking(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.selectedQuiz]);

  return (
    <CommonWebBox
      header={translator.subjects}
      btn={
        <PhoneView>
          <CommonButton
            onPress={async () => {
              let errText = '';
              questions.forEach(e => {
                if (
                  e.mark === undefined ||
                  e.ans === undefined ||
                  e.subject === undefined ||
                  e.choicesCount === undefined
                ) {
                  if (errText === '') errText += e.qNo + 1;
                  else errText += ' - ' + (e.qNo + 1);
                }
              });
              if (errText.length > 0) {
                showError(
                  'لطفا تمام اطلاعات مربوط به سوال/سوالات ' +
                    errText +
                    ' را وارد نمایید',
                );
                return;
              }

              setLoading(true);
              let response = await generalRequest(
                routes.setPDFQuizInfo + state.selectedQuiz.id,
                'put',
                {info: questions},
                undefined,
                token,
              );
              setLoading(false);

              if (response != null) {
                state.selectedQuiz.subjects = undefined;
                dispatch({selectedQuiz: state.selectedQuiz});
                showSuccess();
              }
            }}
            theme={'dark'}
            title={'تایید و ثبت'}
          />
        </PhoneView>
      }>
      {questions !== undefined &&
        localState.grades !== undefined &&
        questions.map((itr, index) => {
          return (
            <EachQuestion
              key={index}
              question={itr}
              setQuestion={newItem => {
                setQuestions(
                  questions.map(e => {
                    if (e.qNo === index) return newItem;
                    return e;
                  }),
                );
              }}
              setLoading={setLoading}
            />
          );
        })}
    </CommonWebBox>
  );
}
