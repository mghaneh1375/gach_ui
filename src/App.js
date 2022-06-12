import React, {useState} from 'react';
import {Platform, View} from 'react-native';

import AppRouter from './router/app/Router';
import WebRouter from './router/web/Router';

const defaultGlobalState = {
  showBottonNav: true,
  token: undefined,
};

export const globalStateContext = React.createContext(defaultGlobalState);
export const dispatchStateContext = React.createContext(undefined);

const GlobalStateProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );
  return (
    <globalStateContext.Provider value={state}>
      <dispatchStateContext.Provider value={dispatch}>
        {children}
      </dispatchStateContext.Provider>
    </globalStateContext.Provider>
  );
};

export default function App() {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    return (
      <GlobalStateProvider>
        <View style={{flex: 1, height: '100%'}}>
          <AppRouter />
        </View>
      </GlobalStateProvider>
    );
  }
  return <WebRouter />;
}
