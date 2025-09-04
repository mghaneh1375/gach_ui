import React from 'react';

const defaultGlobalState = {
  selectedStudent: undefined,
  needUpdate: false,
  schedules: undefined,
  fetchedInfos: [],
};
export const advicePanelContext = React.createContext(defaultGlobalState);
export const dispatchAdvicePanelContext = React.createContext(undefined);

export const AdvicePanelProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  return (
    <advicePanelContext.Provider value={state}>
      <dispatchAdvicePanelContext.Provider value={dispatch}>
        {children}
      </dispatchAdvicePanelContext.Provider>
    </advicePanelContext.Provider>
  );
};
