import React from 'react';
import StudentAnswerSheet from '../../../../panel/quiz/components/AnswerSheet/StudentAnswerSheet';
import {
  dispatchQuizContext,
  quizContext,
} from '../../../../panel/quiz/components/Context';

function AnswerSheet(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];

  const [state, dispatch] = useGlobalState();
  return (
    <>
      <StudentAnswerSheet
        selectedAnswerSheetIdx={props.selectedAnswerSheetIdx}
        setLoading={props.setLoading}
        onBackClick={props.onBackClick}
        token={props.token}
        state={state}
        dispatch={dispatch}
      />
    </>
  );
}

export default AnswerSheet;
