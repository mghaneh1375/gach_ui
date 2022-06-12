import {AUTHENTICATED, NOT_AUTHENTICATED} from './actionTypes';

import Axios from 'axios';
import {BASE_URL, COMMON_HEADER, showError} from './Utility';

const base = 'user';

const setToken = token => {
  localStorage.setItem('token', token);
  localStorage.setItem('lastLoginTime', new Date(Date.now()).getTime());
};

export const getToken = () => {
  const now = new Date(Date.now()).getTime();
  const timeAllowed = 1000 * 60 * 30;
  const timeSinceLastLogin = now - localStorage.getItem('lastLoginTime');
  if (timeSinceLastLogin < timeAllowed) {
    return localStorage.getItem('token');
  }
};

const deleteToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('lastLoginTime');
};

export const signIn = user => {
  return dispatch => {
    Axios({
      url: '/signIn',
      method: 'post',
      baseURL: BASE_URL + base,
      headers: COMMON_HEADER,
      data: JSON.stringify({user}),
    })
      .then(function (response) {
        var data = response.data;

        if (data.status === 'nok') {
          showError(data.msg);
          dispatch({type: NOT_AUTHENTICATED});
        } else if (data.status === 'ok') {
          showError('success');
          setToken(data.token);
          // dispatch({type: AUTHENTICATED, payload: data.user});
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
};
