import React, {useState} from 'react';
import {View} from 'react-native';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {showError} from '../../../../services/Utility';
import {
  BlueTextFromStart,
  CommonButton,
  CommonRadioButton,
} from '../../../../styles/Common';
import {CommonTextInput} from '../../../../styles/Common/CommonTextInput';
import commonTranslator from './../../../../tranlates/Common';
import translator from './../translate';

const ForgetPass = props => {
  const [authVia, setAuthVia] = useState('sms');
  const [step, setStep] = useState('forget'); // available values: []

  const changeNID = value => {
    props.setUsername(value);
  };

  const getWhichKindOfAuthIsAvailable = () => {
    if (props.username.length === 0) {
      showError(commonTranslator.pleaseFillAllFields);
      return;
    }

    props.setLoading(true);
    Promise.all([
      generalRequest(
        routes.whichKindOfAuthIsAvailable + props.username,
        'get',
        null,
        'via',
      ),
    ]).then(res => {
      if (res[0] != null) {
        const via = res[0];
        if (via === 'none') showError(commonTranslator.invalidFieldValue);
        else if (via === 'both') setStep('chooseAuthMethod');
        else {
          setAuthVia(via);
          requestForgetPass();
          return;
        }
      }

      props.setLoading(false);
    });
  };

  const requestForgetPass = () => {
    var data = {
      NID: props.username,
      authVia: authVia,
    };

    props.setLoading(true);

    Promise.all([
      generalRequest(routes.forgetPassword, 'post', data, [
        'token',
        'reminder',
      ]),
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
    <MyView style={props.style !== undefined ? props.style : {}}>
      <BlueTextFromStart text={translator.forgetPass} />
      {step === 'forget' && (
        <MyView>
          <CommonTextInput
            style={{marginTop: 20}}
            value={props.username}
            justNum={true}
            placeholder={commonTranslator.NID}
            onChangeText={e => changeNID(e)}
          />

          <MyView style={{marginTop: 40}}>
            <CommonButton
              onPress={() => getWhichKindOfAuthIsAvailable()}
              title={commonTranslator.continue}
            />
          </MyView>
        </MyView>
      )}

      {step === 'chooseAuthMethod' && (
        <MyView>
          <CommonRadioButton
            text={translator.viaSMS}
            value="sms"
            status={authVia === 'sms' ? 'checked' : 'unchecked'}
            onPress={() => setAuthVia('sms')}
          />

          <CommonRadioButton
            text={translator.viaMail}
            value="mail"
            status={authVia === 'mail' ? 'checked' : 'unchecked'}
            onPress={() => setAuthVia('mail')}
          />

          <CommonButton
            style={{alignSelf: 'flex-start', marginTop: 10}}
            onPress={() => requestForgetPass()}
            title={commonTranslator.confirm}
          />
        </MyView>
      )}
    </MyView>
  );
};

export default ForgetPass;
