import React from 'react';
import {doSaveAnswers} from './Utility';

const defaultGlobalState = {
  questions: undefined,
  answers: undefined,
  file: undefined,
  quizInfo: undefined,
  needUpdate: false,
  reminder: undefined,
  refresh: undefined,
  clearTimer: false,
  exit: false,
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

  React.useEffect(() => {
    if (!state.needStore) return;
    saveAnswers();
  }, [state.needStore, saveAnswers]);

  React.useEffect(() => {
    if (!state.exit) return;
    dispatch({showExitConfirmation: true});
  }, [state.exit, dispatch]);

  React.useEffect(() => {
    if (!state.imSureExit) return;
    saveAnswersWithExit();
  }, [state.imSureExit, saveAnswersWithExit]);

  const saveAnswers = React.useCallback(() => {
    state.setLoadingWithText(true);

    Promise.all([
      doSaveAnswers(
        {
          answers: state.answers,
        },
        state.quizInfo.id,
        state.quizInfo.generalMode,
        state.token,
      ),
    ]).then(res => {
      state.setLoadingWithText(false);
      if (res[0] === null) {
        state.navigate = '/';
        return;
      }

      if (res[0].reminder < 0) {
        window.location.href =
          state.quizInfo.generalMode === 'custom'
            ? '/myCustomQuizzes'
            : state.quizInfo.generalMode === 'school'
            ? '/dashboard'
            : '/myIRYSCQuizzes';

        return;
      }

      dispatch({
        reminder: res[0].reminder,
        refresh: res[0].refresh,
        needStore: false,
        clearTimer: true,
      });
    });
  }, [state]);

  const saveAnswersWithExit = React.useCallback(() => {
    state.setLoadingWithText(true);

    Promise.all([
      doSaveAnswers(
        {
          answers: state.answers,
        },
        state.quizInfo.id,
        state.quizInfo.generalMode,
        state.token,
      ),
    ]).then(res => {
      state.setLoadingWithText(false);

      if (res[0] !== null)
        window.location.href =
          state.quizInfo.generalMode === 'custom'
            ? '/myCustomQuizzes'
            : state.quizInfo.generalMode === 'school'
            ? '/dashboard'
            : '/myIRYSCQuizzes';
    });
  }, [state]);

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
