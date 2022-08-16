import React from 'react';
import BackgroundScrollView from './../../../components/BackgroundScrollView';
import translator from './translator';
import {Device} from './../../../models/Device';

import {getDevice, getWidthHeight} from './../../../services/Utility';

import {ScreenScroll} from '../../../styles/Common';
import {ImageBackground} from 'react-native';
import {log} from 'react-native-reanimated';
import {MyView} from 'react-native-multi-selectbox';

const device = getDevice();

const Home = props => {
  const wH = getWidthHeight();
  const width = wH[0];
  const height = wH[1];
  const navigator = props.navigator;
  const hideRightMenu = props.hideRightMenu;

  return (
    <ScreenScroll style={{background: 'transparent'}}>
      <div
        style={{
          position: 'fixed',
          zIndex: -1,
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'url(./assets/images/back3.png)',
        }}>
        {/* <ImageBackground
        style={{
          height: '100%',
          // width: hideRightMenu ? '100%' : width + 200,
          // marginRight: hideRightMenu ? 0 : -200,
        }}
        source={
          device.indexOf(Device.App) !== -1
            ? require('./../../../images/back1.png')
            : require('./../../../images/back3.png')
        }> */}

        {/* </ImageBackground> */}
      </div>
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
        width={hideRightMenu ? width : width - 200}
        height={device.indexOf(Device.Large) !== -1 ? height : 'auto'}
        imgHeight={300}
        inJustImage={false}
        textCol={4}
        margins={
          device.indexOf(Device.Large) !== -1
            ? [100, 50, 100, 10]
            : [10, device.indexOf(Device.App) !== -1 ? 10 : 80, 10, 10]
        }
        device={device}
      />
    </ScreenScroll>
  );
};

export default Home;
