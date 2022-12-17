import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {
  convertSecToMinWithOutSec,
  getDevice,
} from '../../../../../services/Utility';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import RenderHTML from 'react-native-render-html';
import {styles} from '../../../../../styles/Common/Styles';
import {fetchPackage} from '../Utility';
import QuizItemCard from '../../../../../components/web/QuizItemCard';
import {Translator} from '../../Translator';
import {
  faAngleDown,
  faAngleUp,
  faClock,
  faListSquares,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import vars from '../../../../../styles/root';
import commonTranslator from '../../../../../translator/Common';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import Session from './Session';
import {useEffectOnce} from 'usehooks-ts';
import FAQ from './FAQ';

function Detail(props) {
  const [item, setItem] = useState();
  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;
  const [img, setImg] = useState();
  const [isWorking, setIsWorking] = useState(false);
  const [showDescMore, setShowDescMore] = useState(false);
  const [showPreReqMore, setShowPreReqMore] = useState(false);
  const [showPreReq, setShowPreReq] = useState(true);
  const [showSession, setShowSession] = useState(false);
  const [showFAQ, setShowFAQ] = useState(false);

  const fetchPackageLocal = React.useCallback(() => {
    if (isWorking || item !== undefined) return;
    props.setLoading(true);
    setIsWorking(true);
    Promise.all([fetchPackage(props.slug, props.token)]).then(res => {
      props.setLoading(false);
      if (res[0] === null) return;
      setItem(res[0]);
      setIsWorking(false);
    });
  }, [props, isWorking, item]);

  React.useEffect(() => {
    if (item !== undefined) setImg(item.img);
  }, [item]);

  useEffectOnce(() => {
    fetchPackageLocal();
  }, [props.slug]);

  const fontSize = props.isInPhone ? 10 : 11;
  const valFontSize = props.isInPhone ? 12 : 15;
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, {passive: true});

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {item === undefined && <></>}
      {item !== undefined && (
        <MyView
          style={{
            alignSelf: 'center',
            width: props.token === undefined && !isInPhone ? '80%' : '100%',
          }}>
          <CommonWebBox
            header={item.title}
            onBackClick={() => props.navigate('/packages')}
            backBtn={true}></CommonWebBox>
          <PhoneView>
            <CommonWebBox width={isInPhone ? '100%' : 'calc(70% - 10px)'}>
              <PhoneView>
                <Image
                  source={img}
                  resizeMode={'cover'}
                  style={{width: isInPhone ? '100%' : '60%', height: 300}}
                />
                <MyView
                  style={{
                    ...styles.padding20,
                    ...styles.gap10,
                    ...styles.textJustify,
                    ...{
                      width: isInPhone || showDescMore ? '100%' : '40%',
                      maxHeight: showDescMore ? 'unset' : 300,
                      overflow: showDescMore ? 'unset' : 'hidden',
                    },
                  }}>
                  <SimpleText
                    style={{...styles.BlueBold}}
                    text={Translator.desc}
                  />
                  <RenderHTML
                    contentWidth={'100%'}
                    source={{
                      html: item.description,
                    }}
                  />
                </MyView>
              </PhoneView>
              <SimpleText
                onPress={() => setShowDescMore(!showDescMore)}
                style={{
                  ...styles.yellow_color,
                  ...styles.alignSelfEnd,
                  ...styles.cursor_pointer,
                }}
                text={
                  showDescMore
                    ? commonTranslator.showLess
                    : commonTranslator.showMore
                }
              />
            </CommonWebBox>
            <MyView
              style={{
                position: 'fixed',
                left: props.token === undefined && !isInPhone ? '10%' : 0,
                top: scrollPosition > 100 ? 20 : 140 - scrollPosition,
                width: isInPhone ? '100%' : '25%',
              }}>
              <CommonWebBox>
                <QuizItemCard
                  text={Translator.packageDuration}
                  val={convertSecToMinWithOutSec(item.duration)}
                  icon={faClock}
                  color={vars.YELLOW}
                  textFontSize={fontSize}
                  valFontSize={valFontSize}
                />
                <QuizItemCard
                  text={Translator.sessionsCount}
                  val={item.sessionsCount}
                  icon={faListSquares}
                  textFontSize={fontSize}
                  color={vars.YELLOW}
                  valFontSize={valFontSize}
                />
                <QuizItemCard
                  text={Translator.cert}
                  val={
                    item.hasCert
                      ? commonTranslator.has
                      : commonTranslator.not_has
                  }
                  icon={faSun}
                  color={vars.YELLOW}
                  textFontSize={fontSize}
                  valFontSize={valFontSize}
                />

                <EqualTwoTextInputs>
                  <MyView></MyView>
                  {props.token !== undefined && (
                    <MyView>
                      <CommonButton title={Translator.buy} />
                      <SimpleText
                        style={{
                          ...styles.dark_blue_color,
                          ...styles.cursor_pointer,
                          ...styles.alignSelfCenter,
                          ...styles.fontSize12,
                        }}
                        text={'کد تخفیف دارید؟'}
                      />
                    </MyView>
                  )}
                  {props.token === undefined && (
                    <CommonButton
                      onPress={() => props.navigate('/login')}
                      title={Translator.loginForBuy}
                    />
                  )}
                </EqualTwoTextInputs>
              </CommonWebBox>
              <CommonWebBox header={Translator.teacherBio}>
                <SimpleText style={styles.BlueBold} text={item.teacher} />
                {item.teacherBio !== undefined &&
                  item.teacherBio !== null &&
                  item.teacherBio.length !== 0 && (
                    <MyView>
                      <MyView
                        style={{
                          ...styles.textJustify,
                          ...{
                            maxHeight: 150,
                            overflow: 'hidden',
                          },
                        }}>
                        <RenderHTML
                          contentWidth={'100%'}
                          source={{
                            html: item.teacherBio,
                          }}
                        />
                      </MyView>
                      <SimpleText
                        onPress={() => {}}
                        style={{
                          ...styles.yellow_color,
                          ...styles.alignSelfEnd,
                          ...styles.cursor_pointer,
                        }}
                        text={commonTranslator.showMore}
                      />
                    </MyView>
                  )}
              </CommonWebBox>
            </MyView>
          </PhoneView>
          {item.preReq !== undefined &&
            item.preReq !== null &&
            item.preReq.length > 0 && (
              <CommonWebBox
                btn={
                  showPreReq ? (
                    <SimpleFontIcon
                      onPress={() => setShowPreReq(!showPreReq)}
                      kind="midSize"
                      icon={faAngleDown}
                    />
                  ) : (
                    <SimpleFontIcon
                      onPress={() => setShowPreReq(!showPreReq)}
                      kind="midSize"
                      icon={faAngleUp}
                    />
                  )
                }
                width={isInPhone ? '100%' : 'calc(70% - 10px)'}
                header={Translator.preReq}>
                {showPreReq && (
                  <MyView>
                    <MyView
                      style={{
                        ...styles.textJustify,
                        ...{
                          maxHeight: showPreReqMore ? 'unset' : 200,
                          overflow: showPreReqMore ? 'unset' : 'hidden',
                        },
                      }}>
                      <RenderHTML
                        contentWidth={'100%'}
                        source={{
                          html: item.preReq,
                        }}
                      />
                    </MyView>
                    <SimpleText
                      onPress={() => setShowPreReqMore(!showPreReqMore)}
                      style={{
                        ...styles.yellow_color,
                        ...styles.alignSelfEnd,
                        ...styles.cursor_pointer,
                      }}
                      text={
                        showPreReqMore
                          ? commonTranslator.showLess
                          : commonTranslator.showMore
                      }
                    />
                  </MyView>
                )}
              </CommonWebBox>
            )}
          <CommonWebBox
            width={isInPhone ? '100%' : 'calc(70% - 10px)'}
            btn={
              showSession ? (
                <SimpleFontIcon
                  onPress={() => setShowSession(!showSession)}
                  kind="midSize"
                  icon={faAngleDown}
                />
              ) : (
                <SimpleFontIcon
                  onPress={() => setShowSession(!showSession)}
                  kind="midSize"
                  icon={faAngleUp}
                />
              )
            }
            header={Translator.sessions}></CommonWebBox>
          {showSession && (
            <MyView style={{width: isInPhone ? '100%' : 'calc(70% - 10px)'}}>
              {item.sessions.map((elem, index) => {
                return <Session session={elem} key={index} />;
              })}
            </MyView>
          )}
          <CommonWebBox
            width={isInPhone ? '100%' : 'calc(70% - 10px)'}
            btn={
              showFAQ ? (
                <SimpleFontIcon
                  onPress={() => setShowFAQ(!showFAQ)}
                  kind="midSize"
                  icon={faAngleDown}
                />
              ) : (
                <SimpleFontIcon
                  onPress={() => setShowFAQ(!showFAQ)}
                  kind="midSize"
                  icon={faAngleUp}
                />
              )
            }
            header={Translator.faq}>
            {showFAQ && (
              <MyView style={styles.gap10}>
                {item.faqs.map((elem, index) => {
                  return <FAQ elem={elem} key={index} />;
                })}
              </MyView>
            )}
          </CommonWebBox>
        </MyView>
      )}
    </>
  );
}

export default Detail;
