import React from 'react';

const defaultGlobalState = {
  schedules: undefined,
  needUpdate: false,
  selectedSchedule: undefined,
  myStudents: undefined,
};

export const advisorScheduleContext = React.createContext(defaultGlobalState);
export const dispatchAdvisorScheduleContext = React.createContext(undefined);

export const AdvisorScheduleProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  return (
    <advisorScheduleContext.Provider value={state}>
      <dispatchAdvisorScheduleContext.Provider value={dispatch}>
        {children}
      </dispatchAdvisorScheduleContext.Provider>
    </advisorScheduleContext.Provider>
  );
};
