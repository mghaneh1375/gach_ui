import React, {useState} from 'react';
import {routes} from '../../../../API/APIRoutes';
import {setCacheItem} from '../../../../API/User';
import {generalRequest} from '../../../../API/Utility';
import {CommonButton, MyView} from '../../../../styles/Common';
import {CommonTextInput} from '../../../../styles/Common/CommonTextInput';
import commonTranlator from './../../../../tranlates/Common';
import translator from './../translate';

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const changeInput = (label, value) => {
    if (label === 'username') setUsername(value);
    else if (label === 'password') setPassword(value);
  };

  const requestLogin = () => {
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
    ]).then(res => {
      props.setLoading(false);
      if (res[0] !== null) {
        setCacheItem('token', res[0].token);
        setCacheItem('user', JSON.stringify(res[0].user));
        props.navigate(props.toPath);
      }
    });
  };

  return (
    <MyView style={{paddingLeft: 50}}>
      <CommonTextInput
        placeholder={translator.phoneOrMail}
        subText={translator.phoneOrMail}
        onChangeText={e => changeInput('username', e)}
      />
      <CommonTextInput
        placeholder={commonTranlator.password}
        subText={translator.passwordFilter}
        type={'password'}
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
