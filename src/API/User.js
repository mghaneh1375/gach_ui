import Axios from 'axios';
import {
  BASE_URL,
  COMMON_HEADER,
  COMMON_HEADER_AUTH,
  showError,
} from './Utility';
import commonTranslator from './../tranlates/Common';
import AsyncStorage from '@react-native-async-storage/async-storage';

const base = 'user';

export const setToken = async token => {
  try {
    await AsyncStorage.setItem('token', token);
  } catch (e) {
    // saving error
  }
};

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      return value;
    }
  } catch (e) {
    return null;
  }
};

export const signIn = async (username, password) => {
  let res = await Axios({
    url: '/signIn',
    method: 'post',
    baseURL: BASE_URL + base,
    headers: COMMON_HEADER,
    data: {
      username: username,
      password: password,
    },
  })
    .then(function (response) {
      var data = response.data;

      if (data.status === 'nok') {
        showError(data.msg);
        return null;
      } else if (data.status === 'ok') {
        setToken(data.token);
        return 'ok';
      }

      return null;
    })
    .catch(function (error) {
      return null;
    });

  return res;
};
