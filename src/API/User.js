import {generalRequest} from './Utility';
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
  let secToken = await getToken('token_sec');
  if (secToken !== undefined) {
    let secUser = await getUser('user_sec');
    if (secUser !== undefined) {
      await setCacheItem('token', secToken);
      await setCacheItem('user', secUser);
      await setCacheItem('token_sec', undefined);
      await setCacheItem('user_sec', undefined);
      return;
    }
  }

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

export const getToken = async (key = 'token') => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null && value !== undefined && value != 'undefined')
      return value;
  } catch (e) {
    return null;
  }
};

export const getUser = async (key = 'user') => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null && value !== undefined && value != 'undefined') {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log(e);
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
