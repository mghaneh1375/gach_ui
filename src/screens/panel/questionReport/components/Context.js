import React from 'react';

const defaultGlobalState = {
  tags: undefined,
};
export const questionReportContext = React.createContext(defaultGlobalState);
export const dispatchQuestionReportContext = React.createContext(undefined);

export const QuestionReportProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  return (
    <questionReportContext.Provider value={state}>
      <dispatchQuestionReportContext.Provider value={dispatch}>
        {children}
      </dispatchQuestionReportContext.Provider>
    </questionReportContext.Provider>
  );
};
