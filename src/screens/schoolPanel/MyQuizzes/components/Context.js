import React from 'react';

const defaultGlobalState = {
  quizzes: undefined,
  selectedQuiz: undefined,
  needUpdate: false,
  needSorting: false,
  clearQuestions: false,
};

export const myQuizzesContext = React.createContext(defaultGlobalState);
export const dispatchMyQuizzesContext = React.createContext(undefined);

export const MyQuizzesProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  const sorting = React.useCallback(() => {
    function compare(a, b) {
      if (a.no < b.no) {
        return -1;
      }
      if (a.no > b.no) {
        return 1;
      }
      return 0;
    }

    let wantedQuestion = state.selectedQuiz.questions.find(
      elem => elem.id === state.selectedQuestionId,
    );
    const oldQNo = wantedQuestion.no;
    if (oldQNo === state.newWantedNo) return;
    let newQuestions;

    if (oldQNo < state.newWantedNo) {
      newQuestions = state.selectedQuiz.questions.map(elem => {
        if (elem.no > oldQNo && elem.no <= state.newWantedNo) {
          elem.no = elem.no - 1;
        }
        return elem;
      });
    } else {
      newQuestions = state.selectedQuiz.questions.map(elem => {
        if (elem.no < oldQNo && elem.no >= state.newWantedNo) {
          elem.no = elem.no + 1;
        }
        return elem;
      });
    }

    wantedQuestion.no = state.newWantedNo;

    newQuestions.sort(compare);

    state.selectedQuiz.questions = newQuestions;
    dispatch({
      needSorting: false,
      selectedQuiz: state.selectedQuiz,
      needUpdate: true,
    });
  }, [state.selectedQuestionId, state.selectedQuiz, state.newWantedNo]);

  React.useEffect(() => {
    if (state.needSorting === undefined || !state.needSorting) return;
    sorting();
  }, [state.needSorting, sorting]);

  const setQuiz = React.useCallback(() => {
    if (state.selectedQuiz === undefined) {
      dispatch({needUpdate: false});
      return;
    }

    dispatch({
      quizzes: state.quizzes.map(elem => {
        if (elem.id === state.selectedQuiz.id) return state.selectedQuiz;
        return elem;
      }),
      needUpdate: false,
    });
  }, [state.quizzes, state.selectedQuiz]);

  React.useEffect(() => {
    if (!state.needUpdate) return;
    setQuiz();
  }, [state.needUpdate, setQuiz]);

  const doClearQuestions = React.useCallback(() => {
    if (state.selectedQuiz === undefined) return;
    state.selectedQuiz.questions = state.newQuestions;
    state.selectedQuiz.recp = undefined;
    dispatch({
      selectedQuiz: state.selectedQuiz,
      clearQuestions: false,
      newQuestions: undefined,
      quizzes: state.quizzes.map(elem => {
        if (elem.id === state.selectedQuiz.id) return state.selectedQuiz;
        return elem;
      }),
    });
  }, [state.selectedQuiz, state.quizzes, state.newQuestions, dispatch]);

  React.useEffect(() => {
    if (!state.clearQuestions) return;
    doClearQuestions();
  }, [state.clearQuestions, doClearQuestions]);

  return (
    <myQuizzesContext.Provider value={state}>
      <dispatchMyQuizzesContext.Provider value={dispatch}>
        {children}
      </dispatchMyQuizzesContext.Provider>
    </myQuizzesContext.Provider>
  );
};
