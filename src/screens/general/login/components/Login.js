import React, {useRef, useState} from 'react';
import {routes} from '../../../../API/APIRoutes';
import {setCacheItem} from '../../../../API/User';
import {generalRequest} from '../../../../API/Utility';
import {getWidthHeight} from '../../../../services/Utility';
import {CommonButton, MyView, MyViewWithRef} from '../../../../styles/Common';
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
  }, [props, username, password]);
  const width = getWidthHeight()[0];

  return (
    <MyView
      style={{
        paddingLeft: width < 768 ? 25 : 50,
        paddingRight: width > 768 ? 0 : 50,
        paddingTop: width > 768 ? 0 : 15,
      }}>
      <CommonTextInput
        placeholder={translator.phoneOrMail}
        subText={translator.phoneOrMail}
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
