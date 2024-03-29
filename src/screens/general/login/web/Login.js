import React, {useState} from 'react';
import {
  BigBoldBlueText,
  BlueTextInline,
  CommonButton,
  EqualTwoTextInputs,
  InlineTextContainer,
  MyView,
  PhoneView,
  ScreenScroll,
  TextLink,
} from '../../../../styles/Common';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import {BlurLoginBack} from './style';
import LoginModule from './../components/Login';
import ForgetPassModule from './../components/ForgetPass';
import VerificationModule from './../components/Verification';
import SignupModule from './../components/Signup';
import ResetPassModule from './../components/ResetPass';
import RoleFormModule from './../components/RoleForm';
import commonTranlator from './../../../../translator/Common';
import translator from './../translate';
import {Container, Row, Col} from 'react-grid-system';
import vars from '../../../../styles/root';
import {dispatchStateContext, globalStateContext} from './../../../../App';
import {FontIcon} from '../../../../styles/Common/FontIcon';
import {getToken} from '../../../../API/User';
import {styles} from '../../../../styles/Common/Styles';

const Login = props => {
  const [mode, setMode] = useState('login');
  const [token, setToken] = useState('');
  const [code, setCode] = useState('');
  const [reminder, setReminder] = useState(0);
  const [username, setUsername] = useState();
  const [isSignUp, setIsSignUp] = useState(false);

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const navigate = props.navigate;
  const [state, dispatch] = useGlobalState();

  React.useEffect(() => {
    if (mode === 'verification' || mode === 'roleForm') return;
    Promise.all([getToken()]).then(res => {
      if (res[0] !== undefined) navigate('/');
    });
  }, [navigate, mode]);

  const setLoading = status => {
    dispatch({loading: status});
  };

  const changeMode = wantedMode => {
    if (wantedMode === 'signUp') setIsSignUp(true);
    else if (wantedMode === 'forget') setIsSignUp(false);

    setMode(wantedMode);
  };

  const redirectToHome = () => {
    navigate('/');
  };

  React.useEffect(() => {
    if (state.token !== undefined && state.token !== null && state.token !== '')
      window.location.href = '/dashboard';
  }, [state.token]);

  return (
    <ScreenScroll style={{...styles.overFlowHidden}}>
      <MyView
        style={{
          minHeight: '100vh',
          position: 'fixed',
          zIndex: '-100',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'url(./assets/images/back3.png)',
        }}
      />
      <MyView
        style={{
          position: 'absolute',
          width: 30,
          height: 30,
          left: 70,
          top: 70,
          zIndex: 8,
        }}>
        <FontIcon
          icon={faClose}
          onPress={() =>
            mode === 'login' ? redirectToHome() : changeMode('login')
          }
        />
      </MyView>
      <MyView
        style={{
          width: '35%',
          position: 'absolute',
          right: 0,
          top: '80px',
          zIndex: 9,
          bottom: '50px',
        }}>
        <BlurLoginBack style={{zIndex: 10}}>
          {mode === 'login' && (
            <LoginModule
              setToken={token => {
                dispatch({token: token});
              }}
              setLoading={setLoading}
              changeMode={changeMode}
            />
          )}
          {mode === 'forget' && (
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
              setMode={setMode}
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
              mode={isSignUp ? 'signUp' : 'forget'}
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
              signUp={true}
              token={token}
              setLoading={setLoading}
              navigate={navigate}
              redirectTo={'/dashboard'}
            />
          )}
        </BlurLoginBack>
        <BlurLoginBack style={{marginTop: '20px'}}>
          {/* <InlineTextContainer>
            <BlueTextInline text={translator.ifForget} />
            <TextLink
              text={translator.forgetAction}
              onPress={() => changeMode('forgetPass')}
            />
          </InlineTextContainer> */}

          <MyView style={{paddingLeft: 30}}>
            {/* <EqualTwoTextInputs style={{marginTop: 10}}>
              <BlueTextInline
                style={{alignSelf: 'center'}}
                text={translator.notSubscribeYet}
              />
              <CommonButton
                style={{marginRight: 'auto'}}
                title={commonTranlator.signUp}
                onPress={() => changeMode('signUp')}
              />
            </EqualTwoTextInputs> */}
            <PhoneView style={{marginTop: 10, justifyContent: 'space-between'}}>
              <BlueTextInline
                style={{alignSelf: 'center'}}
                text={translator.ifHaveProblem}
              />
              <CommonButton
                style={{marginRight: 'auto', backgroundColor: vars.DARK_BLUE}}
                title={commonTranlator.support}
                onPress={() =>
                  (window.location.href = 'https://www.irysc.com/contact-us/')
                }
              />
            </PhoneView>
          </MyView>
        </BlurLoginBack>
      </MyView>
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
              text={'سامانه آموزش و آزمون آیریسک'}
            />
            <BlueTextInline
              style={{display: 'block'}}
              text={translator.sliderDesc}
            />
          </Col>
        </Row>
      </Container>
    </ScreenScroll>
  );
};

export default Login;
