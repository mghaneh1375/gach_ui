import Axios from 'axios';
import {showError} from '../services/Utility';
import commonTranslator from './../translator/Common';
import {removeAuthCache} from './User';

// export const BASE_SITE_NAME = 'http://localhost:3000/';
export const BASE_SITE_NAME = 'https://e.irysc.com/';

// export const CV_BASE_URL = 'http://192.168.0.106:8090/api/';
export const CV_BASE_URL = 'https://cv.irysc.com/api/';
export const VIDEO_BASE_URL = 'http://192.168.100.6:8081/api/';

// export const BASE_URL = 'http://192.168.43.251:8080/api/';
export const BASE_URL = 'http://192.168.100.6:8080/api/';
// export const BASE_URL = 'http://192.168.0.106:8080/api/';
// export const BASE_URL = 'https://e.irysc.com/api/';

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
          // showError(data.msg);
          // window.location.href = '/';
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
    baseURL: url.indexOf('https:') === -1 ? VIDEO_BASE_URL : '',
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
      link.setAttribute('download', 'file.pdf');
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

// export const videoFileRequest = async (url, response, token) => {
//   const chunk = new ChunkUpload({
//     path: response.path, // Path to the file
//     size: 10095, // Chunk size (must be multiples of 3)
//     fileName: response.fileName, // Original file name
//     fileSize: response.size, // Original file size

//     // Errors
//     onFetchBlobError: e => console.log(e),
//     onWriteFileError: e => console.log(e),
//   });

//   chunk.digIn((file, next, retry, unlink) => {
//     console.log(file);
//     const body = new FormData();
//     body.append('file', file.blob);

//     Axios.post(VIDEO_BASE_URL + url, body, {
//       headers: {
//         // "Content-Type": "multipart/form-data",
//         Accept: 'application/json',
//         Authorization: 'Bearer ' + token,
//         'x-chunk-number': file.headers['x-chunk-number'],
//         'x-chunk-total-number': file.headers['x-chunk-total-number'],
//         'x-chunk-size': file.headers['x-chunk-size'],
//         'x-file-name': file.headers['x-file-name'],
//         'x-file-size': file.headers['x-file-size'],
//         'x-file-identity': file.headers['x-file-identity'],
//       },
//     })
//       .then(response => {
//         switch (response.status) {
//           case 200:
//             console.log(response.data);
//             break;

//           case 201:
//             console.log(`${response.data.progress}% uploaded...`);
//             next();
//             break;
//         }
//       })
//       .catch(error => {
//         if (error.response) {
//           if ([400, 404, 415, 500, 501].includes(error.response.status)) {
//             console.log(error.response.status, 'Failed to upload the chunk.');
//             unlink(file.path);
//           } else if (error.response.status === 422) {
//             unlink(file.path);
//           } else {
//             console.log('Re-uploading the chunk...');
//             retry();
//           }
//         } else {
//           console.log('Re-uploading the chunk...');

//           retry();
//         }
//       });
//   });
// };

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
