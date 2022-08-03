import React from 'react';

const defaultGlobalState = {
  packages: undefined,
  tags: undefined,
  selectedQuiz: undefined,
  quizzes: undefined,
  needUpdate: false,
};

export const quizContext = React.createContext(defaultGlobalState);
export const dispatchQuizContext = React.createContext(undefined);

export const QuizProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

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
