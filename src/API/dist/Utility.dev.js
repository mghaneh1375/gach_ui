'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.preProcess =
  exports.fileRequest =
  exports.downloadRequest =
  exports.generalRequest =
  exports.COMMON_DOWNLOAD_HEADER_AUTH =
  exports.COMMON_DOWNLOAD_HEADER =
  exports.COMMON_FILE_HEADER_AUTH =
  exports.COMMON_FILE_HEADER =
  exports.COMMON_HEADER_AUTH =
  exports.COMMON_HEADER =
  exports.BASE_URL =
  exports.BASE_SITE_NAME =
    void 0;

var _axios = _interopRequireDefault(require('axios'));

var _Utility = require('../services/Utility');

var _Common = _interopRequireDefault(require('./../translator/Common'));

var _User = require('./User');

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {default: obj};
}

function _typeof(obj) {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError('Invalid attempt to destructure non-iterable instance');
}

function _iterableToArrayLimit(arr, i) {
  if (
    !(
      Symbol.iterator in Object(arr) ||
      Object.prototype.toString.call(arr) === '[object Arguments]'
    )
  ) {
    return;
  }
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (
      var _i = arr[Symbol.iterator](), _s;
      !(_n = (_s = _i.next()).done);
      _n = true
    ) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i['return'] != null) _i['return']();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

var BASE_SITE_NAME = 'http://localhost:3000/'; //export const BASE_URL = 'http://192.168.1.103:8080/api/';

exports.BASE_SITE_NAME = BASE_SITE_NAME;
var BASE_URL = 'http://192.168.0.106:8080/api/'; //export const BASE_URL = 'http://192.168.0.145:8080/api/';
// export const BASE_URL = 'http://185.239.106.26:8087/api/';

exports.BASE_URL = BASE_URL;
var COMMON_HEADER = {
  'content-type': 'application/json',
  accept: 'application/json',
};
exports.COMMON_HEADER = COMMON_HEADER;

var COMMON_HEADER_AUTH = function COMMON_HEADER_AUTH(token) {
  return {
    'content-type': 'application/json',
    accept: 'application/json',
    Authorization: 'Bearer ' + token,
  };
};

exports.COMMON_HEADER_AUTH = COMMON_HEADER_AUTH;

var COMMON_FILE_HEADER = function COMMON_FILE_HEADER() {
  return {
    accept: 'application/json',
  };
};

exports.COMMON_FILE_HEADER = COMMON_FILE_HEADER;

var COMMON_FILE_HEADER_AUTH = function COMMON_FILE_HEADER_AUTH(token) {
  return {
    accept: 'application/json',
    Authorization: 'Bearer ' + token,
  };
};

exports.COMMON_FILE_HEADER_AUTH = COMMON_FILE_HEADER_AUTH;

var COMMON_DOWNLOAD_HEADER = function COMMON_DOWNLOAD_HEADER() {
  return {
    'content-type': 'application/json',
  };
};

exports.COMMON_DOWNLOAD_HEADER = COMMON_DOWNLOAD_HEADER;

var COMMON_DOWNLOAD_HEADER_AUTH = function COMMON_DOWNLOAD_HEADER_AUTH(token) {
  return {
    'content-type': 'application/json',
    Authorization: 'Bearer ' + token,
  };
};

exports.COMMON_DOWNLOAD_HEADER_AUTH = COMMON_DOWNLOAD_HEADER_AUTH;

var generalRequest = function generalRequest(
  url,
  method,
  data,
  dataShouldReturnKey,
) {
  var token,
    mandatoryFields,
    res,
    _args = arguments;
  return regeneratorRuntime.async(
    function generalRequest$(_context) {
      while (1) {
        switch ((_context.prev = _context.next)) {
          case 0:
            token =
              _args.length > 4 && _args[4] !== undefined ? _args[4] : null;
            mandatoryFields =
              _args.length > 5 && _args[5] !== undefined ? _args[5] : undefined;

            if (!(data !== undefined && data !== null)) {
              _context.next = 10;
              break;
            }

            _context.prev = 3;
            data = preProcess(data, mandatoryFields);
            _context.next = 10;
            break;

          case 7:
            _context.prev = 7;
            _context.t0 = _context['catch'](3);
            throw 'preProccess err';

          case 10:
            _context.next = 12;
            return regeneratorRuntime.awrap(
              (0, _axios['default'])({
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
                    if (data.msg === 'Token is not valid')
                      (0, _User.removeAuthCache)();
                    (0, _Utility.showError)(data.msg);
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
                ['catch'](function (error) {
                  (0, _Utility.showError)(_Common['default'].opErr);
                  return null;
                }),
            );

          case 12:
            res = _context.sent;
            return _context.abrupt('return', res);

          case 14:
          case 'end':
            return _context.stop();
        }
      }
    },
    null,
    null,
    [[3, 7]],
  );
};

exports.generalRequest = generalRequest;

var downloadRequest = function downloadRequest(url, data) {
  var token,
    mandatoryFields,
    res,
    _args3 = arguments;
  return regeneratorRuntime.async(
    function downloadRequest$(_context3) {
      while (1) {
        switch ((_context3.prev = _context3.next)) {
          case 0:
            token =
              _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : null;
            mandatoryFields =
              _args3.length > 3 && _args3[3] !== undefined
                ? _args3[3]
                : undefined;

            if (!(data !== undefined && data !== null)) {
              _context3.next = 10;
              break;
            }

            _context3.prev = 3;
            data = preProcess(data, mandatoryFields);
            _context3.next = 10;
            break;

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3['catch'](3);
            throw 'preProccess err';

          case 10:
            _context3.next = 12;
            return regeneratorRuntime.awrap(
              (0, _axios['default'])({
                url: url,
                method: 'get',
                baseURL: BASE_URL,
                headers:
                  token !== null && token !== undefined
                    ? COMMON_DOWNLOAD_HEADER_AUTH(token)
                    : COMMON_DOWNLOAD_HEADER,
                responseType: 'blob',
                data: data,
              })
                .then(function _callee(response) {
                  var url, link;
                  return regeneratorRuntime.async(function _callee$(_context2) {
                    while (1) {
                      switch ((_context2.prev = _context2.next)) {
                        case 0:
                          if (!(response === undefined || response === null)) {
                            _context2.next = 3;
                            break;
                          }

                          (0, _Utility.showError)(data.msg);
                          return _context2.abrupt('return', null);

                        case 3:
                          url = window.URL.createObjectURL(
                            new Blob([response.data]),
                          );
                          link = document.createElement('a');
                          link.href = url;
                          link.setAttribute('download', 'file.pdf');
                          document.body.appendChild(link);
                          link.click();
                          return _context2.abrupt('return', 'ok');

                        case 10:
                        case 'end':
                          return _context2.stop();
                      }
                    }
                  });
                })
                ['catch'](function (error) {
                  console.log(error);
                  (0, _Utility.showError)(_Common['default'].opErr);
                  return null;
                }),
            );

          case 12:
            res = _context3.sent;
            return _context3.abrupt('return', res);

          case 14:
          case 'end':
            return _context3.stop();
        }
      }
    },
    null,
    null,
    [[3, 7]],
  );
};

exports.downloadRequest = downloadRequest;

var fileRequest = function fileRequest(url, method, data, dataShouldReturnKey) {
  var token,
    additionalData,
    mandatoryFields,
    res,
    _args4 = arguments;
  return regeneratorRuntime.async(
    function fileRequest$(_context4) {
      while (1) {
        switch ((_context4.prev = _context4.next)) {
          case 0:
            token =
              _args4.length > 4 && _args4[4] !== undefined ? _args4[4] : null;
            additionalData =
              _args4.length > 5 && _args4[5] !== undefined
                ? _args4[5]
                : undefined;
            mandatoryFields =
              _args4.length > 6 && _args4[6] !== undefined
                ? _args4[6]
                : undefined;

            if (!(additionalData !== undefined && additionalData !== null)) {
              _context4.next = 12;
              break;
            }

            _context4.prev = 4;
            if (mandatoryFields !== undefined)
              additionalData = preProcess(additionalData, mandatoryFields);
            data.append('json', JSON.stringify(additionalData));
            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4['catch'](4);
            throw 'preProccess err';

          case 12:
            _context4.next = 14;
            return regeneratorRuntime.awrap(
              (0, _axios['default'])({
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
                    (0, _Utility.showError)(data.msg);
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
                ['catch'](function (error) {
                  console.log(error);
                  (0, _Utility.showError)(_Common['default'].opErr);
                  return null;
                }),
            );

          case 14:
            res = _context4.sent;
            return _context4.abrupt('return', res);

          case 16:
          case 'end':
            return _context4.stop();
        }
      }
    },
    null,
    null,
    [[4, 9]],
  );
};

exports.fileRequest = fileRequest;

var preProcess = function preProcess(data) {
  var mandatoryFields =
    arguments.length > 1 && arguments[1] !== undefined
      ? arguments[1]
      : undefined;

  if (mandatoryFields !== undefined) {
    for (var i = 0; i < mandatoryFields.length; i++) {
      var element = mandatoryFields[i];

      if (data[element] === undefined || data[element].length === 0) {
        (0, _Utility.showError)(_Common['default'].pleaseFillAllFields);
        throw 'please fill all mandatory fields';
      }
    }
  }

  var newData = {};

  for (
    var _i = 0, _Object$entries = Object.entries(data);
    _i < _Object$entries.length;
    _i++
  ) {
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      key = _Object$entries$_i[0],
      value = _Object$entries$_i[1];

    if (value === undefined || value.length === 0) continue;
    if (typeof value === 'boolean') newData[key] = value;
    else if (_typeof(value) !== 'object' && !isNaN(value)) {
      if (typeof value === 'string' && value[0] == '0' && value[1] !== '.')
        newData[key] = value;
      else if (key === 'password' || key === 'rPassword' || key === 'code')
        newData[key] = value.toString();
      else newData[key] = Number(value);
    } else newData[key] = value;
  }

  return newData;
};

exports.preProcess = preProcess;
