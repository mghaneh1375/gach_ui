import React, {useState} from 'react';
import {getDevice, getWidthHeight} from '../../../services/Utility';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import LoginModule from './components/Login';

import {
  commonStyles,
  MyView,
  ScreenScroll,
  TextWithLink,
} from '../../../styles/Common';
import translator from './translate';
import {TextIcon} from '../../../styles/Common/TextIcon';
import {Device} from '../../../models/Device';
import {globalStateContext, dispatchStateContext} from './../../../App';
import ForgetPassModule from './components/ForgetPass';
import ResetPassModule from './components/ResetPass';
import VerificationModule from './components/Verification';
import SignupModule from './components/Signup';
import RoleFormModule from './components/RoleForm';
import {style} from '../../../components/web/LargeScreen/Header/style';
import {styles} from '../../../styles/Common/Styles';

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
    if (state.token !== undefined) {
      navigate(isApp ? 'Home' : '/');
    }
  }, [state.token, isApp, state, navigate]);

  const setLoading = status => {
    dispatch({loading: status});
  };

  const [isSignUp, setIsSignUp] = useState(false);
  const [mode, setMode] = useState('login'); // available values: [signUp, verification, role, form]
  const [token, setToken] = useState('');
  const [reminder, setReminder] = useState(0);
  const [username, setUsername] = useState();
  const [code, setCode] = useState();

  const changeMode = wantedMode => {
    if (wantedMode === 'signUp') setIsSignUp(true);
    else if (wantedMode === 'forgetPass') setIsSignUp(false);
    setMode(wantedMode);
  };

  const home = device.indexOf(Device.App) !== -1 ? 'Home' : '/dashboard';
  const root = device.indexOf(Device.App) !== -1 ? 'Home' : '/';

  const redirectToRoot = () => {
    navigate(root);
  };

  React.useEffect(() => {
    if (state.token !== undefined) window.location.href = '/dashboard';
  }, [state.token]);

  return (
    <ScreenScroll style={{background: 'transparent'}}>
      <div
        style={{
          position: 'fixed',
          zIndex: -1,
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'url(./assets/images/back3.png)',
        }}></div>
      <MyView style={{...commonStyles.ContentView}}>
        <TextIcon
          style={{marginTop: 20, marginRight: 10, marginLeft: 10}}
          text={translator.entryText}
          icon={faClose}
          onPress={() =>
            mode === 'login' ? redirectToRoot() : changeMode('login')
          }
        />
        {mode === 'login' && (
          <MyView>
            <LoginModule
              setToken={token => {
                dispatch({token: token});
              }}
              // style={{marginTop: 20}}
              setLoading={setLoading}
            />

            <TextWithLink
              onPress={() => changeMode('signUp')}
              style={{...styles.margin30}}
              link={translator.subscrible}
              text={translator.ifNotSubscribe}
            />
            <TextWithLink
              onPress={() => changeMode('forget')}
              style={{...styles.margin30}}
              text={translator.ifForget}
              link={translator.forgetAction}
            />
          </MyView>
        )}

        {mode === 'forget' && (
          <ForgetPassModule
            setUsername={setUsername}
            username={username}
            setMode={changeMode}
            setLoading={setLoading}
            setReminder={setReminder}
            setToken={setToken}
            style={{marginTop: 20}}
          />
        )}
        {mode === 'verification' && (
          <VerificationModule
            setLoading={setLoading}
            setReminder={setReminder}
            setToken={setToken}
            reminder={reminder}
            token={token}
            setCode={setCode}
            setMode={setMode}
            username={username}
            mode={isSignUp ? 'signUp' : 'forgetPass'}
          />
        )}
        {mode === 'resetPass' && (
          <ResetPassModule
            username={username}
            token={token}
            code={code}
            setLoading={setLoading}
            navigate={navigate}
            redirectTo={'/login'}
          />
        )}
        {mode === 'signUp' && (
          <SignupModule
            setLoading={setLoading}
            setToken={setToken}
            setReminder={setReminder}
            setMode={changeMode}
            isInLargeScreen={false}
            style={{marginTop: 20}}
            username={username}
            setUsername={setUsername}
          />
        )}
        {mode === 'roleForm' && (
          <RoleFormModule
            style={{...style.paddingLeft50}}
            signUp={true}
            token={token}
            setLoading={setLoading}
            navigate={navigate}
            redirectTo={isApp ? 'Home' : '/dashboard'}
          />
        )}
      </MyView>
    </ScreenScroll>
  );
};

export default Login;
