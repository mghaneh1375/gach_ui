import React from 'react';

const defaultGlobalState = {
  schedules: undefined,
  needUpdate: false,
  selectedSchedule: undefined,
  myStudents: undefined,
};

export const teachScheduleContext = React.createContext(defaultGlobalState);
export const dispatchTeachScheduleContext = React.createContext(undefined);

export const TeachScheduleProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  return (
    <teachScheduleContext.Provider value={state}>
      <dispatchTeachScheduleContext.Provider value={dispatch}>
        {children}
      </dispatchTeachScheduleContext.Provider>
    </teachScheduleContext.Provider>
  );
};
