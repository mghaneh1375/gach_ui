import React from 'react';

const defaultGlobalState = {
  packages: undefined,
  tags: undefined,
  selectedQuiz: undefined,
  quizzes: undefined,
  needUpdate: false,
  needSorting: false,
};

export const quizContext = React.createContext(defaultGlobalState);
export const dispatchQuizContext = React.createContext(undefined);

export const QuizProvider = ({children}) => {
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

  React.useEffect(() => {
    if (
      !state.needUpdate ||
      state.quizzes === undefined ||
      state.selectedQuiz === undefined
    )
      return;

    dispatch({needUpdate: false});
    const updateQuiz = () => {
      dispatch({
        quizzes: state.quizzes.map(elem => {
          if (elem.id !== state.selectedQuiz.id) return elem;
          return state.selectedQuiz;
        }),
      });
    };

    if (state.selectedQuiz === undefined) return;

    updateQuiz();
  }, [state.selectedQuiz, state.quizzes, state.needUpdate, dispatch]);

  return (
    <quizContext.Provider value={state}>
      <dispatchQuizContext.Provider value={dispatch}>
        {children}
      </dispatchQuizContext.Provider>
    </quizContext.Provider>
  );
};
