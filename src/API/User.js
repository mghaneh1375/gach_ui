import Axios from 'axios';
import {BASE_URL, COMMON_HEADER, showError} from './Utility';
import AsyncStorage from '@react-native-async-storage/async-storage';

const base = 'user';

export const setCacheItem = async (key, val) => {
  try {
    await AsyncStorage.setItem(key, val);
  } catch (e) {
    // saving error
  }
};

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) return value;
  } catch (e) {
    return null;
  }
};

export const getUser = async () => {
  try {
    const value = await AsyncStorage.getItem('user');
    if (value !== null) {
      return JSON.parse(value);
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
        setCacheItem('token', data.token);
        setCacheItem('user', JSON.stringify(data.user));
        return 'ok';
      }

      return null;
    })
    .catch(function (error) {
      return null;
    });

  return res;
};
