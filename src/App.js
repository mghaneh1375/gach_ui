import React from 'react';
import {Platform, View, LogBox} from 'react-native';

import AppRouter from './router/app/Router';
import WebRouter from './router/web/Router';

const defaultGlobalState = {
  showBottonNav: true,
  showTopNav: true,
  loading: false,
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

const ignoreWarns = [
  'Setting a timer for a long period of time',
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
  'ViewPropTypes will be removed',
  'AsyncStorage has been extracted from react-native',
  'EventEmitter.removeListener',
];
const warn = console.warn;
console.warn = (...arg) => {
  for (let i = 0; i < ignoreWarns.length; i++) {
    if (arg[0].startsWith(ignoreWarns[i])) return;
  }
  warn(...arg);
};

LogBox.ignoreLogs(ignoreWarns);

export default function App() {
  if (Platform.OS === 'ios' || Platform.OS === 'android') {
    return (
      <GlobalStateProvider>
        <AppRouter />
      </GlobalStateProvider>
    );
  }
  return (
    <GlobalStateProvider>
      <WebRouter />
    </GlobalStateProvider>
  );
}
