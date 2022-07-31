import React from 'react';
const defaultGlobalState = {
  quiz: undefined,
  quizMode: undefined,
  quizId: undefined,
  questions: undefined,
  answerSheet: undefined,
};

export const answerSheetContext = React.createContext(defaultGlobalState);
export const dispatchAnswerSheetContext = React.createContext(undefined);

export const AnswerSheetProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );
  return (
    <answerSheetContext.Provider value={state}>
      <dispatchAnswerSheetContext.Provider value={dispatch}>
        {children}
      </dispatchAnswerSheetContext.Provider>
    </answerSheetContext.Provider>
  );
};
