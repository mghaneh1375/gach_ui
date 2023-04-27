import {ToastAndroid, Dimensions, Platform} from 'react-native';
import {Device} from '../models/Device';
import moment from 'moment-jalaali';
import {Store} from 'react-notifications-component';
import {generalRequest} from '../API/Utility';
import commonTranslator from '../translator/Common';
import {defaultSystemFonts} from 'react-native-render-html';

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

export const p2e = s => {
  return parseInt(s.replace(/[۰-۹]/g, d => '۰۱۲۳۴۵۶۷۸۹'.indexOf(d)));
};

export function simpleConvertTimestamp(unix_timestamp) {
  return moment.unix(unix_timestamp / 1000).format('jYYYY/jM/jD - HH:mm');
}

export function convertSecToMin(sec) {
  return new Date(sec * 1000).toISOString().substr(11, 8);
}

export function convertSecToMinWithOutHour(sec) {
  return new Date(sec * 1000).toISOString().substr(14, 5);
}

export function convertSecToMinWithOutSec(sec) {
  if (sec < 0) return '';
  const d = new Date(sec * 1000).toISOString();

  let h = d.substr(11, 2);

  if (h[0] == 0) h = h[1];

  let m = d.substr(14, 2);
  if (m[0] == 0) m = m[1];

  if (h[0] > 0) {
    if (m > 0) return h + ' ساعت ' + m + ' دقیقه ';
    return h + ' ساعت ';
  }

  return +m + ' دقیقه ';
}

export function convertTimestamp(unix_timestamp) {
  if (unix_timestamp === undefined || unix_timestamp === '') return '...';
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
  if (msg === undefined) msg = commonTranslator.success;

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

export function showWarnign(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }
  //  else if (Platform.OS === 'ios') {
  //   AlertIOS.alert(msg);
  // }
  else {
    Store.addNotification({
      title: 'هشدار',
      message: msg,
      type: 'warning',
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

export const removeItems = (items, setItems, removedIds) => {
  let allItems = items;
  allItems = allItems.filter(elem => removedIds.indexOf(elem.id) === -1);
  setItems(allItems);
};

export const changeText = (text, setter) => {
  setter(text);
};

export const addItem = (items, setItems, item) => {
  let allItems = items;
  allItems.unshift(item);
  setItems(allItems);
};

export const editItem = (items, setItems, item) => {
  let allItems = items;

  allItems = allItems.map(elem => {
    if (elem.id === item.id) return item;
    return elem;
  });
  setItems(allItems);
};

export const isUserAdmin = user => {
  if (user === undefined || user === null) return false;

  if (
    user.accesses.indexOf('admin') === -1 &&
    user.accesses.indexOf('superadmin') === -1
  )
    return false;

  return true;
};

export const isUserAdvisor = user => {
  if (user === undefined || user === null) return false;

  if (user.accesses.indexOf('advisor') === -1) return false;

  return true;
};

export const sexKeyVals = [
  {item: 'آقا', id: 'male'},
  {item: 'خانم', id: 'female'},
];

export const trueFalseValues = [
  {item: commonTranslator.yes, id: true},
  {item: commonTranslator.no, id: false},
];

export const allTrueFalseValues = [
  {item: commonTranslator.yes, id: true},
  {item: commonTranslator.no, id: false},
  {item: commonTranslator.all, id: 'all'},
];

export function formatPrice(Number) {
  Number += '';
  Number = Number.replace(',', '');
  let x = Number.split('.');
  let y = x[0];
  let z = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(y)) y = y.replace(rgx, '$1' + ',' + '$2');
  return y + z;
}

export const tagsStyles = {
  h1: {
    fontFamily: 'IRANSans',
  },
  h2: {
    fontFamily: 'IRANSans',
  },
  h3: {
    fontFamily: 'IRANSans',
  },
  h4: {
    fontFamily: 'IRANSans',
  },
  h5: {
    fontFamily: 'IRANSans',
  },
  h6: {
    fontFamily: 'IRANSans',
  },
  a: {
    fontFamily: 'IRANSans',
  },
  p: {
    fontFamily: 'IRANSans',
  },
  span: {
    fontFamily: 'IRANSans',
  },
  div: {
    fontFamily: 'IRANSans',
  },
  li: {
    fontFamily: 'IRANSans',
  },
};

export const systemFonts = [...defaultSystemFonts, 'IRANSans'];

export const setImgSize = (
  width,
  height,
  widthSetter,
  heightSetter,
  totalWidth,
  isInPhone,
) => {
  widthSetter(
    totalWidth > 1500
      ? totalWidth - 340
      : !isInPhone
      ? totalWidth - 250
      : totalWidth - 50,
  );
  heightSetter(
    totalWidth > 1500
      ? ((totalWidth - 340) * height) / width
      : !isInPhone
      ? ((totalWidth - 250) * height) / width
      : ((totalWidth - 50) * height) / width,
  );
};
