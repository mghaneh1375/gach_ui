import React, {useState} from 'react';
import {View} from 'react-native';
import {
  CommonButton,
  CommonRadioButton,
  CommonTextInput,
  EqualTwoTextInputs,
  SilverTextInline,
  TextWithLink,
} from '../../../../styles/Common';

import {generalRequest, showError} from '../../../../API/Utility';
import translator from '../translate';
import commonTranslator from './../../../../tranlates/Common';
import {routes} from '../../../../API/APIRoutes';

const Signup = props => {
  const [firstname, setFirstname] = useState('سش');
  const [lastname, setLastname] = useState('سیش');
  const [NID, setNID] = useState('0018914373');
  const [password, setPassword] = useState('Ghhy@110');
  const [authVia, setAuthVia] = useState('sms');

  const changeAuthVia = newMode => {
    setAuthVia(newMode);
    props.setUsername('');
  };

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
    <View style={props.style !== undefined ? props.style : {}}>
      <EqualTwoTextInputs
        style={{paddingRight: 0, paddingLeft: props.isInLargeScreen ? 30 : 0}}>
        <CommonTextInput
          placeholder={commonTranslator.firstname}
          value={firstname}
          isHalf={true}
          onChangeText={e => changeInput('firstname', e)}
          style={{minWidth: '48%'}}
        />
        <CommonTextInput
          placeholder={commonTranslator.lastname}
          style={{minWidth: '48%'}}
          value={lastname}
          isHalf={true}
          onChangeText={e => changeInput('lastname', e)}
        />
      </EqualTwoTextInputs>

      <CommonTextInput
        placeholder={commonTranslator.NID}
        justNum="true"
        style={{marginTop: 20}}
        value={NID}
        onChangeText={e => changeInput('NID', e)}
      />

      <CommonRadioButton
        text={translator.viaSMS}
        value="sms"
        status={authVia === 'sms' ? 'checked' : 'unchecked'}
        onPress={() => changeAuthVia('sms')}
      />

      <CommonTextInput
        justNum="true"
        placeholder={commonTranslator.phone}
        value={authVia === 'sms' ? props.username : ''}
        subText={translator.usernameFilter}
        onChangeText={e => changeInput('username', e)}
      />

      <CommonRadioButton
        text={translator.viaMail}
        value="mail"
        status={authVia === 'mail' ? 'checked' : 'unchecked'}
        onPress={() => changeAuthVia('mail')}
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
        subText={translator.passwordFilter}
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
        <TextWithLink
          link={translator.login}
          text={translator.ifSubscribe}
          onPress={() => props.setMode('login')}
          style={{marginTop: 30}}
        />
      )}
    </View>
  );
};

export default Signup;
