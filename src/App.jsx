import React, {useState} from 'react';
import {LogBox} from 'react-native';
import {fetchUser, getToken, getUser} from './api/user';
import WebRouter from './router/web/Router.jsx';
import {ThemeProvider} from 'styled-components';
import vars from './styles/root';

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
  isInPhone: false,
  theme: 'dark',
};

export const globalStateContext = React.createContext(defaultGlobalState);
export const dispatchStateContext = React.createContext(undefined);

const excludeRightMenu = [
  'login',
  'home',
  'reviewQuiz',
  'showAnswerSheet',
  'startQuiz',
  'rankingList',
  'allSchools',
  'chatRoom',
];
const excludeTopNav = ['login', 'profile', 'rankingList', 'allSchools', 'buy'];
const excludeBottomNav = ['login'];

const excludeAuthRoutes = [
  'login',
  'home',
  'buy',
  'packages',
  'allSchools',
  'rankingList',
  'karname',
  'ranking',
  'validateCert',
  'myCerts',
  'advisors',
];

const hasLeftFilterRoutes = ['buy', 'package'];

const GlobalStateProvider = ({children}) => {
  const [state, dispatch] = React.useReducer(
    (state, newValue) => ({
      ...state,
      ...newValue,
    }),
    defaultGlobalState,
  );

  const doFetchUser = React.useCallback(() => {
    Promise.all([getToken(), getUser()]).then(async res => {
      dispatch({
        token: res[0],
      });
      const token = res[0];
      if (token !== null && token !== undefined) {
        if (res[1] !== null && res[1] !== undefined) {
          dispatch({
            user: res[1] === undefined ? null : res[1],
          });
          return;
        }
      }

      fetchUser(token, user => {
        dispatch({
          user: user === undefined ? null : user,
        });
      });
    });
  }, [dispatch]);

  React.useEffect(() => {
    if (state.user !== undefined) return;
    doFetchUser();
  }, [state.user, doFetchUser]);

  const size = useWindowSize();

  React.useEffect(() => {
    dispatch({
      isInPhone: size.width < 768,
    });
  }, [size]);

  // Hook
  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    React.useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      // Add event listener
      window.addEventListener('resize', handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }

  React.useEffect(() => {
    if (
      state.page === undefined ||
      state.user === undefined ||
      state.isInPhone === undefined
    )
      return;
    if (state.user === null && excludeAuthRoutes.indexOf(state.page) === -1) {
      window.location.href = '/login';
      return;
    }
    dispatch({
      showTopNav: excludeTopNav.indexOf(state.page) === -1,
      showBottonNav: excludeBottomNav.indexOf(state.page) === -1,
      isFilterMenuVisible: hasLeftFilterRoutes.indexOf(state.page) !== -1,
      isRightMenuVisible:
        !state.isInPhone &&
        excludeRightMenu.indexOf(state.page) === -1 &&
        state.user !== null &&
        !state.user,
    });
  }, [state.page, state.user, state.isInPhone]);

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

const lightTheme = {
  components: {
    button: {
      colors: {
        primary: vars.ORANGE,
      },
    },
    menu: {
      spaces: {
        padding: 7,
        subItemPadding: 5,
        subItemPaddingRight: 35,
      },
      colors: {
        text: vars.LIGHT_SILVER,
        background: vars.WHITE,
        selected: vars.ORANGE,
        hover: vars.BLACK,
        icon: '#4D4354',
      },
    },
  },
  colors: {
    background: {
      primary: vars.WHITE,
      secondary: vars.WHITE,
      shadow: 'rgb(170, 170, 170)',
      modal: '#ffffff',
      card: '#ffffff',
    },
    primary: vars.LIGHT_SILVER,
    text: vars.DARK_BLUE,
    light: vars.LIGHT_SILVER,
  },
};

const darkTheme = {
  components: {
    button: {
      colors: {
        primary: vars.ORANGE,
      },
    },
    menu: {
      spaces: {
        padding: 7,
        subItemPadding: 5,
        subItemPaddingRight: 35,
      },
      colors: {
        text: 'rgb(152, 134, 165)',
        background: '#15051F',
        selected: '#492455',
        icon: 'rgb(152, 134, 165)',
        hover: vars.WHITE,
      },
    },
  },
  colors: {
    background: {
      primary: '#15051F',
      secondary: vars.DARK_BLUE_LIGHT,
      modal: '#292929',
      shadow: '#334d56',
      card: '#AC46BD',
    },
    primary: vars.DARK_BLUE,
    text: '#ffffff',
    light: '#ffffff',
  },
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage or system preference for initial value
    const saved = localStorage.getItem('darkMode');
    return saved !== undefined && saved !== null
      ? saved === true || saved === 'true'
      : false;
  });

  const theme = isDarkMode ? darkTheme : lightTheme;

  // Save theme preference to localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--menu-text-color',
      theme.components.menu.colors.text,
    );
    document.documentElement.style.setProperty(
      '--menu-background-color',
      theme.components.menu.colors.background,
    );
    document.documentElement.style.setProperty(
      '--menu-selected-color',
      theme.components.menu.colors.selected,
    );
    document.documentElement.style.setProperty(
      '--menu-hover-color',
      theme.components.menu.colors.hover,
    );
  }, [theme]);

  return (
    <GlobalStateProvider>
      <ThemeProvider theme={theme}>
        <WebRouter />
      </ThemeProvider>
    </GlobalStateProvider>
  );
}
