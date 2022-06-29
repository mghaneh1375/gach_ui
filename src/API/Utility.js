import Axios from 'axios';
import {showError} from '../services/Utility';

import commonTranslator from './../tranlates/Common';

// export const BASE_URL = 'http://192.168.1.102:8080/api/';
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

export const COMMON_FILE_HEADER = () => {
  return {
    accept: 'application/json',
  };
};

export const COMMON_FILE_HEADER_AUTH = token => {
  return {
    accept: 'application/json',
    Authorization: 'Bearer ' + token,
  };
};

export const generalRequest = async (
  url,
  method,
  data,
  dataShouldReturnKey,
  token = null,
  mandatoryFields = undefined,
) => {
  if (data !== undefined && data !== null) {
    try {
      data = preProcess(data, mandatoryFields);
    } catch (err) {
      throw 'preProccess err';
    }
  }
  let res = await Axios({
    url: url,
    method: method,
    baseURL: BASE_URL,
    headers:
      token !== null && token !== undefined
        ? COMMON_HEADER_AUTH(token)
        : COMMON_HEADER,
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

export const fileRequest = async (
  url,
  method,
  data,
  dataShouldReturnKey,
  token = null,
) => {
  let res = await Axios({
    url: url,
    method: method,
    baseURL: BASE_URL,
    headers:
      token !== null && token !== undefined
        ? COMMON_FILE_HEADER_AUTH(token)
        : COMMON_FILE_HEADER,
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

export const preProcess = (data, mandatoryFields = undefined) => {
  if (mandatoryFields !== undefined) {
    for (let i = 0; i < mandatoryFields.length; i++) {
      const element = mandatoryFields[i];
      if (data[element] === undefined || data[element].length === 0) {
        showError(commonTranslator.pleaseFillAllFields);
        throw 'please fill all mandatory fields';
      }
    }
  }

  let newData = {};

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value.length === 0) continue;
    if (typeof value === 'boolean') newData[key] = value;
    else if (!isNaN(value)) newData[key] = Number(value);
    else newData[key] = value;
  }

  return newData;
};
