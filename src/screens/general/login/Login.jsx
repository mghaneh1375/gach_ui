import {dispatchStateContext, globalStateContext} from '@/App.jsx';
import {Device} from '@/models/device';
import {getDevice} from '@/services/utility';
import {TextIcon} from '@/styles/common/TextIcon.jsx';
import {
  commonStyles,
  MyView,
  ScreenScroll,
} from '@/styles/CommonComponents.jsx';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import LoginModule from './components/Login.jsx';
import translator from './translate';
const Login = props => {
  const device = getDevice();
  const navigate = props.navigate;
  const isApp = device.indexOf(Device.App) !== -1;
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  React.useEffect(() => {
    if (state.token !== undefined && state.token !== null && state.token !== '')
      navigate(isApp ? 'Home' : '/');
  }, [state.token, isApp, state, navigate]);
  const setLoading = status => {
    dispatch({
      loading: status,
    });
  };

  const root = device.indexOf(Device.App) !== -1 ? 'Home' : '/';
  const redirectToRoot = () => {
    navigate(root);
  };
  React.useEffect(() => {
    if (state.token !== undefined && state.token !== null && state.token !== '')
      window.location.href = '/dashboard';
  }, [state.token]);
  return (
    <ScreenScroll
      style={{
        background: 'transparent',
      }}>
      <div
        style={{
          position: 'fixed',
          zIndex: -1,
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'url(./assets/images/back3.png)',
        }}
      />
      <MyView
        style={{
          ...commonStyles.ContentView,
        }}>
        <TextIcon
          style={{
            marginTop: 20,
            marginRight: 10,
            marginLeft: 10,
          }}
          text={translator.entryText}
          icon={faClose}
          onPress={() => redirectToRoot()}
        />

        <MyView>
          <LoginModule
            setToken={token => {
              dispatch({
                token: token,
              });
            }}
            setLoading={setLoading}
          />
        </MyView>
      </MyView>
    </ScreenScroll>
  );
};
export default Login;
