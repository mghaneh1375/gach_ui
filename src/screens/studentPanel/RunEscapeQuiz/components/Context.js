import React from 'react';
import {showError, showSuccess} from '../../../../services/Utility';
import {doSaveAnswer} from './Utility';

const defaultGlobalState = {
  questions: undefined,
  answers: undefined,
  quizInfo: undefined,
  currIdx: 0,
  needUpdate: false,
  needUpdateAnswer: false,
  reminder: undefined,
  refresh: undefined,
  clearTimer: false,
  exit: false,
  needRanking: false,
  ranking: undefined,
  lastFetchedAt: undefined,
  showExitConfirmation: false,
  imSureExit: false,
};

export const doQuizContext = React.createContext(defaultGlobalState);
export const dispatchDoQuizContext = React.createContext(undefined);

export const DoQuizProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  const setAnswer = React.useCallback(() => {
    if (
      state.currIdx === undefined ||
      state.currIdx < 0 ||
      state.answer === undefined
    ) {
      dispatch({needUpdateAnswer: false});
      return;
    }

    state.setLoadingWithText(true);

    Promise.all([
      doSaveAnswer(
        state.answer,
        state.quizInfo.id,
        state.questions[state.currIdx].id,
        state.token,
      ),
    ]).then(res => {
      state.setLoadingWithText(false);
      if (res[0] === null) {
        dispatch({
          needUpdateAnswer: false,
        });
        return;
      }

      if (res[0].reminder < 0) {
        window.location.href = '/myIRYSCQuizzes';
        return;
      }

      state.answers[state.currIdx] = state.answer;
      if (res[0].isCorrect) {
        if (state.currIdx === state.questions.length - 1) {
          window.location.href = '/myIRYSCQuizzes';
          return;
        }
        showSuccess('آفرین، حالا برو سراغ سوال بعد');
        dispatch({
          reminder: res[0].reminder,
          clearTimer: true,
          answers: state.answers,
          needUpdateAnswer: false,
          currIdx: state.currIdx + 1,
        });
      } else {
        showError('دقت کن، پاسخی که دادی صحیح نبود');
        dispatch({
          reminder: res[0].reminder,
          clearTimer: true,
          answers: state.answers,
          needUpdateAnswer: false,
        });
      }
    });
  }, [state]);

  const updateQuestion = React.useCallback(() => {
    if (state.question === undefined || state.questions === undefined) {
      dispatch({needUpdate: false});
      return;
    }
    let newQuestions = state.questions.map(elem => {
      if (elem.id !== state.question.id) return elem;
      return state.question;
    });

    dispatch({questions: newQuestions, needUpdate: false});
  }, [state.question, state.questions]);

  React.useEffect(() => {
    if (!state.needUpdate) return;
    updateQuestion();
  }, [state.needUpdate, updateQuestion]);

  React.useEffect(() => {
    if (!state.needUpdateAnswer) return;
    setAnswer();
  }, [state.needUpdateAnswer, setAnswer]);

  React.useEffect(() => {
    if (!state.exit) return;
    dispatch({showExitConfirmation: true});
  }, [state.exit, dispatch]);

  React.useEffect(() => {
    if (!state.imSureExit) return;
    window.location.href = '/myIRYSCQuizzes';
  }, [state.imSureExit]);

  React.useEffect(() => {
    if (state.clearTimer) dispatch({clearTimer: false});
  }, [state.clearTimer]);

  return (
    <doQuizContext.Provider value={state}>
      <dispatchDoQuizContext.Provider value={dispatch}>
        {children}
      </dispatchDoQuizContext.Provider>
    </doQuizContext.Provider>
  );
};
