import React from 'react';

const defaultGlobalState = {
  myClasses: {
    all: undefined,
    old: undefined,
    future: undefined,
  },
  selectedScheduleId: undefined,
};

export const myTeachClassesContext = React.createContext(defaultGlobalState);
export const dispatchMyTeachClassesContext = React.createContext(undefined);

export const MyTeachClassesForStudentProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  return (
    <myTeachClassesContext.Provider value={state}>
      <dispatchMyTeachClassesContext.Provider value={dispatch}>
        {children}
      </dispatchMyTeachClassesContext.Provider>
    </myTeachClassesContext.Provider>
  );
};
