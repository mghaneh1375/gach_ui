import Axios from 'axios';
import {showError} from '../services/Utility';
import commonTranslator from './../translator/Common';
import {removeAuthCache} from './User';

// export const BASE_SITE_NAME = 'http://localhost:3000/';
export const BASE_SITE_NAME = 'https://e.irysc.com/';

// export const CV_BASE_URL = 'http://127.0.0.1:8089/api/';
export const CV_BASE_URL = 'https://cv.irysc.com/api/';

// export const VIDEO_BASE_URL = 'http://127.0.0.1:8086/video_api/';
export const VIDEO_BASE_URL = 'https://video.irysc.com/video_api/';

// export const BASE_URL = 'http://127.0.0.1:8080/api/';
// export const BASE_URL = 'http://192.168.1.101:8080/api/';
export const BASE_URL = 'https://e.irysc.com/api/';

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

export const COMMON_DOWNLOAD_HEADER = () => {
  return {
    'content-type': 'application/json',
  };
};

export const COMMON_DOWNLOAD_HEADER_AUTH = token => {
  return {
    'content-type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
};

export const COMMON_FILE_REQUEST_DOWNLOAD_RES_HEADER_AUTH = token => {
  return {
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
  if (
    url.indexOf('fetchUser') !== -1 &&
    (token === undefined || token === null)
  )
    return null;

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
    baseURL: url.indexOf('https:') === -1 ? BASE_URL : '',
    headers:
      token !== null && token !== undefined
        ? COMMON_HEADER_AUTH(token)
        : COMMON_HEADER,
    data: data,
  })
    .then(async function (response) {
      var data = response.data;
      if (data.status === 'nok') {
        if (data.msg === 'Token is not valid') {
          await removeAuthCache();
          showError(data.msg);
          window.location.href = '/';
          return undefined;
          // return null;
        }

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
    .catch(async function (error) {
      if (
        error.response !== undefined &&
        error.response.data !== undefined &&
        error.response.data.msg === 'Token is not valid'
      ) {
        if (token !== null) await removeAuthCache();

        showError('توکن شما منقضی شده است و نیاز است لاگین کنید');
        window.location.href = '/login';
        return undefined;
      } else if (error.response.status === 401) {
        showError('شما دسترسی لازم برای انجام این کار را ندارید');
      } else {
        showError(commonTranslator.opErr);
      }
      return null;
    });

  return res;
};

export const videoGeneralRequest = async (
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
    baseURL: VIDEO_BASE_URL,
    headers:
      token !== null && token !== undefined
        ? COMMON_HEADER_AUTH(token)
        : COMMON_HEADER,
    data: data,
  })
    .then(async function (response) {
      var data = response.data;
      if (data.status === 'nok') {
        if (data.msg === 'Token is not valid') {
          await removeAuthCache();
          return undefined;
        }

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

export const downloadRequest = async (
  url,
  data,
  token = null,
  mandatoryFields = undefined,
  filename = undefined,
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
    method: 'get',
    baseURL: BASE_URL,
    headers:
      token !== null && token !== undefined
        ? COMMON_DOWNLOAD_HEADER_AUTH(token)
        : COMMON_DOWNLOAD_HEADER(),
    responseType: 'blob',
    data: data,
  })
    .then(async function (response) {
      if (response === undefined || response === null) {
        showError(data.msg);
        return null;
      }
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      if (filename === undefined) link.setAttribute('download', 'file.pdf');
      else link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      return 'ok';
    })
    .catch(function (error) {
      showError(commonTranslator.opErr);
      return null;
    });

  return res;
};

export const fileRequestWithDownloadResponse = async (
  url,
  method,
  data,
  token = null,
) => {
  let res = await Axios({
    url: url,
    method: method,
    baseURL: BASE_URL,
    headers:
      token !== null && token !== undefined
        ? COMMON_FILE_REQUEST_DOWNLOAD_RES_HEADER_AUTH(token)
        : [],
    responseType: 'blob',
    data: data,
  })
    .then(async function (response) {
      if (response === undefined || response === null) {
        showError(data.msg);
        return null;
      }
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.xlsx');
      document.body.appendChild(link);
      link.click();
      return 'ok';
    })
    .catch(function (error) {
      console.log(error);
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
  additionalData = undefined,
  mandatoryFields = undefined,
) => {
  if (additionalData !== undefined && additionalData !== null) {
    try {
      if (mandatoryFields !== undefined)
        additionalData = preProcess(additionalData, mandatoryFields);
      data.append('json', JSON.stringify(additionalData));
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
      console.log(error);
      showError(commonTranslator.opErr);
      return null;
    });

  return res;
};

export const videoFileRequest = async (
  url,
  data,
  dataShouldReturnKey,
  token,
) => {
  let res = await Axios({
    url: url,
    method: 'put',
    baseURL: VIDEO_BASE_URL,
    headers: COMMON_FILE_HEADER_AUTH(token),
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
      console.log(error);
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
        console.log(element);
        console.log(data[element]);
        showError(commonTranslator.pleaseFillAllFields);
        throw 'please fill all mandatory fields';
      }
    }
  }

  let newData = {};

  for (const [key, value] of Object.entries(data)) {
    if (value === undefined || value.length === 0) continue;

    if (typeof value === 'boolean') newData[key] = value;
    else if (typeof value !== 'object' && !isNaN(value)) {
      if (typeof value === 'string' && value[0] == '0' && value[1] !== '.')
        newData[key] = value;
      else if (key === 'password' || key === 'rPassword' || key === 'code')
        newData[key] = value.toString();
      else newData[key] = Number(value);
    } else newData[key] = value;
  }

  return newData;
};
