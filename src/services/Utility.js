import {Dimensions, Platform} from 'react-native';
import {Device} from '../models/Device';

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
