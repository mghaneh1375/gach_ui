import React, {useState} from 'react';
import {signIn} from '../../../API/User';
import {getDevice} from '../../../services/Utility';
import {faClose} from '@fortawesome/free-solid-svg-icons';

import {
  BigBoldBlueTextInline,
  FontIcon,
  ScreenScroll,
  CommonTextInput,
  CommonButton,
  BlueTextInline,
  InlineTextContainer,
  MinFullHeightView,
  ContentView,
  TextLink,
} from '../../../styles/Common';
import translator from './translate';
import commonTranslator from './../../../tranlates/Common';
import {dispatchStateContext, globalStateContext} from './../../../App';
import {TextIcon} from '../../../styles/Common/TextIcon';

const Login = navigator => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // if (globalStates.token !== undefined) {
  //   navigator.navigation.navigate('Home');
  //   return null;
  // }

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
    <ContentView>
      <TextIcon>
        <BigBoldBlueTextInline text={translator.entryText} device={device} />
        <FontIcon icon={faClose}></FontIcon>
      </TextIcon>

      <CommonTextInput
        style={{marginTop: 50}}
        placeholder={commonTranslator.username}
        onChangeText={changeUsername}
        value={username}
        subText={translator.usernameFilter}
      />
      <CommonTextInput
        placeholder={commonTranslator.password}
        type="password"
        value={password}
        onChangeText={changePassword}
        subText={translator.passwordFilter}
      />

      <CommonButton
        style={{marginTop: 50}}
        onPress={() => submit()}
        title={commonTranslator.confirm}
      />
      <InlineTextContainer style={{marginTop: 30}}>
        <BlueTextInline text={translator.ifNotSubscribe} device={device} />

        <TextLink
          onPress={() =>
            navigator.navigation !== undefined
              ? navigator.navigation.navigate('SignUp')
              : null
          }
          href={'/'}
          text={translator.subscrible}
          device={device}
        />
      </InlineTextContainer>

      <InlineTextContainer style={{marginTop: 130}}>
        <BlueTextInline text={translator.ifForget} device={device} />

        <TextLink
          onPress={() => navigator.navigation.navigate('ForgetPass')}
          text={translator.forgetAction}
          device={device}
        />
      </InlineTextContainer>
    </ContentView>
  );
};

export default Login;
