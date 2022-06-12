import Axios from 'axios';
import {BASE_URL, COMMON_HEADER, showError} from './Utility';
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

export const signIn = (username, password) => {
  Axios({
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

      if (data.status === 'nok') showError(data.msg);
      else if (data.status === 'ok') {
        showError('success');
        setToken(data.token);
      }
    })
    .catch(function (error) {
      // if (error.response) {
      //   // Request made and server responded
      //   console.log(error.response.data);
      //   console.log(error.response.status);
      //   console.log(error.response.headers);
      // } else if (error.request) {
      //   // The request was made but no response was received
      //   console.log(error.request);
      // } else {
      //   // Something happened in setting up the request that triggered an Error
      //   console.log('Error', error.message);
      // }
    });
};
