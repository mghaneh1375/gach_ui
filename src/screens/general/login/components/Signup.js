import React, {useState} from 'react';
import {
  CommonButton,
  CommonRadioButton,
  EqualTwoTextInputs,
  SilverTextInline,
  TextWithLink,
  MyView,
} from '../../../../styles/Common';

import {generalRequest} from '../../../../API/Utility';
import translator from '../translate';
import commonTranslator from './../../../../tranlates/Common';
import {routes} from '../../../../API/APIRoutes';
import {CommonTextInput} from '../../../../styles/Common/CommonTextInput';
import {showError} from '../../../../services/Utility';

const Signup = props => {
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [NID, setNID] = useState();
  const [password, setPassword] = useState();
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
    <MyView
      style={
        props.style !== undefined ? props.style : {gap: 5, paddingLeft: 50}
      }>
      <EqualTwoTextInputs>
        <CommonTextInput
          placeholder={commonTranslator.firstname}
          subText={commonTranslator.firstname}
          value={firstname}
          isHalf={false}
          onChangeText={e => changeInput('firstname', e)}
          style={{minWidth: '48%'}}
        />
        <CommonTextInput
          placeholder={commonTranslator.lastname}
          subText={commonTranslator.lastname}
          style={{minWidth: '48%'}}
          value={lastname}
          isHalf={false}
          onChangeText={e => changeInput('lastname', e)}
        />
      </EqualTwoTextInputs>

      <CommonTextInput
        placeholder={commonTranslator.NID}
        subText={commonTranslator.NID}
        justNum={true}
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
        subText={commonTranslator.phone}
        value={authVia === 'sms' ? props.username : ''}
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
        subText={commonTranslator.password}
        value={password}
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
    </MyView>
  );
};

export default Signup;
