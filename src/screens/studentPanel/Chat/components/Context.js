import React from 'react';

const defaultGlobalState = {
  sideBarRowIds: undefined,
  notReadMessageInfo: undefined,
};
export const chatContext = React.createContext(defaultGlobalState);
export const dispatchChatContext = React.createContext(undefined);

export const ChatProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  return (
    <chatContext.Provider value={state}>
      <dispatchChatContext.Provider value={dispatch}>
        {children}
      </dispatchChatContext.Provider>
    </chatContext.Provider>
  );
};
