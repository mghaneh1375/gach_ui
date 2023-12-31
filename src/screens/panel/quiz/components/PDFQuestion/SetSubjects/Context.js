import React from 'react';

const defaultGlobalState = {
  grades: undefined,
  currLesson: undefined,
  currGrade: undefined,
};
export const setSubjectContext = React.createContext(defaultGlobalState);
export const dispatchSetSubjectContext = React.createContext(undefined);

export const SetSubjectProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  return (
    <setSubjectContext.Provider value={state}>
      <dispatchSetSubjectContext.Provider value={dispatch}>
        {children}
      </dispatchSetSubjectContext.Provider>
    </setSubjectContext.Provider>
  );
};
