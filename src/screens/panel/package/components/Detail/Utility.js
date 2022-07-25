import React from 'react';

const defaultGlobalState = {
  selectingQuiz: false,
  quizzes: undefined,
  registrableQuizzes: undefined,
};
export const quizzesContext = React.createContext(defaultGlobalState);
export const dispatchQuizzesContext = React.createContext(undefined);

export const QuizzesProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );
  return (
    <quizzesContext.Provider value={state}>
      <dispatchQuizzesContext.Provider value={dispatch}>
        {children}
      </dispatchQuizzesContext.Provider>
    </quizzesContext.Provider>
  );
};
