import React, {useState} from 'react';
import BackgroundScrollView from '../../../components/BackgroundScrollView';
import translator from './translator';
import {Device} from '../../../models/device';
import {Image} from 'react-native';
import {getDevice, getWidthHeight} from '../../../services/utility';
import {
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  ScreenScroll,
  SimpleText,
} from '../../../styles/CommonComponents.jsx';
import vars from '../../../styles/root';
import {dispatchStateContext} from '@/App';
import {generalRequest} from '../../../api/utility';
import {routes} from '@/api/apiRoutes';
import {useEffectOnce} from 'usehooks-ts';
import {styles} from '../../../styles/common/styles';
import HomeBox from './homeBox/HomeBox';
import RSS from './rss/RSS';
const device = getDevice();
const Home = props => {
  const wH = getWidthHeight();
  const width = wH[0];
  const height = wH[1];
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
  const useGlobalState = () => [React.useContext(dispatchStateContext)];
  const [dispatch] = useGlobalState();
  const [news, setNews] = useState([]);
  const fetchNews = React.useCallback(() => {
    Promise.all([
      generalRequest(routes.fetchRSS, 'get', undefined, 'data'),
    ]).then(res => {
      if (res[0] != null) {
        setNews(res[0]);
      }
    });
  }, []);
  useEffectOnce(() => {
    Image.getSize(
      'https://e.irysc.com/assets/images/footergray.svg',
      (w, h) => {
        setGrayFooterW(w);
        setGrayFooterH(h);
      },
    );
    Image.getSize(
      'https://e.irysc.com/assets/images/orangelineup.svg',
      (w, h) => {
        setorangelineupW(w);
        setorangelineupH(h);
      },
    );
    Image.getSize(
      'https://e.irysc.com/assets/images/orangelinedown.svg',
      (w, h) => {
        setorangelineupDownW(w);
        setorangelineupDownH(h);
      },
    );
    Image.getSize(
      'https://e.irysc.com/assets/images/whitedevider.svg',
      (w, h) => {
        setWhiteDividerW(w);
        setWhiteDividerH(h);
      },
    );
    fetchNews();
  });
  const isInPhone = device.indexOf('WebPort') !== -1;
  React.useEffect(() => {
    if (isWorking || data !== undefined) return;
    setIsWorking(true);
    dispatch({
      loading: true,
    });
    Promise.all([
      generalRequest(
        routes.fetchSiteStats,
        'get',
        undefined,
        'data',
        undefined,
      ),
    ]).then(res => {
      dispatch({
        loading: false,
      });
      if (res[0] === null) return;
      setData(res[0]);
      setIsWorking(false);
    });
  }, [dispatch, props, isWorking, data]);
  return (
    <ScreenScroll
      style={{
        background: 'transparent',
      }}>
      {/* <div className={'rise-container'}>
        <div className={'rise'}>
          <div className={'lamp'}></div>
          <div className={'lamp'}></div>
          <div className={'lamp'}></div>
          <div className={'lamp'}></div>
          <div className={'lamp'}></div>
        </div>
          <div className={'rise'}>
          <div className={'lamp'}></div>
          <div className={'lamp'}></div>
          <div className={'lamp'}></div>
          <div className={'lamp'}></div>
          <div className={'lamp'}></div>
        </div>
          <div className={'rise'}>
          <div className={'lamp'}></div>
          <div className={'lamp'}></div>
          <div className={'lamp'}></div>
          <div className={'lamp'}></div>
          <div className={'lamp'}></div>
        </div>
          <div className={'rise'}>
          <div className={'lamp'}></div>
          <div className={'lamp'}></div>
          <div className={'lamp'}></div>
          <div className={'lamp'}></div>
          <div className={'lamp'}></div>
        </div>
          <div className={'rise'}>
          <div className={'lamp'}></div>
          <div className={'lamp'}></div>
          <div className={'lamp'}></div>
          <div className={'lamp'}></div>
          <div className={'lamp'}></div>
        </div>
       </div> */}
      <div
        style={{
          position: 'fixed',
          zIndex: -1,
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'url(./assets/images/back3.png)',
        }}
      />
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
        imgHeight={450}
        inJustImage={false}
        textCol={6}
        margins={
          device.indexOf(Device.Large) !== -1
            ? [100, 20, 100, 10]
            : [10, device.indexOf(Device.App) !== -1 ? 10 : 30, 10, 10]
        }
        device={device}
      />
      {isInPhone && news.length > 0 && <RSS news={news} />}
      <div
        style={{
          position: 'relative',
          marginTop: whiteDividerH,
          width: '100%',
          height: grayFooterH,
          backgroundColor: 'white',
        }}>
        <MyView
          className={'transparent-cards'}
          style={{
            background: '#ffffffcc',
            zIndex: 20,
            position: 'absolute',
            // top: width < 440 ? -320 : -170,
            top: width < 440 ? -320 : -350,
            width: '100%',
            maxWidth: '100%',
            overflow: 'auto',
          }}>
          <PhoneView
            style={{
              ...styles.alignSelfCenter,
              ...{
                paddingLeft: 50,
                paddingRight: 50,
                paddingTop: 20,
                paddingBottom: 20,
                flexWrap: 'no-wrap',
              },
            }}>
            <HomeBox
              color="blue"
              text="سوال"
              number={data !== undefined ? data.questions : ''}
            />
            <HomeBox
              color="orangered"
              text="مدرسه"
              number={data !== undefined ? data.schools : ''}
            />
            <HomeBox
              color="orange"
              text="دانش آموز"
              number={data !== undefined ? data.students : ''}
            />
          </PhoneView>
          {!isInPhone && news.length > 0 && <RSS news={news} />}
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
          }}
        />
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
          }}
        />
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
          }}
        />
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
          }}
        />

        <div
          style={{
            zIndex: 10,
            position: 'absolute',
            paddingRight: isInPhone ? 30 : 50,
            paddingLeft: isInPhone ? 30 : 50,
            bottom: isInPhone ? 70 : 0,
            width: isInPhone ? 'calc(100% - 60px)' : 'calc(100% - 100px)',
            // height: '5px',
          }}>
          {!isInPhone && (
            <EqualTwoTextInputs
              style={{
                alignItems: 'end',
              }}>
              <MyView
                style={{
                  ...styles.gap10,
                  ...styles.marginTop10,
                  marginBottom: '10px',
                }}>
                <img src="./assets/images/irysc.png" width={200} />
                <PhoneView
                  style={{
                    ...styles.gap10,
                  }}>
                  <img src="./assets/images/address.svg" height={30} />
                  <SimpleText
                    style={{
                      ...styles.alignSelfCenter,
                      ...styles.BlueBold,
                      ...{
                        width: 'calc(100% - 30px)',
                      },
                    }}
                    text={
                      'نشانی: دانشگاه صنعتی شریف، ساختمان ابن سینا، طبقه چهارم'
                    }
                  />
                </PhoneView>
                <PhoneView
                  style={{
                    ...styles.gap10,
                  }}>
                  <img src="./assets/images/phone.svg" height={25} />
                  <SimpleText
                    style={{
                      ...styles.alignSelfCenter,
                      ...styles.BlueBold,
                    }}
                    text={'021-91096320'}
                  />
                </PhoneView>
                <PhoneView
                  style={{
                    ...styles.gap10,
                  }}>
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
                    'تمام حقوق این وبسایت، مطالب، سوالات و دوره‌های موجود در آن متعلق به کانون دانش پژوهان ایران (آیریسک) است. هر گونه استفاده بدون مجوز از مطالب می تواند پیگرد قانونی داشته باشد.'
                  }
                />
              </MyView>
              <a
                referrerPolicy="origin"
                target="_blank"
                href="https://trustseal.enamad.ir/?id=605281&Code=6psLtLxVxYPeOkE2BAMj4vrq3LTCWopl">
                <img
                  referrerPolicy="origin"
                  src="https://trustseal.enamad.ir/logo.aspx?id=605281&Code=6psLtLxVxYPeOkE2BAMj4vrq3LTCWopl"
                  alt=""
                  style={{
                    cursor: 'pointer',
                  }}
                  code="6psLtLxVxYPeOkE2BAMj4vrq3LTCWopl"
                />
              </a>
            </EqualTwoTextInputs>
          )}
          {isInPhone && (
            <MyView
              style={{
                ...styles.gap10,
                ...styles.marginTop10,
                marginBottom: '10px',
              }}>
              <img src="./assets/images/irysc.png" width={200} />
              <PhoneView
                style={{
                  ...styles.gap10,
                }}>
                <img src="./assets/images/address.svg" height={20} />
                <SimpleText
                  style={{
                    ...styles.fontSize12,
                    ...styles.alignSelfCenter,
                    ...styles.BlueBold,
                    ...{
                      width: 'calc(100% - 30px)',
                    },
                  }}
                  text={
                    'نشانی: دانشگاه صنعتی شریف، ساختمان ابن سینا، طبقه چهارم'
                  }
                />
              </PhoneView>
              <PhoneView
                style={{
                  ...styles.gap10,
                }}>
                <img src="./assets/images/phone.svg" height={20} />
                <SimpleText
                  style={{
                    ...styles.fontSize12,
                    ...styles.alignSelfCenter,
                    ...styles.BlueBold,
                  }}
                  text={'021-91096320'}
                />
              </PhoneView>
              <PhoneView
                style={{
                  ...styles.gap10,
                }}>
                <img src="./assets/images/email.svg" height={20} />
                <SimpleText
                  style={{
                    ...styles.fontSize12,
                    ...styles.alignSelfCenter,
                    ...styles.BlueBold,
                  }}
                  text={'info@irysc.com'}
                />
              </PhoneView>
              <SimpleText
                style={{
                  ...styles.fontSize12,
                  ...styles.dark_blue_color,
                }}
                text={
                  'تمام حقوق این وبسایت، مطالب، سوالات و دوره‌های موجود در آن متعلق به کانون دانش پژوهان ایران (آیریسک) است. هر گونه استفاده بدون مجوز از مطالب می تواند پیگرد قانونی داشته باشد.'
                }
              />
              <a
                style={{
                  margin: '0 auto',
                }}
                referrerPolicy="origin"
                target="_blank"
                href="https://trustseal.enamad.ir/?id=605281&Code=6psLtLxVxYPeOkE2BAMj4vrq3LTCWopl">
                <img
                  referrerPolicy="origin"
                  src="https://trustseal.enamad.ir/logo.aspx?id=605281&Code=6psLtLxVxYPeOkE2BAMj4vrq3LTCWopl"
                  alt=""
                  style={{
                    cursor: 'pointer',
                  }}
                  code="6psLtLxVxYPeOkE2BAMj4vrq3LTCWopl"
                />
              </a>
            </MyView>
          )}
        </div>
      </div>
    </ScreenScroll>
  );
};
export default Home;
