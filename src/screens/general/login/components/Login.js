import React, {useState} from 'react';
import {routes} from '../../../../API/APIRoutes';
import {setCacheItem} from '../../../../API/User';
import {generalRequest} from '../../../../API/Utility';
import {style} from '../../../../components/web/LargeScreen/Header/style';
import {getWidthHeight, showError} from '../../../../services/Utility';
import {CommonButton, MyView} from '../../../../styles/Common';
import {CommonTextInput} from '../../../../styles/Common/CommonTextInput';
import commonTranlator from './../../../../translator/Common';
import translator from './../translate';

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const changeInput = (label, value) => {
    if (label === 'username') setUsername(value);
    else if (label === 'password') setPassword(value);
  };

  const requestLogin = React.useCallback(() => {
    if (
      username === undefined ||
      password === undefined ||
      username === '' ||
      password === ''
    ) {
      showError(commonTranlator.pleaseFillAllFields);
      return;
    }
    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.signIn,
        'post',
        {
          username: username,
          password: password,
        },
        ['user', 'token'],
      ),
    ]).then(async res => {
      props.setLoading(false);
      if (res[0] !== null) {
        await setCacheItem('token', res[0].token);
        await setCacheItem('user', JSON.stringify(res[0].user));
        window.location.href = props.toPath;
      }
    });
  }, [props, username, password]);

  return (
    <MyView style={{...style.ParentLoginModule, ...style.marginTop25}}>
      <CommonTextInput
        placeholder={translator.phoneOrMail}
        subText={translator.phoneOrMail}
        onEnter={() => requestLogin()}
        onChangeText={e => changeInput('username', e)}
      />
      <CommonTextInput
        placeholder={commonTranlator.password}
        subText={translator.passwordFilter}
        type={'password'}
        onEnter={() => requestLogin()}
        onChangeText={e => changeInput('password', e)}
        style={{marginTop: 20}}
      />
      <MyView>
        <CommonButton
          style={{marginTop: 50}}
          onPress={() => requestLogin()}
          title={commonTranlator.entrance}
        />
      </MyView>
    </MyView>
  );
};

export default Login;
