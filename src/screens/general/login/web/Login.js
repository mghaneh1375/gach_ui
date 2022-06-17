import React, {useState} from 'react';
import {ImageBackground, View, Pressable} from 'react-native';
import {
  BigBoldBlueText,
  BlueTextInline,
  CommonButton,
  FontIcon,
  InlineTextContainer,
  ScreenScroll,
  TextLink,
} from '../../../../styles/Common';
import {useNavigate} from 'react-router-dom';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import {BlurLoginBack} from './style';
import LoginModule from './components/Login';
import ForgetPassModule from './components/ForgetPass';
import VerificationModule from './components/Verification';
import SignupModule from './components/Signup';
import commonTranlator from './../../../../tranlates/Common';
import loginTranslator from './../translate';
import {Container, Row, Col} from 'react-grid-system';
import vars from '../../../../styles/root';
import {globalStateContext, dispatchStateContext} from './../../../../App';

const Login = () => {
  const [mode, setMode] = useState('login');
  const [token, setToken] = useState('');
  const [reminder, setReminder] = useState(0);
  const [username, setUsername] = useState('09214915905');
  const [isSignUp, setIsSignUp] = useState(false);

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  React.useEffect(() => {
    dispatch({showTopNav: false});
  }, [dispatch]);

  const setLoading = status => {
    dispatch({loading: status});
  };

  const changeMode = wantedMode => {
    if (wantedMode === 'signUp') setIsSignUp(true);
    else if (wantedMode === 'forgetPass') setIsSignUp(false);

    setMode(wantedMode);
  };

  const navigate = useNavigate();

  const redirectToHome = () => {
    navigate('/');
  };

  return (
    <ScreenScroll>
      <ImageBackground
        resizeMode="cover"
        style={{minHeight: '100vh'}}
        source={require('./../../../../images/back3.png')}>
        <Pressable
          onPress={() =>
            mode === 'login' ? redirectToHome() : changeMode('login')
          }>
          <FontIcon
            style={{
              position: 'absolute',
              left: '50px',
              top: '40px',
              cursor: 'pointer',
              backgroundColor: vars.ORANGE_RED,
              width: '30px',
              height: '30px',
            }}
            icon={faClose}></FontIcon>
        </Pressable>

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
            {mode === 'login' && <LoginModule setLoading={setLoading} />}
            {mode === 'forgetPass' && (
              <ForgetPassModule
                setUsername={setUsername}
                username={username}
                setLoading={setLoading}
              />
            )}
            {mode === 'verification' && (
              <VerificationModule
                setLoading={setLoading}
                setReminder={setReminder}
                setToken={setToken}
                reminder={reminder}
                token={token}
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
          </BlurLoginBack>
          <BlurLoginBack style={{marginTop: '20px'}}>
            <InlineTextContainer>
              <BlueTextInline text={loginTranslator.ifForget} />
              <TextLink
                text={loginTranslator.forgetAction}
                onPress={() => changeMode('forgetPass')}
              />
            </InlineTextContainer>

            <View style={{marginTop: 10, flexDirection: 'row'}}>
              <BlueTextInline
                style={{alignSelf: 'center'}}
                text={loginTranslator.notSubscribeYet}
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
                text={loginTranslator.ifHaveProblem}
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
                text={loginTranslator.sliderDesc}
              />
            </Col>
          </Row>
        </Container>
      </ImageBackground>
    </ScreenScroll>
  );
};

export default Login;
