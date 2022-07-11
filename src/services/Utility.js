import {ToastAndroid, Dimensions, Platform} from 'react-native';
import {Device} from '../models/Device';
import moment from 'moment-jalaali';
import {Store} from 'react-notifications-component';
import {generalRequest} from '../API/Utility';

export function getDevice() {
  const device = [];

  device.push(
    Dimensions.get('window').width < 768 &&
      Dimensions.get('window').height < 400
      ? Device.WebLand
      : Dimensions.get('window').width < 768
      ? Device.WebPort
      : Device.Large,
  );

  const os = Platform.OS === 'ios' || Platform.OS === 'android' ? 'app' : 'web';
  if (os === 'app') device.push(Device.App);

  return device;
}

export function getWidthHeight() {
  return [Dimensions.get('window').width, Dimensions.get('window').height];
}

export function getScreenHeight() {
  return Dimensions.get('window').height - 90;
}

export function simpleConvertTimestamp(unix_timestamp) {
  return moment.unix(unix_timestamp / 1000).format('jYYYY/jM/jD - HH:mm');
}

export function convertTimestamp(unix_timestamp) {
  return moment
    .unix(unix_timestamp / 1000)
    .format('تاریخ: jYYYY/jMM/jDD ساعت: HH:mm');
}

export function getCurrTime() {
  return moment
    .unix(Date.now() / 1000)
    .format('تاریخ: jYYYY/jMM/jDD ساعت: HH:mm');
}

export function getSimpleCurrTime() {
  return moment.unix(Date.now() / 1000).format('jYYYY/jM/jD - HH:mm');
}

export function showError(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }
  //  else if (Platform.OS === 'ios') {
  //   AlertIOS.alert(msg);
  // }
  else {
    Store.addNotification({
      title: 'خطا در انجام عملیات',
      message: msg,
      type: 'danger',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    });
  }
}

export function showSuccess(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }
  //  else if (Platform.OS === 'ios') {
  //   AlertIOS.alert(msg);
  // }
  else {
    Store.addNotification({
      title: 'نتیجه عملیات',
      message: msg,
      type: 'success',
      insert: 'top',
      container: 'top-right',
      animationIn: ['animate__animated', 'animate__fadeIn'],
      animationOut: ['animate__animated', 'animate__fadeOut'],
      dismiss: {
        duration: 3000,
        onScreen: true,
      },
    });
  }
}

export const generalUpdate = (
  url,
  data,
  setLoading,
  token,
  afterUpdate,
  mandatoryFileds = '',
  method = 'put',
  expected = undefined,
) => {
  setLoading(true);
  Promise.all([
    generalRequest(url, method, data, expected, token, mandatoryFileds),
  ]).then(res => {
    setLoading(false);
    afterUpdate(res[0]);
  });
};
