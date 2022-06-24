import React, {useState} from 'react';
import {View} from 'react-native';
import {signIn} from '../../../../API/User';
import {CommonButton} from '../../../../styles/Common';
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

    Promise.all([signIn(username, password)]).then(res => {
      props.setLoading(false);
      if (res[0] !== null) {
        props.navigate(props.toPath);
      }
    });
  };

  return (
    <View style={props.style}>
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

      <View>
        <CommonButton
          style={{marginTop: 50}}
          onPress={() => requestLogin()}
          title={commonTranlator.entrance}
        />
      </View>
    </View>
  );
};

export default Login;
