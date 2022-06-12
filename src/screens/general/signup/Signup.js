import React, {useState} from 'react';

import {useIsFocused} from '@react-navigation/native';
import {dispatchStateContext, globalStateContext} from './../../../App';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import {
  BigBoldBlueTextInline,
  FontIcon,
  ScreenScroll,
  CommonTextInput,
  CommonButton,
  BlueTextInline,
  OrangeTextInline,
  InlineTextContainer,
  SilverTextInline,
} from '../../../styles/Common';
import translator from './translate';
import loginTranslator from './../login/translate';
import commonTranslator from './../../../tranlates/Common';
import {TextIcon} from '../../../styles/Common/TextIcon';
import {getDevice} from '../../../services/Utility';

const SignUp = navigator => {
  const device = getDevice();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [NID, setNID] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authVia, setAuthVia] = useState('sms');

  const isFocused = useIsFocused();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [globalStates, dispatch] = useGlobalState();
  React.useEffect(() => {
    if (navigator.navigation.isFocused()) dispatch({showBottonNav: false});
  }, [isFocused]);

  const changeInput = (label, text) => {
    if (label === 'username') setUsername(text);
  };

  const submit = () => {
    signIn(username, password);
  };

  return (
    <ScreenScroll>
      <TextIcon>
        <BigBoldBlueTextInline text={translator.entryText} device={device} />
        <FontIcon icon={faClose}></FontIcon>
      </TextIcon>

      <CommonTextInput
        justNum="true"
        placeholder={commonTranslator.phone}
        subText={loginTranslator.usernameFilter}
      />
      <CommonTextInput
        placeholder={commonTranslator.password}
        subText={loginTranslator.passwordFilter}
        type="password"
      />
      <CommonTextInput placeholder={commonTranslator.NID} justNum="true" />

      <SilverTextInline text={translator.acceptTerms} />
      <CommonButton onPress={() => submit()} title={commonTranslator.signUp} />
      <InlineTextContainer>
        <BlueTextInline text={translator.ifSubscribe} device={device} />
        <Pressable onPress={() => navigator.navigation.navigate('Login')}>
          <OrangeTextInline text={translator.login} device={device} />
        </Pressable>
      </InlineTextContainer>
    </ScreenScroll>
  );
};

export default SignUp;
