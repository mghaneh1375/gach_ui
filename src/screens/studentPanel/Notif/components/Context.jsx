import React from 'react';

const defaultGlobalState = {
  notifs: undefined,
};
export const publicNotifContext = React.createContext(defaultGlobalState);
export const dispatchPublicNotifContext = React.createContext(undefined);

export const PublicNotifProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  return (
    <publicNotifContext.Provider value={state}>
      <dispatchPublicNotifContext.Provider value={dispatch}>
        {children}
      </dispatchPublicNotifContext.Provider>
    </publicNotifContext.Provider>
  );
};
