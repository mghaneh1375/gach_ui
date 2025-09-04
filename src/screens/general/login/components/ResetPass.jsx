import React, {useState} from 'react';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {style} from '../../../../components/web/LargeScreen/Header/style';
import {showError, showSuccess} from '../../../../services/Utility';
import {CommonButton, MyView} from '../../../../styles/Common';
import {CommonTextInput} from '../../../../styles/Common/CommonTextInput';
import translator from '..//translate';
import commonTranslator from './../../../../translator/Common';

const ResetPass = props => {
  const [password, setPassword] = useState('');
  const [rp, setRp] = useState('');

  const changeInput = (label, text) => {
    if (label === 'password') setPassword(text);
    else if (label === 'rp') setRp(text);
  };

  const resetPassword = () => {
    const data = {
      token: props.token,
      code: props.code,
      NID: props.username,
      newPass: password,
      rNewPass: rp,
    };

    for (const [key, value] of Object.entries(data)) {
      if (value.length === 0) {
        showError(commonTranslator.pleaseFillAllFields);
        return;
      }
    }

    props.setLoading(true);

    Promise.all([
      generalRequest(routes.resetPassword, 'post', data, undefined),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] != null) {
        showSuccess(translator.changePassSuccessfully);
        if (props.navigate !== undefined && props.redirectTo !== undefined)
          props.navigate(props.redirectTo);
        else if (props.setMode !== undefined) props.setMode('login');
      }
    });
  };

  return (
    <MyView style={{...style.ParentLoginModule}}>
      <CommonTextInput
        placeholder={translator.password}
        subText={translator.passwordFilter}
        type="password"
        value={password}
        onChangeText={e => changeInput('password', e)}
      />

      <CommonTextInput
        placeholder={translator.rPassword}
        subText={translator.rPassword}
        type="password"
        value={rp}
        onChangeText={e => changeInput('rp', e)}
      />

      <CommonButton
        style={{alignSelf: 'flex-start', marginTop: 10}}
        onPress={() => resetPassword()}
        title={commonTranslator.confirm}
      />
    </MyView>
  );
};

export default ResetPass;
