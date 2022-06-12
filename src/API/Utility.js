import {ToastAndroid, Platform} from 'react-native'; //(Platform.OS === 'android')

export const BASE_URL = 'http://192.168.0.106:8080/api/';

export const COMMON_HEADER = {
  'content-type': 'application/json',
  accept: 'application/json',
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
