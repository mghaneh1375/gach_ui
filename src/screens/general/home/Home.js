import React, {useState} from 'react';
import BackgroundScrollView from './../../../components/BackgroundScrollView';
import translator from './translator';
import {Device} from './../../../models/Device';
import {Image} from 'react-native';

import {getDevice, getWidthHeight} from './../../../services/Utility';

import {
  MyView,
  PhoneView,
  ScreenScroll,
  SimpleText,
} from '../../../styles/Common';
import {ImageBackground} from 'react-native';
import vars from '../../../styles/root';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {generalRequest} from '../../../API/Utility';
import {routes} from '../../../API/APIRoutes';
import {useEffectOnce} from 'usehooks-ts';
import {styles} from '../../../styles/Common/Styles';
import HomeBox from './HomeBox/HomeBox';

const device = getDevice();

const Home = props => {
  const wH = getWidthHeight();
  const width = wH[0];
  const height = wH[1];
  const navigator = props.navigator;
  const isRightMenuVisible = props.isRightMenuVisible;

  const [grayFooterW, setGrayFooterW] = useState('100%');
  const [grayFooterH, setGrayFooterH] = useState('100%');

  const [orangelineupW, setorangelineupW] = useState('100%');
  const [orangelineupH, setorangelineupH] = useState('100%');

  const [orangelineupDownW, setorangelineupDownW] = useState('100%');
  const [orangelineupDownH, setorangelineupDownH] = useState('100%');

  const [whiteDividerW, setWhiteDividerW] = useState('100%');
  const [whiteDividerH, setWhiteDividerH] = useState('100%');

  const [isWorking, setIsWorking] = useState(false);
  const [data, setData] = useState();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();

  useEffectOnce(() => {
    Image.getSize(
      'https://e.irysc.com/assets/images/footergray.svg',
      (width, height) => {
        setGrayFooterW(width);
        setGrayFooterH(height);
      },
    );
    Image.getSize(
      'https://e.irysc.com/assets/images/orangelineup.svg',
      (width, height) => {
        setorangelineupW(width);
        setorangelineupH(height);
      },
    );
    Image.getSize(
      'https://e.irysc.com/assets/images/orangelinedown.svg',
      (width, height) => {
        setorangelineupDownW(width);
        setorangelineupDownH(height);
      },
    );
    Image.getSize(
      'https://e.irysc.com/assets/images/whitedevider.svg',
      (width, height) => {
        setWhiteDividerW(width);
        setWhiteDividerH(height);
      },
    );
  });

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
      <div
        style={{
          position: 'absolute',
          zIndex: 2,
          bottom: -1.5 * grayFooterH,
          left: 0,
          width: '100%',
          height: grayFooterH,
          backgroundColor: 'white',
        }}>
        <MyView
          style={{
            background: '#ffffffcc',
            zIndex: 20,
            position: 'absolute',
            top: -170,
            width: '100%',
            maxWidth: '100%',
            overflow: 'auto',
          }}>
          <PhoneView
            style={{
              ...styles.gap100,
              ...styles.alignSelfCenter,
              ...{
                paddingLeft: 50,
                paddingRight: 50,
                paddingTop: 20,
                paddingBottom: 20,
                flexWrap: 'no-wrap',
                width: 'fit-content',
              },
            }}>
            <HomeBox
              color="blue"
              text="سوالات"
              number={data !== undefined ? data.questions : ''}
            />
            <HomeBox
              color="orangered"
              text="مدارس"
              number={data !== undefined ? data.schools : ''}
            />
            <HomeBox
              color="orange"
              text="دانش آموز"
              number={data !== undefined ? data.students : ''}
            />
          </PhoneView>
        </MyView>
        <div
          style={{
            position: 'absolute',
            zIndex: 2,
            top: '-100%',
            right: 0,
            maxWidth: '100%',
            width: whiteDividerW,
            height: whiteDividerH,
            background: 'url(./assets/images/whitedevider.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'right',
            backgroundRepeat: 'no-repeat',
          }}></div>
        <div
          style={{
            position: 'absolute',
            zIndex: 2,
            top: 'calc(-100% + 30px)',
            right: 0,
            maxWidth: '100%',
            width: orangelineupW,
            height: orangelineupH,
            background: 'url(./assets/images/orangelineup.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'right',
            backgroundRepeat: 'no-repeat',
          }}></div>
        <div
          style={{
            position: 'absolute',
            zIndex: 3,
            top: -50,
            right: 0,
            maxWidth: '100%',
            width: orangelineupDownW,
            height: orangelineupDownH,
            background: 'url(./assets/images/orangelinedown.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'right',
            backgroundRepeat: 'no-repeat',
          }}></div>
        <div
          style={{
            position: 'absolute',
            zIndex: 2,
            right: 0,
            maxWidth: '100%',
            width: grayFooterW,
            height: grayFooterH,
            top: 0,
            background: 'url(./assets/images/footergray.svg)',
            backgroundSize: 'cover',
            backgroundPosition: 'right',
            backgroundRepeat: 'no-repeat',
          }}></div>

        <div
          style={{
            zIndex: 10,
            position: 'absolute',
            paddingRight: 50,
            paddingLeft: 50,
            bottom: 0,
            width: 'calc(100% - 100px)',
          }}>
          <img src="./assets/images/irysc.png" width={200} />
          <MyView style={{...styles.gap10, ...styles.marginTop10}}>
            <PhoneView style={{...styles.gap10}}>
              <img src="./assets/images/address.svg" height={30} />
              <SimpleText
                style={{
                  ...styles.alignSelfCenter,
                  ...styles.BlueBold,
                }}
                text={
                  'تهران، میدان انقلاب، ابتدای خیابان آزادی، بن بست قائم مقام ، پلاک 5'
                }
              />
            </PhoneView>
            <PhoneView style={{...styles.gap10}}>
              <img src="./assets/images/phone.svg" height={25} />
              <SimpleText
                style={{
                  ...styles.alignSelfCenter,
                  ...styles.BlueBold,
                }}
                text={'02166917230'}
              />
            </PhoneView>
            <PhoneView style={{...styles.gap10}}>
              <img src="./assets/images/email.svg" height={25} />
              <SimpleText
                style={{
                  ...styles.alignSelfCenter,
                  ...styles.BlueBold,
                }}
                text={'info@irysc.com'}
              />
            </PhoneView>
            <SimpleText
              style={{
                ...styles.dark_blue_color,
              }}
              text={
                'تمام حقوق این وبسایت، مطالب، سوالات و دوره های موجود در آن متعلق به کانون دانش پژوهان ایران (آیریسک) است. هر گونه استفاده بدون مجوز از مطالب می تواند پیگرد قانونی داشته باشد.'
              }
            />
          </MyView>
        </div>
      </div>
    </ScreenScroll>
  );
};

export default Home;
