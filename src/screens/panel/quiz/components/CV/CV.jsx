import React, {useState} from 'react';
import {CommonWebBox, PhoneView, MyView} from '../../../../../styles/Common';
import {getAnswerSheets} from '../Utility';
import Card from './Card';
import translator from '../../Translator';

import StudentAnswerSheet from '../AnswerSheet/StudentAnswerSheet';

function CV({setMode, setLoading, token, state, dispatch}) {
  const [isWorking, setIsWorking] = useState(false);
  const [showAnswerSheet, setShowAnswerSheet] = useState(false);
  const [selectedAnswerSheetIdx, setSelectedAnswerSheetIdx] = useState();

  React.useEffect(() => {
    if (selectedAnswerSheetIdx === undefined) return;

    dispatch({
      showAnswers: true,
      showStdAnswers: true,
      allowChangeStdAns: false,
      allowChangeAns: false,
    });

    setShowAnswerSheet(true);
  }, [selectedAnswerSheetIdx, dispatch]);

  React.useEffect(() => {
    if (!showAnswerSheet) {
      // setStdChangingMode(false);
      setSelectedAnswerSheetIdx(undefined);
      dispatch({
        wanted_answer_sheet: undefined,
        new_std_answer_sheet: undefined,
        showAnswers: undefined,
        showStdAnswers: undefined,
        allowChangeStdAns: undefined,
        allowChangeAns: undefined,
      });
    }
  }, [showAnswerSheet, dispatch]);

  React.useEffect(() => {
    if (isWorking || state.selectedQuiz.answer_sheets !== undefined) return;

    setIsWorking(true);
    setLoading(true);
    Promise.all([
      getAnswerSheets(
        state.selectedQuiz.id,
        state.selectedQuiz.generalMode,
        token,
      ),
    ]).then(res => {
      setLoading(false);

      if (res[0] !== null) {
        state.selectedQuiz.answer_sheet = res[0].answers;
        state.selectedQuiz.answer_sheets = res[0].students;
        dispatch({selectedQuiz: state.selectedQuiz, needUpdate: true});
      } else setMode('list');

      setIsWorking(false);
    });
  }, [isWorking, dispatch, state.selectedQuiz, token, setLoading, setMode]);

  return (
    <MyView>
      {showAnswerSheet && (
        <StudentAnswerSheet
          selectedAnswerSheetIdx={selectedAnswerSheetIdx}
          onBackClick={setShowAnswerSheet(false)}
          token={token}
          state={state}
          dispatch={dispatch}
        />
      )}
      {!showAnswerSheet && (
        <CommonWebBox
          header={translator.correntAnswerSheets}
          backBtn={true}
          onBackClick={() => setMode('list')}>
          <PhoneView>
            {state.selectedQuiz.answer_sheets !== undefined &&
              state.selectedQuiz.answer_sheets.map((elem, index) => {
                return (
                  <Card
                    setSelectedAnswerSheetIdx={setSelectedAnswerSheetIdx}
                    key={index}
                    token={token}
                    setLoading={setLoading}
                    index={index}
                    state={state}
                    dispatch={dispatch}
                    studentId={elem.student.id}
                  />
                );
              })}
          </PhoneView>
        </CommonWebBox>
      )}
    </MyView>
  );
}

export default CV;
