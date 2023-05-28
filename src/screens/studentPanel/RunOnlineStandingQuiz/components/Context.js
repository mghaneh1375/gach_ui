import React from 'react';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {showSuccess} from '../../../../services/Utility';
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
      showSuccess();

      dispatch({
        reminder: res[0].reminder,
        clearTimer: true,
        answers: state.answers,
        needUpdateAnswer: false,
      });
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

  const fetchRanking = React.useCallback(() => {
    if (state.quizInfo === undefined) {
      dispatch({needRanking: false});
      return;
    }

    Promise.all([
      generalRequest(
        routes.getOnlineQuizRankingTable + state.quizInfo.id,
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      if (res != null)
        dispatch({
          needRanking: false,
          ranking: res[0].ranking,
          reminder: res[0].reminder,
          clearTimer: true,
          lastFetchedAt: res[0].now,
        });
      else dispatch({needRanking: false});
    });
  }, [state.quizInfo, state.token]);

  React.useEffect(() => {
    if (!state.needUpdate) return;
    updateQuestion();
  }, [state.needUpdate, updateQuestion]);

  React.useEffect(() => {
    if (!state.needUpdateAnswer) return;
    setAnswer();
  }, [state.needUpdateAnswer, setAnswer]);

  React.useEffect(() => {
    if (!state.needRanking) return;
    fetchRanking();
  }, [state.needRanking, fetchRanking]);

  React.useEffect(() => {
    if (!state.exit) return;

    window.location.href = '/myIRYSCQuizzes';
  }, [state.exit]);

  React.useEffect(() => {
    if (state.clearTimer) dispatch({clearTimer: false});
  }, [state.clearTimer]);

  React.useEffect(() => {
    if (state.quizInfo !== undefined && state.ranking === undefined)
      fetchRanking();
  }, [state.quizInfo, state.ranking, fetchRanking]);

  return (
    <doQuizContext.Provider value={state}>
      <dispatchDoQuizContext.Provider value={dispatch}>
        {children}
      </dispatchDoQuizContext.Provider>
    </doQuizContext.Provider>
  );
};
