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
} from '../../../styles/Common';
import {translator} from './translate';
import {TextIcon} from '../../../styles/Common/TextIcon';
import {getDevice} from '../../../services/Utility';

const SignUp = navigator => {
  const device = getDevice();
  const [firstname, setFirstname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

      <CommonTextInput />
      <CommonTextInput type="password" />

      <CommonButton onPress={() => submit()} title="تایید" />
    </ScreenScroll>
  );
};

export default SignUp;
