import React, {useState} from 'react';
import {View} from 'react-native';
import {signIn} from '../../../../../API/User';
import {CommonButton, CommonTextInput} from '../../../../../styles/Common';
import commonTranlator from './../../../../../tranlates/Common';
import loginTranslator from './../../translate';
import {useNavigate} from 'react-router-dom';

const Login = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const changeInput = (label, value) => {
    if (label === 'username') setUsername(value);
    else if (label === 'password') setPassword(value);
  };

  const navigate = useNavigate();

  const requestLogin = () => {
    props.setLoading(true);

    Promise.all([signIn(username, password)]).then(res => {
      props.setLoading(false);
      if (res[0] !== null) {
        navigate('/');
      }
    });
  };

  return (
    <View>
      <CommonTextInput
        placeholder={loginTranslator.phoneOrMail}
        subText={loginTranslator.phoneOrMail}
        onChangeText={e => changeInput('username', e)}
      />
      <CommonTextInput
        placeholder={commonTranlator.password}
        subText={loginTranslator.passwordFilter}
        type={'password'}
        onChangeText={e => changeInput('password', e)}
        style={{marginTop: '20px'}}
      />
      <View>
        <CommonButton
          onPress={() => requestLogin()}
          title={commonTranlator.entrance}
        />
      </View>
    </View>
  );
};

export default Login;
