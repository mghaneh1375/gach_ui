import React, {useState} from 'react';
import BackgroundScollView from './../components/BackgroundScrollView';
import translator from './../tranlates/Home';
import {Device} from './../models/Device';
import {useIsFocused} from '@react-navigation/native';
import {Text, ScrollView} from 'react-native';
import {
  ScreenContentContainerStyle,
  ScreenScrollBar,
} from '../styles/Android/Common';
import {getToken} from './../API/User';
import {getDevice, getWidthHeight} from '../services/Utility';

import {dispatchStateContext, globalStateContext} from './../App';

const device = getDevice();

const Home = navigator => {
  [width, height] = getWidthHeight();
  const isFocused = useIsFocused();
  const [token, setToken] = useState(undefined);

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [globalStates, dispatch] = useGlobalState();

  React.useEffect(() => {
    if (navigator.navigation.isFocused()) dispatch({showBottonNav: true});
  }, [isFocused]);

  React.useEffect(() => {
    new Promise.all([getToken()]).then(res => {
      setToken(res);
    });
  }, []);

  React.useEffect(() => {
    console.log('token is ' + token);
    dispatch({token: token});
  }, [token]);

  return (
    <ScrollView
      style={ScreenScrollBar}
      contentContainerStyle={ScreenContentContainerStyle}>
      <BackgroundScollView
        images={[
          {
            src: require('./../images/back.jpg'),
            title: translator.slider1Title,
            subTitle: translator.slider1SubTitle,
            text: translator.slider1Text,
            idx: 0,
          },
          {src: require('./../images/slider.jpg'), text: 'salam2', idx: 1},
        ]}
        width={width}
        height={device === Device.Large ? height : 'auto'}
        imgHeight={200}
        scrollable={2}
        scrollDelay={10000}
        inJustImage={false}
        textCol={4}
        margins={
          device === Device.Large ? [100, 100, 100, 100] : [10, 10, 10, 10]
        }
        device={device}
      />

      <Text>salam8</Text>
      <Text>salam9</Text>
      <Text>salam10</Text>
      <Text>salam11</Text>
      <Text>salam12</Text>
      <Text>salam13</Text>
      <Text>salam14</Text>
      <Text>salam15</Text>

      <Text>salam0</Text>
      <Text>salam1</Text>
      <Text>salam2</Text>
      <Text>salam3</Text>
      <Text>salam4</Text>
      <Text>salam5</Text>
      <Text>salam6</Text>
      <Text>salam7</Text>
      <Text>salam8</Text>
      <Text>salam9</Text>
      <Text>salam10</Text>
      <Text>salam11</Text>
      <Text>salam12</Text>
      <Text>salam13</Text>
      <Text>salam14</Text>
      <Text>salam15</Text>
    </ScrollView>
  );
};

export default Home;
