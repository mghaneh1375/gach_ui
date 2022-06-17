import React, {useState} from 'react';
import {View} from 'react-native';
import {
  BlueTextInline,
  CommonButton,
  CommonRadioButton,
  CommonTextInput,
  EqualTwoTextInputs,
  InlineTextContainer,
  SilverTextInline,
  TextLink,
} from '../../../../../styles/Common';

import {generalRequest, showError} from '../../../../../API/Utility';
import translator from '../../../signup/translate';
import loginTranslator from '../../../login/translate';
import commonTranslator from './../../../../../tranlates/Common';
import {routes} from '../../../../../API/APIRoutes';

const Signup = props => {
  const [firstname, setFirstname] = useState('سش');
  const [lastname, setLastname] = useState('سیش');
  const [NID, setNID] = useState('0018914373');
  const [password, setPassword] = useState('Ghhy@110');
  const [authVia, setAuthVia] = useState('sms');

  const changeInput = (label, text) => {
    if (label === 'username') props.setUsername(text);
    else if (label === 'password') setPassword(text);
    else if (label === 'firstname') setFirstname(text);
    else if (label === 'lastname') setLastname(text);
    else if (label === 'NID') setNID(text);
  };

  const submit = () => {
    var data = {
      username: props.username,
      password: password,
      firstName: firstname,
      lastName: lastname,
      NID: NID,
      authVia: authVia,
    };

    for (const [key, value] of Object.entries(data)) {
      if (value.length === 0) {
        showError(commonTranslator.pleaseFillAllFields);
        return;
      }
    }

    props.setLoading(true);

    Promise.all([
      generalRequest(routes.signup, 'post', data, ['token', 'reminder']),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] != null) {
        props.setToken(res[0].token);
        props.setReminder(res[0].reminder);
        props.setMode('verification');
      }
    });
  };
  return (
    <View>
      <EqualTwoTextInputs>
        <CommonTextInput
          placeholder={commonTranslator.firstname}
          value={firstname}
          onChangeText={e => changeInput('firstname', e)}
          style={{minWidth: '48%'}}
        />
        <CommonTextInput
          placeholder={commonTranslator.lastname}
          style={{minWidth: '48%'}}
          value={lastname}
          onChangeText={e => changeInput('lastname', e)}
        />
      </EqualTwoTextInputs>

      <CommonTextInput
        placeholder={commonTranslator.NID}
        justNum="true"
        value={NID}
        onChangeText={e => changeInput('NID', e)}
      />

      <CommonRadioButton
        text={translator.auth}
        value="sms"
        status={authVia === 'sms' ? 'checked' : 'unchecked'}
        onPress={() => setAuthVia('sms')}
      />

      <CommonTextInput
        justNum="true"
        placeholder={commonTranslator.phone}
        value={authVia === 'sms' ? props.username : ''}
        subText={loginTranslator.usernameFilter}
        onChangeText={e => changeInput('username', e)}
      />

      <CommonRadioButton
        text={translator.auth}
        value="mail"
        status={authVia === 'mail' ? 'checked' : 'unchecked'}
        onPress={() => setAuthVia('mail')}
      />

      <CommonTextInput
        placeholder={commonTranslator.mail}
        subText={commonTranslator.mail}
        value={authVia === 'mail' ? props.username : ''}
        onChangeText={e => changeInput('username', e)}
      />

      <CommonTextInput
        placeholder={commonTranslator.password}
        value={password}
        subText={loginTranslator.passwordFilter}
        type="password"
        onChangeText={e => changeInput('password', e)}
      />
      <SilverTextInline style={{marginTop: 20}} text={translator.acceptTerms} />

      <CommonButton
        style={{alignSelf: 'flex-start', marginTop: 10}}
        onPress={() => submit()}
        title={commonTranslator.signUp}
      />
      {!props.isInLargeScreen && (
        <InlineTextContainer style={{marginTop: 30}}>
          <BlueTextInline text={translator.ifSubscribe} />
          <TextLink href={'Login'} text={translator.login} />
        </InlineTextContainer>
      )}
    </View>
  );
};

export default Signup;
