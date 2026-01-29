import {getToken} from '@/api/user';
import {dispatchStateContext, globalStateContext} from '@/App.jsx';
import {FontIcon} from '@/styles/common/FontIcon.jsx';
import {styles} from '@/styles/common/styles';
import {
  BigBoldBlueText,
  BlueTextInline,
  CommonButton,
  MyView,
  PhoneView,
  ScreenScroll,
} from '@/styles/CommonComponents.jsx';
import vars from '@/styles/root';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import {Col, Container, Row} from 'react-grid-system';
import commonTranlator from '../../../../translator/common';
import LoginModule from '../components/Login.jsx';
import translator from '../translate';
import {BlurLoginBack} from './style';
const Login = props => {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const navigate = props.navigate;
  const [state, dispatch] = useGlobalState();
  React.useEffect(() => {
    Promise.all([getToken()]).then(res => {
      if (res[0] !== undefined) navigate('/');
    });
  }, [navigate]);
  const setLoading = status => {
    dispatch({
      loading: status,
    });
  };

  const redirectToHome = () => {
    navigate('/');
  };
  React.useEffect(() => {
    if (state.token !== undefined && state.token !== null && state.token !== '')
      window.location.href = '/dashboard';
  }, [state.token]);
  return (
    <ScreenScroll
      style={{
        ...styles.overFlowHidden,
      }}>
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
        <FontIcon icon={faClose} onPress={() => redirectToHome()} />
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
        <BlurLoginBack
          style={{
            zIndex: 10,
          }}>
          <LoginModule
            setToken={token => {
              dispatch({
                token: token,
              });
            }}
            setLoading={setLoading}
          />
        </BlurLoginBack>
        <BlurLoginBack
          style={{
            marginTop: '20px',
          }}>
          {/* <InlineTextContainer>
            <BlueTextInline text={translator.ifForget} />
            <TextLink
              text={translator.forgetAction}
              onPress={() => changeMode('forgetPass')}
            />
           </InlineTextContainer> */}

          <MyView
            style={{
              paddingLeft: 30,
            }}>
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
            <PhoneView
              style={{
                marginTop: 10,
                justifyContent: 'space-between',
              }}>
              <BlueTextInline
                style={{
                  alignSelf: 'center',
                }}
                text={translator.ifHaveProblem}
              />
              <CommonButton
                style={{
                  marginRight: 'auto',
                  backgroundColor: vars.DARK_BLUE,
                }}
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
          <Col
            style={{
              padding: '20px',
            }}
            sm={6}
          />
          <Col
            sm={6}
            style={{
              padding: '20px',
            }}>
            <img
              style={{
                height: '100px',
                display: 'block',
              }}
              src={require('./../../../../images/irysc.png')}
            />
            <BigBoldBlueText
              style={{
                marginTop: '10px',
              }}
              text={'سامانه آموزش و آزمون آیریسک'}
            />
            <BlueTextInline
              style={{
                display: 'block',
              }}
              text={translator.sliderDesc}
            />
          </Col>
        </Row>
      </Container>
    </ScreenScroll>
  );
};
export default Login;
