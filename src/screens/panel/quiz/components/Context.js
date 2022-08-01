import React from 'react';

const defaultGlobalState = {
  packages: undefined,
  tags: undefined,
  selectedQuiz: undefined,
  quizzes: undefined,
};

export const quizContext = React.createContext(defaultGlobalState);
export const dispatchQuizContext = React.createContext(undefined);

export const QuizProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  return (
    <quizContext.Provider value={state}>
      <dispatchQuizContext.Provider value={dispatch}>
        {children}
      </dispatchQuizContext.Provider>
    </quizContext.Provider>
  );
};
