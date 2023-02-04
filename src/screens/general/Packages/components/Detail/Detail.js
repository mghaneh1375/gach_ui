import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {
  convertSecToMinWithOutSec,
  formatPrice,
  getDevice,
  showError,
  tagsStyles,
} from '../../../../../services/Utility';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import RenderHTML, {defaultSystemFonts} from 'react-native-render-html';
import {styles} from '../../../../../styles/Common/Styles';
import {fetchPackage, goToPay} from '../Utility';
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
import {setCacheItem} from '../../../../../API/User';
import SuccessTransaction from '../../../../../components/web/SuccessTransaction/SuccessTransaction';
import OffCode from '../../../buy/components/OffCode';
import SessionDetail from './SessionDetail';

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
  const [refId, setRefId] = useState();
  const [userOff, setUserOff] = useState();
  const [showSuccessTransaction, setShowSuccessTransaction] = useState(false);
  const [showOffCodePane, setShowOffCodePane] = useState(false);
  const [userMoney, setUserMoney] = useState(
    props.user === null ? 0 : props.user.user.money,
  );
  const [usedFromWallet, setUsedFromWallet] = useState(0);
  const [off, setOff] = useState();
  const [shouldPay, setShouldPay] = useState();
  const [selectedSession, setSelectedSession] = useState();
  const [showTeacher, setShowTeacher] = useState(false);

  const ref = React.useRef();

  const toggleShowOffCodePane = () => {
    if (
      !showOffCodePane &&
      (props.token === null || props.token === undefined || props.token === '')
    ) {
      showError(commonTranslator.shouldLogin);
      return;
    }
    setShowOffCodePane(!showOffCodePane);
  };

  React.useEffect(() => {
    if (refId === undefined) return;
    ref.current.submit();
  }, [refId]);

  const calc = accountOff => {
    let off = 0;
    let totalPrice = item.price;

    let shouldPayTmp = totalPrice;

    if (shouldPayTmp > 0 && accountOff !== undefined) {
      if (accountOff.type === 'percent') {
        off += (shouldPayTmp * accountOff.amount) / 100.0;
      } else {
        off += accountOff.amount;
      }
    }

    shouldPayTmp = totalPrice - off;

    if (shouldPayTmp > 0) {
      setUsedFromWallet(Math.min(userMoney, shouldPayTmp));
      shouldPayTmp -= userMoney;
    } else setUsedFromWallet(0);

    setOff(Math.min(off, totalPrice));
    setShouldPay(shouldPayTmp > 0 ? shouldPayTmp : 10);
  };

  const setOffCodeResult = (amount, type, code) => {
    setUserOff({type: type, amount: amount, code: code});
    calc({type: type, amount: amount, code: code});
  };

  const fetchPackageLocal = React.useCallback(() => {
    if (isWorking || item !== undefined) return;
    props.setLoading(true);
    setIsWorking(true);
    Promise.all([fetchPackage(props.slug, props.token)]).then(res => {
      props.setLoading(false);
      if (res[0] === null) return;
      setItem(res[0]);
      setIsWorking(false);
      setShouldPay(res[0].price);
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

  const goToPayLocal = async () => {
    if (
      props.token === null ||
      props.token === undefined ||
      props.token === ''
    ) {
      showError(commonTranslator.shouldLogin);
      return;
    }

    let data = {};

    if (userOff !== undefined && userOff.code !== undefined)
      data.off = userOff.code;

    props.setLoading(true);

    let res = await goToPay(props.token, data, item.id);

    props.setLoading(false);

    if (res !== null) {
      if (res.action === 'success') {
        let user = props.user;
        user.user.money = res.refId;
        await setCacheItem('user', JSON.stringify(user));
        setShowSuccessTransaction(true);
      } else if (res.action === 'pay') {
        setRefId(res.refId);
      }
    }
  };

  const systemFonts = [...defaultSystemFonts, 'IRANSans'];

  return (
    <>
      {item === undefined && <></>}
      {selectedSession !== undefined && (
        <SessionDetail
          duration={item.duration}
          adv={item.adv}
          sessions={item.sessions}
          session={selectedSession}
          toggleShow={() => setSelectedSession(undefined)}
        />
      )}
      {showTeacher && (
        <CommonWebBox
          backBtn={true}
          onBackClick={() => setShowTeacher(false)}
          header={item.teacher}>
          <RenderHTML
            source={{
              html: item.teacherBio,
            }}
            tagsStyles={tagsStyles}
            systemFonts={systemFonts}
          />
        </CommonWebBox>
      )}
      {showOffCodePane && (
        <OffCode
          token={props.token}
          for={'content'}
          setLoading={props.setLoading}
          setResult={setOffCodeResult}
          toggleShowPopUp={toggleShowOffCodePane}
        />
      )}
      {item !== undefined && showSuccessTransaction && (
        <SuccessTransaction
          navigate={props.navigate}
          link={
            <PhoneView>
              <SimpleText
                style={{
                  ...styles.dark_blue_color,
                  ...styles.fontSize13,
                  ...styles.marginLeft5,
                }}
                text={commonTranslator.forView}
              />
              <SimpleText
                onPress={() => props.navigate('/myPackages')}
                style={{
                  ...styles.BlueBold,
                  ...styles.FontWeight600,
                  ...styles.fontSize13,
                  ...styles.marginLeft5,
                  ...styles.cursor_pointer,
                }}
                text={commonTranslator.myPackages}
              />
              <SimpleText
                style={{
                  ...styles.dark_blue_color,
                  ...styles.fontSize13,
                }}
                text={commonTranslator.clickHere}
              />
            </PhoneView>
          }
        />
      )}
      {item !== undefined &&
        !showSuccessTransaction &&
        !showTeacher &&
        selectedSession === undefined && (
          <MyView
            style={{
              alignSelf: 'center',
              width: props.token === undefined && !isInPhone ? '80%' : '100%',
              gap: isInPhone ? 10 : 0,
            }}>
            <CommonWebBox
              header={item.title}
              onBackClick={() =>
                item.afterBuy !== undefined && item.afterBuy
                  ? props.navigate('/myPackages')
                  : props.navigate('/packages')
              }
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
                      tagsStyles={tagsStyles}
                      systemFonts={systemFonts}
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
                  position: isInPhone ? 'relative' : 'fixed',
                  left: props.token === undefined && !isInPhone ? '10%' : 0,
                  top: scrollPosition > 100 ? 20 : 140 - scrollPosition,
                  width: isInPhone ? '100%' : '25%',
                }}>
                {item.quizStatus !== undefined && (
                  <CommonWebBox>
                    {item.quizStatus === 'start' && (
                      <SimpleText
                        onPress={() =>
                          props.navigate('/startQuiz/content/' + item.id)
                        }
                        text={'شرکت در آزمون پایان دوره'}
                        style={{...styles.BlueBold, ...styles.cursor_pointer}}
                      />
                    )}
                    {item.quizStatus === 'result' && (
                      <EqualTwoTextInputs>
                        <SimpleText
                          onPress={() =>
                            props.navigate('/reviewQuiz/content/' + item.id)
                          }
                          style={{...styles.BlueBold, ...styles.cursor_pointer}}
                          text={' مرور آزمون پایان دوره'}
                        />
                        <SimpleText
                          onPress={() =>
                            props.navigate(
                              '/result/content/' +
                                item.finalExamId +
                                '/' +
                                props.user.user.id,
                            )
                          }
                          style={{
                            ...styles.BlueBold,
                            ...styles.cursor_pointer,
                            ...styles.colorOrangeRed,
                          }}
                          text={' مشاهده کارنامه آزمون'}
                        />
                      </EqualTwoTextInputs>
                    )}
                  </CommonWebBox>
                )}
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

                  {(item.afterBuy === undefined || !item.afterBuy) && (
                    <EqualTwoTextInputs>
                      <SimpleText
                        style={{
                          ...styles.BlueBold,
                          ...styles.fontSize17,
                          ...styles.alignSelfCenter,
                        }}
                        text={
                          commonTranslator.price +
                          ' ' +
                          formatPrice(shouldPay > 10 ? shouldPay : 0) +
                          ' ' +
                          commonTranslator.priceUnit
                        }
                      />
                      {props.token !== undefined && (
                        <MyView>
                          <CommonButton
                            onPress={() => goToPayLocal()}
                            title={Translator.buy}
                          />
                          <SimpleText
                            onPress={() => setShowOffCodePane(true)}
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
                  )}

                  {(off > 0 || usedFromWallet > 0) && (
                    <MyView>
                      {off > 0 && (
                        <PhoneView style={styles.alignItemsCenter}>
                          <SimpleText
                            text={formatPrice(off)}
                            style={{
                              ...styles.yellow_color,
                              ...styles.fontSize13,
                            }}
                          />
                          <SimpleText
                            style={{
                              ...{marginRight: 5},
                              ...styles.dark_blue_color,
                              ...styles.fontSize13,
                            }}
                            text={Translator.off}
                          />
                        </PhoneView>
                      )}
                      {usedFromWallet > 0 && (
                        <PhoneView style={styles.alignItemsCenter}>
                          <SimpleText
                            text={formatPrice(usedFromWallet)}
                            style={{
                              ...styles.yellow_color,
                              ...styles.fontSize13,
                            }}
                          />
                          <SimpleText
                            style={{
                              ...{marginRight: 5},
                              ...styles.dark_blue_color,
                              ...styles.fontSize13,
                            }}
                            text={Translator.wallet}
                          />
                        </PhoneView>
                      )}
                    </MyView>
                  )}
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
                            tagsStyles={tagsStyles}
                            systemFonts={systemFonts}
                          />
                        </MyView>
                        <SimpleText
                          onPress={() => setShowTeacher(true)}
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
                          tagsStyles={tagsStyles}
                          systemFonts={systemFonts}
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
                  return (
                    <Session
                      setSelectedSession={s =>
                        props.navigate(
                          '/packages/' + props.slug + '/' + elem.id,
                        )
                      }
                      session={elem}
                      key={index}
                    />
                  );
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

      {refId !== undefined && (
        <form
          ref={ref}
          action="https://bpm.shaparak.ir/pgwchannel/startpay.mellat"
          method="post">
          <input type={'hidden'} value={refId} name="RefId" />
        </form>
      )}
    </>
  );
}

export default Detail;
