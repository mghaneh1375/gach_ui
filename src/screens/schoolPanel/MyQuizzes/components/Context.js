import React from 'react';

const defaultGlobalState = {
  quizzes: undefined,
  selectedQuiz: undefined,
  needUpdateQuiz: false,
};

export const myQuizzesContext = React.createContext(defaultGlobalState);
export const dispatchMyQuizzesContext = React.createContext(undefined);

export const MyQuizzesProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  const setQuiz = React.useCallback(() => {
    if (state.selectedQuiz === undefined) {
      dispatch({needUpdateQuiz: false});
      return;
    }

    dispatch({
      quizzes: state.quizzes.map(elem => {
        if (elem.id === state.selectedQuiz.id) return state.selectedQuiz;
        return elem;
      }),
      needUpdateQuiz: false,
    });
  }, [state.quizzes, state.selectedQuiz]);

  React.useEffect(() => {
    if (!state.needUpdateQuiz) return;
    setQuiz();
  }, [state.needUpdateQuiz, setQuiz]);

  return (
    <myQuizzesContext.Provider value={state}>
      <dispatchMyQuizzesContext.Provider value={dispatch}>
        {children}
      </dispatchMyQuizzesContext.Provider>
    </myQuizzesContext.Provider>
  );
};
