import Axios from 'axios';
import {BASE_URL, COMMON_HEADER, generalRequest, showError} from './Utility';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {routes} from './APIRoutes';
import {getDevice} from '../services/Utility';
import {Device} from '../models/Device';

const base = 'user';

export const logout = async (token, navigate) => {
  await generalRequest(routes.logout, 'post', undefined, undefined, token);

  await removeAuthCache();
  navigate(getDevice().indexOf(Device.App) !== -1 ? 'Home' : '/');
};

export const removeAuthCache = async () => {
  await setCacheItem('token', undefined);
  await setCacheItem('user', undefined);
};

export const setCacheItem = async (key, val) => {
  try {
    await AsyncStorage.setItem(key, val);
  } catch (e) {
    console.log(e);
  }
};

export const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null && value !== undefined && value != 'undefined')
      return value;
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

export const fetchUser = async (token, callBack) => {
  let result = await generalRequest(
    routes.fetchUser,
    'get',
    undefined,
    'user',
    token,
  );
  if (result == null) await removeAuthCache();
  else await setCacheItem('user', JSON.stringify(result));
  callBack(result);
};
