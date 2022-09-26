import React, {useState} from 'react';
import BackgroundScrollView from './../../../components/BackgroundScrollView';
import translator from './translator';
import {Device} from './../../../models/Device';

import {getDevice, getWidthHeight} from './../../../services/Utility';

import {ScreenScroll} from '../../../styles/Common';
import {ImageBackground} from 'react-native';
import vars from '../../../styles/root';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {generalRequest} from '../../../API/Utility';
import {routes} from '../../../API/APIRoutes';

const device = getDevice();

const Home = props => {
  const wH = getWidthHeight();
  const width = wH[0];
  const height = wH[1];
  const navigator = props.navigator;
  const isRightMenuVisible = props.isRightMenuVisible;

  const [isWorking, setIsWorking] = useState(false);
  const [data, setData] = useState();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();

  React.useEffect(() => {
    if (isWorking || data !== undefined) return;

    setIsWorking(true);
    dispatch({loading: true});

    Promise.all([
      generalRequest(
        routes.fetchSiteStats,
        'get',
        undefined,
        'data',
        undefined,
      ),
    ]).then(res => {
      dispatch({loading: false});

      if (res[0] === null) return;

      setData(res[0]);
      console.log(res[0]);
      setIsWorking(false);
    });
  }, [dispatch, props, isWorking, data]);

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
        width={isRightMenuVisible ? width - vars.RIGHT_MENU_WIDTH : width}
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
