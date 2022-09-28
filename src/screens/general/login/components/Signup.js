import React, {useDebugValue, useState} from 'react';
import {
  CommonButton,
  CommonRadioButton,
  SilverTextInline,
  TextWithLink,
  MyView,
  PhoneView,
} from '../../../../styles/Common';

import {generalRequest} from '../../../../API/Utility';
import translator from '../translate';
import commonTranslator from './../../../../translator/Common';
import {routes} from '../../../../API/APIRoutes';
import {CommonTextInput} from '../../../../styles/Common/CommonTextInput';
import {changeText, showError} from '../../../../services/Utility';
import {style} from '../../../../components/web/LargeScreen/Header/style';
import {styles} from '../../../../styles/Common/Styles';

const Signup = props => {
  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [NID, setNID] = useState();
  const [password, setPassword] = useState();
  const [rPassword, setRPassword] = useState();
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
    if (password === undefined || rPassword === useDebugValue) {
      showError(commonTranslator.pleaseFillAllFields);
      return;
    }

    if (password !== rPassword) {
      showError('رمزعبور و تکرار آن مطابقت ندارد.');
      return;
    }

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
      style={{
        ...props.style,
        ...style.ParentLoginModule,
        ...styles.marginBottom20,
      }}>
      <PhoneView style={{...styles.gap15}}>
        <CommonTextInput
          isHalf={true}
          placeholder={commonTranslator.firstname}
          subText={commonTranslator.firstname}
          value={firstname}
          onChangeText={e => changeInput('firstname', e)}
        />
        <CommonTextInput
          isHalf={true}
          placeholder={commonTranslator.lastname}
          subText={commonTranslator.lastname}
          value={lastname}
          onChangeText={e => changeInput('lastname', e)}
        />
      </PhoneView>

      <CommonTextInput
        placeholder={commonTranslator.NID}
        subText={commonTranslator.NID}
        justNum={true}
        style={{marginTop: 20}}
        value={NID}
        onChangeText={e => changeInput('NID', e)}
      />

      <PhoneView>
        <CommonRadioButton
          text={translator.viaSMS}
          value="sms"
          status={authVia === 'sms' ? 'checked' : 'unchecked'}
          onPress={() => changeAuthVia('sms')}
        />

        <CommonRadioButton
          text={translator.viaMail}
          value="mail"
          status={authVia === 'mail' ? 'checked' : 'unchecked'}
          onPress={() => changeAuthVia('mail')}
        />
      </PhoneView>

      {authVia === 'sms' && (
        <CommonTextInput
          justNum="true"
          placeholder={commonTranslator.phone}
          subText={commonTranslator.phone}
          value={authVia === 'sms' ? props.username : ''}
          onChangeText={e => changeInput('username', e)}
        />
      )}
      {authVia === 'mail' && (
        <CommonTextInput
          placeholder={commonTranslator.mail}
          subText={commonTranslator.mail}
          value={authVia === 'mail' ? props.username : ''}
          onChangeText={e => changeInput('username', e)}
        />
      )}

      <CommonTextInput
        placeholder={commonTranslator.password}
        subText={commonTranslator.password}
        value={password}
        style={{marginTop: 40}}
        type="password"
        onChangeText={e => changeInput('password', e)}
      />

      <CommonTextInput
        placeholder={commonTranslator.rPassword}
        subText={commonTranslator.rPassword}
        value={rPassword}
        type="password"
        onChangeText={e => changeText(e, setRPassword)}
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
