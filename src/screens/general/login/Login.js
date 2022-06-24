import React, {useState} from 'react';
import {getDevice, getWidthHeight} from '../../../services/Utility';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import LoginModule from './components/Login';

import {commonStyles, TextWithLink} from '../../../styles/Common';
import translator from './translate';
import {TextIcon} from '../../../styles/Common/TextIcon';
import {Device} from '../../../models/Device';
import {ImageBackground, View} from 'react-native';
import {globalStateContext, dispatchStateContext} from './../../../App';
import ForgetPassModule from './components/ForgetPass';
import ResetPassModule from './components/ResetPass';
import VerificationModule from './components/Verification';
import SignupModule from './components/Signup';
import RoleFormModule from './components/RoleForm';

const Login = props => {
  // if (globalStates.token !== undefined) {
  //   navigator.navigation.navigate('Home');
  //   return null;
  // }
  const device = getDevice();
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  const height = getWidthHeight()[1];

  const [isSignUp, setIsSignUp] = useState(false);
  const [mode, setMode] = useState('login'); // available values: [signUp, verification, role, form]
  const [token, setToken] = useState('');
  const [reminder, setReminder] = useState(0);
  const [username, setUsername] = useState('0018914373');
  const [code, setCode] = useState(111111);

  const changeMode = wantedMode => {
    if (wantedMode === 'signUp') setIsSignUp(true);
    else if (wantedMode === 'forgetPass') setIsSignUp(false);
    setMode(wantedMode);
  };

  const home = device.indexOf(Device.App) !== -1 ? 'Home' : '/';

  const redirectToHome = () => {
    navigate(home);
  };

  return (
    <ImageBackground
      style={{minHeight: height}}
      resizeMode="contain"
      source={require('./../../../images/back2.png')}>
      <View style={commonStyles.ContentView}>
        <TextIcon
          style={{marginTop: 20}}
          text={translator.entryText}
          icon={faClose}
          onPress={() =>
            mode === 'login' ? redirectToHome() : changeMode('login')
          }
        />

        {mode === 'login' && (
          <View>
            <LoginModule
              navigate={navigate}
              style={{marginTop: 20}}
              setLoading={setLoading}
              toPath={home}
            />

            <TextWithLink
              onPress={() => changeMode('signUp')}
              style={{marginTop: 30}}
              link={translator.subscrible}
              text={translator.ifNotSubscribe}
            />

            <TextWithLink
              onPress={() => changeMode('forget')}
              style={{marginTop: 130}}
              text={translator.ifForget}
              link={translator.forgetAction}
            />
          </View>
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
            isSignUp={isSignUp}
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
            token={token}
            setLoading={setLoading}
            navigate={navigate}
            redirectTo={'/'}
          />
        )}
      </View>
    </ImageBackground>
  );
};

export default Login;
