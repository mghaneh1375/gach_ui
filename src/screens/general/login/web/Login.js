import React, {useState} from 'react';
import {ImageBackground, View} from 'react-native';
import {
  BigBoldBlueText,
  BlueTextInline,
  CommonButton,
  InlineTextContainer,
  ScreenScroll,
  TextLink,
} from '../../../../styles/Common';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import {BlurLoginBack} from './style';
import LoginModule from './../components/Login';
// import ForgetPassModule from './../components/ForgetPass';
// import VerificationModule from './../components/Verification';
// import SignupModule from './../components/Signup';
// import ResetPassModule from './../components/ResetPass';
// import RoleFormModule from './../components/RoleForm';
import commonTranlator from './../../../../tranlates/Common';
import translator from './../translate';
import {Container, Row, Col} from 'react-grid-system';
import vars from '../../../../styles/root';
import {globalStateContext, dispatchStateContext} from './../../../../App';
import {FontIcon} from '../../../../styles/Common/FontIcon';

const Login = props => {
  const [mode, setMode] = useState('login');
  const [token, setToken] = useState('');
  const [code, setCode] = useState('');
  const [reminder, setReminder] = useState(0);
  const [username, setUsername] = useState('0018914373'); //0018914373
  const [isSignUp, setIsSignUp] = useState(false);

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const navigate = props.navigate;
  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  const changeMode = wantedMode => {
    if (wantedMode === 'signUp') setIsSignUp(true);
    else if (wantedMode === 'forgetPass') setIsSignUp(false);

    setMode(wantedMode);
  };

  const redirectToHome = () => {
    navigate('/');
  };

  return (
    <ScreenScroll>
      <ImageBackground
        resizeMode="cover"
        style={{minHeight: '100vh'}}
        source={require('./../../../../images/back3.png')}>
        <View
          style={{
            position: 'absolute',
            width: 40,
            height: 40,
            left: 50,
            top: 40,
            zIndex: 100,
          }}>
          <FontIcon
            icon={faClose}
            onPress={() =>
              mode === 'login' ? redirectToHome() : changeMode('login')
            }
          />
        </View>

        <div
          style={{
            width: '35%',
            position: 'absolute',
            right: 0,
            top: '40px',
            zIndex: 100000,
            bottom: '50px',
          }}>
          <BlurLoginBack>
            {mode === 'login' && (
              <LoginModule navigate={navigate} setLoading={setLoading} />
            )}
            {/* {mode === 'forgetPass' && (
              <ForgetPassModule
                setUsername={setUsername}
                username={username}
                setMode={setMode}
                setLoading={setLoading}
                setReminder={setReminder}
                setToken={setToken}
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
            {mode === 'signUp' && (
              <SignupModule
                setLoading={setLoading}
                setToken={setToken}
                setReminder={setReminder}
                setMode={setMode}
                isInLargeScreen={true}
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
            )} */}
          </BlurLoginBack>
          <BlurLoginBack style={{marginTop: '20px'}}>
            <InlineTextContainer>
              <BlueTextInline text={translator.ifForget} />
              <TextLink
                text={translator.forgetAction}
                onPress={() => changeMode('forgetPass')}
              />
            </InlineTextContainer>

            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <BlueTextInline
                style={{alignSelf: 'center'}}
                text={translator.notSubscribeYet}
              />

              <CommonButton
                style={{marginRight: 'auto'}}
                title={commonTranlator.signUp}
                onPress={() => changeMode('signUp')}
              />
            </View>

            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <BlueTextInline
                style={{alignSelf: 'center'}}
                text={translator.ifHaveProblem}
              />

              <CommonButton
                style={{marginRight: 'auto', backgroundColor: vars.DARK_BLUE}}
                title={commonTranlator.support}
              />
            </View>
          </BlurLoginBack>
        </div>
        <Container
          style={{
            marginTop: '50px',
            width: '100%',
          }}>
          <Row>
            <Col style={{padding: '20px'}} sm={6}></Col>
            <Col sm={6} style={{padding: '20px'}}>
              <img
                style={{height: '100px', display: 'block'}}
                src={require('./../../../../images/irysc.png')}
              />
              <BigBoldBlueText
                style={{marginTop: '10px'}}
                text={'سامانه آموزشی آیریسک'}
              />
              <BlueTextInline
                style={{display: 'block'}}
                text={translator.sliderDesc}
              />
            </Col>
          </Row>
        </Container>
      </ImageBackground>
    </ScreenScroll>
  );
};

export default Login;
