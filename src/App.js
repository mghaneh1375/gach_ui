import React, {useCallback} from 'react';
import {Platform, LogBox} from 'react-native';
import {fetchUser, getToken, getUser} from './API/User';
import {Device} from './models/Device';

import AppRouter from './router/app/Router';
import WebRouter from './router/web/Router';
import {getDevice} from './services/Utility';

const defaultGlobalState = {
  showBottonNav: true,
  showTopNav: true,
  loading: false,
  isRightMenuVisible: false,
  isFilterMenuVisible: false,
  page: undefined,
  allowRenderPage: false,
  token: undefined,
  user: undefined,
};

export const globalStateContext = React.createContext(defaultGlobalState);
export const dispatchStateContext = React.createContext(undefined);

const excludeRightMenu = ['login', 'home', 'reviewQuiz', 'startQuiz'];
const excludeTopNav = ['login', 'profile'];
const excludeBottomNav = ['login'];
const d = getDevice();

const excludeAuthRoutes = ['login', 'home', 'buy', 'allSchools', 'rankingList'];

const GlobalStateProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({...state, ...newValue}),
    defaultGlobalState,
  );

  const doFetchUser = React.useCallback(() => {
    Promise.all([getToken(), getUser()]).then(async res => {
      dispatch({token: res[0]});
      let token = res[0];

      if (token !== null && token !== undefined) {
        if (res[1] !== null && res[1] !== undefined) {
          dispatch({user: res[1] === undefined ? null : res[1]});
          return;
        }
      }

      fetchUser(token, user => {
        dispatch({user: user === undefined ? null : user});
      });
    });
  }, [dispatch]);

  React.useEffect(() => {
    if (state.user !== undefined) return;
    doFetchUser();
  }, [state.user, doFetchUser]);

  React.useEffect(() => {
    if (state.page === undefined || state.user === undefined) return;
    console.log(state.page);
    if (state.user === null && excludeAuthRoutes.indexOf(state.page) === -1) {
      window.location.href = '/login';
      return;
    }
    dispatch({
      showTopNav: excludeTopNav.indexOf(state.page) === -1,
      showBottonNav: excludeBottomNav.indexOf(state.page) === -1,
      isRightMenuVisible:
        d.indexOf(Device.Large) !== -1 &&
        excludeRightMenu.indexOf(state.page) === -1 &&
        state.user !== null &&
        state.user !== undefined,
    });
  }, [state.page, state.user]);

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
