import React from 'react';
import BackgroundScrollView from './../../../components/BackgroundScrollView';
import translator from './translator';
import {Device} from './../../../models/Device';

import {getDevice, getWidthHeight} from './../../../services/Utility';

import {ScreenScroll} from '../../../styles/Common';
import {ImageBackground} from 'react-native';

const device = getDevice();

const Home = navigator => {
  const wH = getWidthHeight();
  const width = wH[0];
  const height = wH[1];

  return (
    <ScreenScroll style={{height: '100vh'}}>
      <ImageBackground
        resizeMode="cover"
        style={{height: '100%'}}
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
