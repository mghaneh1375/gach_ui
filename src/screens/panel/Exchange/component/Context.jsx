import React from 'react';

const defaultGlobalState = {
  exchanges: undefined,
  actions: undefined,
  needUpdate: false,
  selectedExchange: undefined,
};
export const exchangeContext = React.createContext(defaultGlobalState);
export const dispatchExchangeContext = React.createContext(undefined);

export const ExchangeProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  React.useEffect(() => {
    if (state.exchanges === undefined || state.selectedExchange === undefined)
      return;
    if (state.needUpdate === undefined || !state.needUpdate) return;

    dispatch({needUpdate: false});
    const updateExchange = () => {
      dispatch({
        exchanges: state.exchanges.map(elem => {
          if (elem.id === state.selectedExchange.id)
            return state.selectedExchange;
          return elem;
        }),
      });
    };

    if (state.selectedExchange === undefined) return;

    updateExchange();
  }, [state.needUpdate, state.exchanges, state.selectedExchange, dispatch]);

  return (
    <exchangeContext.Provider value={state}>
      <dispatchExchangeContext.Provider value={dispatch}>
        {children}
      </dispatchExchangeContext.Provider>
    </exchangeContext.Provider>
  );
};
