import React, {useState} from 'react';
import BackgroundScrollView from './../../../components/BackgroundScrollView';
import translator from './translator';
import {Device} from './../../../models/Device';

import {getToken} from './../../../API/User';
import {getDevice, getWidthHeight} from './../../../services/Utility';

import {ScreenScroll} from '../../../styles/Common';
import {ImageBackground} from 'react-native';

import {globalStateContext, dispatchStateContext} from './../../../App';

const device = getDevice();

const Home = navigator => {
  const wH = getWidthHeight();
  const width = wH[0];
  const height = wH[1];
  const [token, setToken] = useState(undefined);

  // React.useEffect(() => {
  //   Promise.all([getToken()]).then(res => {
  //     setToken(res);
  //   });
  // }, []);

  // React.useEffect(() => {
  //   dispatch({token: token});
  // }, [token, dispatch]);

  return (
    <ScreenScroll>
      <ImageBackground
        resizeMode="cover"
        style={device.indexOf(Device.App) !== -1 ? {} : {marginTop: '-50px'}}
        source={
          device.indexOf(Device.App) !== -1
            ? require('./../../../images/back1.png')
            : require('./../../../images/back3.png')
        }>
        <BackgroundScrollView
          images={[
            {
              src: require('./../../../images/slider.png'),
              title: translator.slider1Title,
              subTitle: translator.slider1SubTitle,
              text: translator.slider1Text,
              idx: 0,
            },
            {
              src: require('./../../../images/slider1.png'),
              title: translator.slider2Title,
              subTitle: translator.slider2SubTitle,
              text: translator.slider2Text,
              idx: 1,
            },
            {
              src: require('./../../../images/slider2.png'),
              title: translator.slider3Title,
              subTitle: translator.slider3SubTitle,
              text: translator.slider3Text,
              idx: 2,
            },
          ]}
          width={width}
          height={device.indexOf(Device.Large) !== -1 ? height : 'auto'}
          imgHeight={300}
          scrollable={3}
          scrollDelay={7000}
          inJustImage={false}
          textCol={4}
          margins={
            device.indexOf(Device.Large) !== -1
              ? [100, 100, 100, 100]
              : [10, device.indexOf(Device.App) !== -1 ? 10 : 80, 10, 10]
          }
          device={device}
        />
      </ImageBackground>
    </ScreenScroll>
  );
};

export default Home;
