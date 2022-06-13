import React, {useState} from 'react';
import {signIn} from '../../../API/User';
import {getDevice} from '../../../services/Utility';
import {faClose} from '@fortawesome/free-solid-svg-icons';

import {useIsFocused} from '@react-navigation/native';
import {
  BigBoldBlueTextInline,
  FontIcon,
  ScreenScroll,
  CommonTextInput,
  CommonButton,
  BlueTextInline,
  OrangeTextInline,
  InlineTextContainer,
  MinFullHeightView,
  ContentView,
} from '../../../styles/Common';
import translator from './translate';
import commonTranslator from './../../../tranlates/Common';
import {dispatchStateContext, globalStateContext} from './../../../App';
import {Pressable} from 'react-native';
import {TextIcon} from '../../../styles/Common/TextIcon';

const Login = navigator => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isFocused = useIsFocused();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [globalStates, dispatch] = useGlobalState();

  // if (globalStates.token !== undefined) {
  //   navigator.navigation.navigate('Home');
  //   return null;
  // }

  React.useEffect(() => {
    if (navigator.navigation.isFocused()) dispatch({showBottonNav: false});
  }, [isFocused]);

  const changeUsername = text => {
    setUsername(text);
  };

  const changePassword = text => {
    setPassword(text);
  };

  const submit = () => {
    signIn(username, password);
  };

  const device = getDevice();

  return (
    <ScreenScroll>
      <MinFullHeightView>
        <ContentView>
          <TextIcon>
            <BigBoldBlueTextInline
              text={translator.entryText}
              device={device}
            />
            <FontIcon icon={faClose}></FontIcon>
          </TextIcon>

          <CommonTextInput
            style={{marginTop: 50}}
            placeholder={commonTranslator.username}
            onChangeText={changeUsername}
            subText={translator.usernameFilter}
          />
          <CommonTextInput
            placeholder={commonTranslator.password}
            type="password"
            onChangeText={changePassword}
            subText={translator.passwordFilter}
          />

          <CommonButton
            style={{marginTop: 50}}
            onPress={() => submit()}
            title={commonTranslator.confirm}
          />
          <InlineTextContainer style={{marginTop: 150}}>
            <BlueTextInline text={translator.ifNotSubscribe} device={device} />
            <Pressable onPress={() => navigator.navigation.navigate('SignUp')}>
              <OrangeTextInline text={translator.subscrible} device={device} />
            </Pressable>
          </InlineTextContainer>
        </ContentView>
      </MinFullHeightView>
    </ScreenScroll>
  );
};

export default Login;
