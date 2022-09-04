import React, {useRef, useState} from 'react';
import {routes} from '../../../../API/APIRoutes';
import {setCacheItem} from '../../../../API/User';
import {generalRequest} from '../../../../API/Utility';
import {CommonButton, MyView, MyViewWithRef} from '../../../../styles/Common';
import {CommonTextInput} from '../../../../styles/Common/CommonTextInput';
import commonTranlator from './../../../../translator/Common';
import translator from './../translate';

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isWorking, setIsWorking] = useState(false);

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

  const EnterLogin = useRef(null);
  const [first, setFirst] = useState(true);
  React.useEffect(() => {
    if (EnterLogin === undefined || EnterLogin.current === undefined) return;
    console.log('====================================');
    console.log('asd');
    console.log('====================================');
    function handleKeyUp(event) {
      if (EnterLogin.current) {
        var charCode = event.which ? event.which : event.keyCode;
        if (charCode === 13 && !isWorking) {
          setIsWorking(true);
          requestLogin();
        }
      }
    }
    if (first) {
      setFirst(false);
    }
  }, [first, isWorking, requestLogin]);

  // React.useEffect(() => {
  //   if (first) return;
  //   document.addEventListener('keyup', handleKeyUp);
  //   return () => {
  //     document.addEventListener('keyup', handleKeyUp);
  //   };
  // }, [first]);

  return (
    <MyViewWithRef ref={EnterLogin} style={{paddingLeft: 50}}>
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
    </MyViewWithRef>
  );
};

export default Login;
