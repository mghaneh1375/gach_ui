import Axios from 'axios';
import {ToastAndroid, Platform} from 'react-native'; //(Platform.OS === 'android')

import commonTranslator from './../tranlates/Common';

export const BASE_URL = 'http://192.168.0.106:8080/api/';

export const COMMON_HEADER = {
  'content-type': 'application/json',
  accept: 'application/json',
};

export const COMMON_HEADER_AUTH = token => {
  return {
    'content-type': 'application/json',
    accept: 'application/json',
    Authorization: 'Bearer ' + token,
  };
};

export function showError(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }
  //  else if (Platform.OS === 'ios') {
  //   AlertIOS.alert(msg);
  // }
  else alert(msg);
}

export const generalRequest = async (
  url,
  method,
  data,
  dataShouldReturnKey,
  needAuth = false,
  token = null,
) => {
  let res = await Axios({
    url: url,
    method: method,
    baseURL: BASE_URL,
    headers: needAuth ? COMMON_HEADER_AUTH(token) : COMMON_HEADER,
    data: data,
  })
    .then(function (response) {
      var data = response.data;
      if (data.status === 'nok') {
        showError(data.msg);
        return null;
      }

      if (data.status === 'ok') {
        if (dataShouldReturnKey === undefined) return true;
        if (dataShouldReturnKey instanceof Array) {
          var output = {};
          var key;
          for (var i = 0; i < dataShouldReturnKey.length; i++) {
            key = dataShouldReturnKey[i];
            output[key] = data[key];
          }

          return output;
        }

        return data[dataShouldReturnKey];
      }
    })
    .catch(function (error) {
      showError(commonTranslator.opErr);
      return null;
    });

  return res;
};
