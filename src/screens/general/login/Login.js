import React from 'react';
import {getDevice, getWidthHeight} from '../../../services/Utility';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import LoginModule from './web/components/Login';

import {
  BlueTextInline,
  InlineTextContainer,
  ContentView,
  TextLink,
} from '../../../styles/Common';
import translator from './translate';
import {TextIcon} from '../../../styles/Common/TextIcon';
import {Device} from '../../../models/Device';
import {ImageBackground} from 'react-native';
import {globalStateContext, dispatchStateContext} from './../../../App';

const Login = navigate => {
  // if (globalStates.token !== undefined) {
  //   navigator.navigation.navigate('Home');
  //   return null;
  // }

  const device = getDevice();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  React.useEffect(() => {
    dispatch({showBottomNav: false});
  }, [dispatch]);

  const setLoading = status => {
    dispatch({loading: status});
  };

  const height = getWidthHeight()[1];

  return (
    <ImageBackground
      style={{minHeight: height}}
      resizeMode="contain"
      source={require('./../../../images/back2.png')}>
      <ContentView>
        <TextIcon
          style={{marginTop: 20}}
          text={translator.entryText}
          icon={faClose}
        />

        <LoginModule
          style={{marginTop: 20}}
          navigate={navigate}
          setLoading={setLoading}
        />
        <InlineTextContainer style={{marginTop: 30}}>
          <BlueTextInline text={translator.ifNotSubscribe} device={device} />

          <TextLink
            onPress={() => navigate('SignUp')}
            href={'/'}
            text={translator.subscrible}
            device={device}
          />
        </InlineTextContainer>

        <InlineTextContainer style={{marginTop: 130}}>
          <BlueTextInline text={translator.ifForget} device={device} />

          <TextLink
            onPress={() => navigate('ForgetPass')}
            href={'/forgetPass'}
            text={translator.forgetAction}
            device={device}
          />
        </InlineTextContainer>
      </ContentView>
    </ImageBackground>
  );
};

export default Login;
