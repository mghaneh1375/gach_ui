import React from 'react';
import {doSaveAnswers} from './Utility';

const defaultGlobalState = {
  questions: undefined,
  answers: undefined,
  bookmarks: [],
  quizInfo: undefined,
  currIdx: 0,
  needUpdate: false,
  needUpdateBookmarks: false,
  needUpdateAnswer: false,
  reminder: undefined,
  refresh: undefined,
  clearTimer: false,
};

export const doQuizContext = React.createContext(defaultGlobalState);
export const dispatchDoQuizContext = React.createContext(undefined);

export const DoQuizProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  const setBookmark = React.useCallback(() => {
    if (
      state.currIdx === undefined ||
      state.currIdx < 0 ||
      state.bookmarkStatus === undefined
    ) {
      dispatch({needUpdateBookmarks: false});
      return;
    }

    state.bookmarks[state.currIdx] = state.bookmarkStatus;

    dispatch({bookmarks: state.bookmarks, needUpdateBookmarks: false});
  }, [state.currIdx, state.bookmarkStatus, state.bookmarks]);

  const setAnswer = React.useCallback(() => {
    if (
      state.currIdx === undefined ||
      state.currIdx < 0 ||
      state.answer === undefined
    ) {
      dispatch({needUpdateAnswer: false});
      return;
    }

    state.answers[state.currIdx] = state.answer;

    dispatch({answers: state.answers, needUpdateAnswer: false});
  }, [state.currIdx, state.answer, state.answers]);

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
    if (!state.needUpdateBookmarks) return;
    setBookmark();
  }, [state.needUpdateBookmarks, setBookmark]);

  React.useEffect(() => {
    if (!state.needStore) return;
    saveAnswers();
  }, [state.needStore, saveAnswers]);

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

      dispatch({
        reminder: res[0].reminder,
        refresh: 3,
        needStore: false,
        clearTimer: true,
      });
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
