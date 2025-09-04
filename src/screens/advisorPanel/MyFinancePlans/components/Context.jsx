import React from 'react';

const defaultGlobalState = {
  data: undefined,
  needUpdate: false,
  selectedRow: undefined,
};

export const financeContext = React.createContext(defaultGlobalState);
export const dispatchFinanceContext = React.createContext(undefined);

export const FinanceProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  return (
    <financeContext.Provider value={state}>
      <dispatchFinanceContext.Provider value={dispatch}>
        {children}
      </dispatchFinanceContext.Provider>
    </financeContext.Provider>
  );
};
