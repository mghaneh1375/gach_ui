import React from 'react';

const defaultGlobalState = {
  examTags: undefined,
  liftStyleTags: undefined,
  myLifeStyle: undefined,
};
export const scheduleContext = React.createContext(defaultGlobalState);
export const dispatchScheduleContext = React.createContext(undefined);

export const ScheduleProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  return (
    <scheduleContext.Provider value={state}>
      <dispatchScheduleContext.Provider value={dispatch}>
        {children}
      </dispatchScheduleContext.Provider>
    </scheduleContext.Provider>
  );
};
