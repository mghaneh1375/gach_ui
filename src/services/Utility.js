import {Dimensions, Platform} from 'react-native';
import {Device} from '../models/Device';
import JDate from 'jalali-date';

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

export function convertTimestamp(unix_timestamp) {
  let date = new Date(unix_timestamp);
  let jdate = new JDate(date);
  return (
    jdate.format('تاریخ: YYYY/MM/DD ساعت: ') +
    date.getHours() +
    ':' +
    date.getMinutes()
  );
}
