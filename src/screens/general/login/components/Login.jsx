import React, {useState} from 'react';
import {routes} from '@/api/apiRoutes';
import {setCacheItem} from '@/api/user';
import {generalRequest} from '@/api/utility.js';
import {style} from '../../../../components/web/largeScreen/header/Style.jsx';
import {CommonButton, MyView, PhoneView} from '@/styles';
import {CommonTextInput} from '@/styles/common/CommonTextInput.jsx';
import commonTranlator from '../../../../translator/common.js';
import translator from '../translate';
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
        undefined,
        ['username', 'password'],
      ),
    ])
      .then(res => {
        if (res[0] !== null) {
          Promise.all([
            setCacheItem('token', res[0].token),
            setCacheItem('user', JSON.stringify(res[0].user)),
          ]).then(r => {
            props.setToken(res[0].token);
          });
        } else {
          props.setLoading(false);
        }
      })
      .catch(e => {
        props.setLoading(false);
      });
  }, [props, username, password]);
  return (
    <MyView
      style={{
        ...style.ParentLoginModule,
        ...style.marginTop25,
      }}>
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
        style={{
          marginTop: 20,
        }}
      />
      <PhoneView>
        <CommonButton
          onPress={() => requestLogin()}
          title={commonTranlator.entrance}
        />
        <CommonButton
          theme={'dark'}
          onPress={() => props.changeMode('signUp')}
          title={'ثبت نام'}
        />

        <CommonButton
          theme={'orangeRed'}
          onPress={() => props.changeMode('forget')}
          title={'فراموشی رمزعبور'}
        />
      </PhoneView>
    </MyView>
  );
};
export default Login;
