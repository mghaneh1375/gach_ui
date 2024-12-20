import React, {useEffect, useState} from 'react';
import {Image} from 'react-native';
import {
  convertSecToMinWithOutSecAndDay,
  faNums,
  formatPrice,
  getDevice,
  showError,
  showSuccess,
  systemFonts,
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
import RenderHTML from 'react-native-render-html';
import {styles} from '../../../../../styles/Common/Styles';
import {fetchPackage, goToPay} from '../Utility';
import {Translator} from '../../Translator';
import {
  faAngleDown,
  faAngleUp,
  faCheck,
  faClock,
  faHourglassEnd,
  faListSquares,
  faPaperPlane,
  faRemove,
  faSun,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import vars from '../../../../../styles/root';
import commonTranslator from '../../../../../translator/Common';
import {SimpleFontIcon} from '../../../../../styles/Common/FontIcon';
import {useEffectOnce} from 'usehooks-ts';
import FAQ from './FAQ';
import {setCacheItem} from '../../../../../API/User';
import SuccessTransaction from '../../../../../components/web/SuccessTransaction/SuccessTransaction';
import OffCode from '../../../buy/components/OffCode';
import SessionDetail from './SessionDetail';
import Chapter from './Chapter';
import {Rating} from 'react-native-ratings';
import {generalRequest} from '../../../../../API/Utility';
import {routes} from '../../../../../API/APIRoutes';
import Card from '../Card';
import LastBuyer from './LastBuyer';
import {downloadCert} from '../../../../panel/certificate/Utility';
import {LargePopUp} from '../../../../../styles/Common/PopUp';

function PhoneDetail(props) {
  const [item, setItem] = useState();
  const [img, setImg] = useState();
  const [isWorking, setIsWorking] = useState(false);
  const [showDescMore, setShowDescMore] = useState(false);
  const [showPreReqMore, setShowPreReqMore] = useState(false);
  const [showPreReq, setShowPreReq] = useState(true);
  const [showChapters, setShowChapters] = useState(true);
  const [showFAQ, setShowFAQ] = useState(false);
  const [refId, setRefId] = useState();
  const [userOff, setUserOff] = useState();
  const [showSuccessTransaction, setShowSuccessTransaction] = useState(false);
  const [showOffCodePane, setShowOffCodePane] = useState(false);
  const [userMoney, setUserMoney] = useState(
    props.user === null ? 0 : props.user.user.money,
  );
  const [showRunQuizWarning, setShowRunQuizWarning] = useState(false);
  const [usedFromWallet, setUsedFromWallet] = useState(0);
  const [off, setOff] = useState();
  const [shouldPay, setShouldPay] = useState();
  const [selectedSession, setSelectedSession] = useState();
  const [showTeacher, setShowTeacher] = useState(false);
  const [packageRate, setPackageRate] = useState();
  const [teacherBio, setTeacherBio] = useState();

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
    let totalPrice = item.afterOff !== undefined ? item.afterOff : item.price;

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
      if (res[0].afterOff !== undefined) setShouldPay(res[0].afterOff);
      else setShouldPay(res[0].price);
    });
  }, [props, isWorking, item]);

  React.useEffect(() => {
    if (item !== undefined) setImg(item.img);
  }, [item]);

  useEffectOnce(() => {
    fetchPackageLocal();
  }, [props.slug]);

  const fontSize = 10;
  const valFontSize = 12;
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  const [rate, setRate] = useState();
  const [teacherPackages, setTeacherPackages] = useState();
  const [selectedTeacher, setSelectedTeacher] = useState();

  React.useEffect(() => {
    if (item !== undefined && item.rate !== undefined)
      setPackageRate(item.rate);

    if (item !== undefined && item.stdRate !== undefined) setRate(item.stdRate);
    else if (item !== undefined && item.stdRate === undefined) setRate(0);
  }, [item]);

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

  const [copying, setCopying] = useState();

  const doCopy = () => {
    navigator.clipboard.writeText(decodeURIComponent(document.URL));
    setCopying(true);
    setTimeout(function () {
      setCopying(false);
    }, 1300);
  };

  return (
    <>
      {item === undefined && <></>}
      {showRunQuizWarning && (
        <LargePopUp
          toggleShowPopUp={() => setShowRunQuizWarning(false)}
          btns={
            <CommonButton
              theme={'dark'}
              title={commonTranslator.confirm}
              onPress={() => props.navigate('/startQuiz/content/' + item.id)}
            />
          }>
          <SimpleText
            onPress={() => props.navigate('/startQuiz/content/' + item.id)}
            text="آیا از رفتن به آزمون پایان دوره اطمینان دارید؟ (تنها یکبار می توانید در این آزمون شرکت کنید)"
          />
        </LargePopUp>
      )}
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
          header={
            <PhoneView style={{...styles.gap30}}>
              {item.teacher.map((e, index) => {
                return (
                  <SimpleText
                    onPress={async () => {
                      props.setLoading(true);
                      let params = new URLSearchParams();
                      params.append('teacher', e);
                      setSelectedTeacher(e);

                      let res = await generalRequest(
                        routes.teacherPackages + params.toString(),
                        'get',
                        undefined,
                        'data',
                      );
                      if (res !== null) {
                        setTeacherPackages(
                          res.packages.filter(e => e.id !== item.id),
                        );
                        setTeacherBio(res.bio);
                      } else {
                        setTeacherPackages([]);
                        setTeacherBio('');
                      }
                      props.setLoading(false);
                    }}
                    key={index}
                    text={'مدرس ' + faNums[index] + ' : ' + e}
                    style={
                      selectedTeacher == e
                        ? {
                            ...styles.BlueBold,
                            ...styles.fontSize20,
                            ...styles.colorOrangeRed,
                          }
                        : {
                            ...styles.BlueBold,
                            ...styles.fontSize15,
                            ...styles.alignSelfCenter,
                            ...styles.cursor_pointer,
                          }
                    }
                  />
                );
              })}
            </PhoneView>
          }>
          <RenderHTML
            source={{
              html: teacherBio,
            }}
            tagsStyles={tagsStyles}
            systemFonts={systemFonts}
          />
          {teacherPackages !== undefined && teacherPackages.length > 0 && (
            <MyView>
              <SimpleText
                text={'دوره‌های دیگر این استاد'}
                style={{...styles.BlueBold, ...styles.fontSize22}}
              />
              <PhoneView style={{...styles.gap10}}>
                {teacherPackages.map((elem, index) => {
                  return (
                    <Card
                      isInMyMode={false}
                      isInPhone={true}
                      key={index}
                      package={elem}
                      navigate={props.navigate}
                    />
                  );
                })}
              </PhoneView>
            </MyView>
          )}
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
              gap: 10,
            }}>
            <CommonWebBox
              header={item.title}
              onBackClick={() =>
                item.afterBuy !== undefined && item.afterBuy
                  ? props.navigate('/myPackages')
                  : props.navigate('/packages')
              }
              backBtn={true}></CommonWebBox>

            <CommonWebBox>
              <Image
                source={img}
                resizeMode={'contain'}
                style={{width: '100%', height: 300}}
              />
            </CommonWebBox>

            <MyView>
              {item.quizStatus !== undefined && (
                <CommonWebBox>
                  {item.quizStatus === 'start' && (
                    <SimpleText
                      onPress={() => setShowRunQuizWarning(true)}
                      text={'شرکت در آزمون پایان دوره'}
                      style={{...styles.BlueBold, ...styles.cursor_pointer}}
                    />
                  )}
                  {item.quizStatus === 'result' && (
                    <>
                      <EqualTwoTextInputs>
                        <SimpleText
                          onPress={() =>
                            props.navigate('/reviewQuiz/content/' + item.id)
                          }
                          style={{
                            ...styles.BlueBold,
                            ...styles.cursor_pointer,
                          }}
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
                      {item.certStatus === 'ready' && (
                        <SimpleText
                          onPress={async () => {
                            await downloadCert(
                              item.certId,
                              props.user.user.NID,
                            );
                          }}
                          style={{
                            ...styles.BlueBold,
                            ...styles.cursor_pointer,
                            ...styles.red,
                          }}
                          text={' دانلود گواهی دوره'}
                        />
                      )}
                    </>
                  )}
                </CommonWebBox>
              )}
              <CommonWebBox>
                <EqualTwoTextInputs style={{paddingLeft: 30, paddingRight: 30}}>
                  <PhoneView>
                    <SimpleFontIcon
                      style={{color: vars.ORANGE_RED}}
                      icon={faClock}
                      kind={'normal'}
                    />
                    <SimpleText
                      style={{...styles.alignSelfCenter, ...styles.BlueBold}}
                      text={Translator.packageDuration}
                    />
                  </PhoneView>
                  <SimpleText
                    style={{...styles.alignSelfCenter, ...styles.BlueBold}}
                    text={convertSecToMinWithOutSecAndDay(item.duration)}
                  />
                </EqualTwoTextInputs>
                <EqualTwoTextInputs style={{paddingLeft: 30, paddingRight: 30}}>
                  <PhoneView>
                    <SimpleFontIcon
                      style={{color: vars.ORANGE_RED}}
                      icon={faListSquares}
                      kind={'normal'}
                    />
                    <SimpleText
                      style={{...styles.alignSelfCenter, ...styles.BlueBold}}
                      text={Translator.chaptersCount}
                    />
                  </PhoneView>
                  <SimpleText
                    style={{...styles.alignSelfCenter, ...styles.BlueBold}}
                    text={item.chapters.length + ' فصل'}
                  />
                </EqualTwoTextInputs>

                <EqualTwoTextInputs style={{paddingLeft: 30, paddingRight: 30}}>
                  <PhoneView>
                    <SimpleFontIcon
                      style={{color: vars.ORANGE_RED}}
                      icon={faListSquares}
                      kind={'normal'}
                    />
                    <SimpleText
                      style={{...styles.alignSelfCenter, ...styles.BlueBold}}
                      text={Translator.sessionsCount}
                    />
                  </PhoneView>
                  <SimpleText
                    style={{...styles.alignSelfCenter, ...styles.BlueBold}}
                    text={item.sessionsCount + ' جلسه'}
                  />
                </EqualTwoTextInputs>

                <EqualTwoTextInputs style={{paddingLeft: 30, paddingRight: 30}}>
                  <PhoneView>
                    <SimpleFontIcon
                      style={{color: vars.ORANGE_RED}}
                      icon={faSun}
                      kind={'normal'}
                    />
                    <SimpleText
                      style={{...styles.alignSelfCenter, ...styles.BlueBold}}
                      text={Translator.cert}
                    />
                  </PhoneView>
                  {item.hasCert && (
                    <SimpleFontIcon
                      style={{color: vars.GREEN}}
                      kind={'normal'}
                      icon={faCheck}
                    />
                  )}
                  {!item.hasCert && (
                    <SimpleFontIcon
                      style={{color: vars.YELLOW}}
                      kind={'normal'}
                      icon={faRemove}
                    />
                  )}
                </EqualTwoTextInputs>

                {item.hasCert && (
                  <EqualTwoTextInputs
                    style={{paddingLeft: 30, paddingRight: 30}}>
                    <PhoneView>
                      <SimpleFontIcon
                        style={{color: vars.ORANGE_RED}}
                        icon={faHourglassEnd}
                        kind={'normal'}
                      />
                      <SimpleText
                        style={{
                          ...styles.alignSelfCenter,
                          ...styles.BlueBold,
                        }}
                        text={Translator.certDuration}
                      />
                    </PhoneView>
                    <SimpleText
                      style={{...styles.alignSelfCenter, ...styles.BlueBold}}
                      text={item.certDuration + ' روز'}
                    />
                  </EqualTwoTextInputs>
                )}
                {packageRate !== undefined && (
                  <PhoneView
                    style={{
                      width: '100%',
                      direction: 'ltr',
                      justifyContent: 'center',
                    }}>
                    <Rating
                      type="star"
                      readonly={true}
                      ratingCount={5}
                      imageSize={30}
                      fractions={2}
                      style={{
                        direction: 'ltr',
                      }}
                      startingValue={packageRate}
                    />
                  </PhoneView>
                )}
                {(item.afterBuy === undefined || !item.afterBuy) && (
                  <MyView style={{...styles.flexNoWrap}}>
                    <PhoneView>
                      {/* style={{...styles.alignSelfCenter}} */}
                      <SimpleText
                        style={{...styles.BlueBold}}
                        text={commonTranslator.price + ' '}
                      />
                      <SimpleText
                        style={
                          shouldPay !== undefined && item.price !== shouldPay
                            ? {
                                ...styles.textDecorRed,
                                ...styles.BlueBold,
                              }
                            : {
                                ...styles.BlueBold,
                              }
                        }
                        text={
                          item.price <= 10
                            ? commonTranslator.free
                            : formatPrice(item.price) +
                              ' ' +
                              commonTranslator.priceUnit
                        }
                      />
                      {shouldPay !== undefined && item.price !== shouldPay && (
                        <SimpleText
                          style={{
                            ...styles.BlueBold,
                            ...styles.red,
                            ...styles.marginRight15,
                          }}
                          text={
                            shouldPay > 10
                              ? formatPrice(shouldPay) +
                                ' ' +
                                commonTranslator.priceUnit
                              : commonTranslator.free
                          }
                        />
                      )}
                    </PhoneView>

                    {props.token !== undefined && item.price > 0 && (
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
                            // ...styles.alignSelfCenter,
                            ...styles.alignSelfEnd,
                            ...styles.fontSize12,
                            ...{
                              marginLeft: 30,
                            },
                          }}
                          text={'کد تخفیف دارید؟'}
                        />
                      </MyView>
                    )}
                    {props.token === undefined && item.price > 0 && (
                      <CommonButton
                        onPress={() => props.navigate('/login')}
                        title={Translator.loginForBuy}
                      />
                    )}
                  </MyView>
                )}
                {(off > 0 || usedFromWallet > 0) && (
                  <MyView>
                    {item.off !== undefined && (
                      <PhoneView style={styles.alignItemsCenter}>
                        <SimpleText
                          text={formatPrice(item.price - item.afterOff)}
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
                          text={Translator.publicOff}
                        />
                      </PhoneView>
                    )}
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

              {item.afterBuy !== undefined &&
                item.afterBuy &&
                rate !== undefined && (
                  <CommonWebBox>
                    <EqualTwoTextInputs
                      style={{
                        width: 300,
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}>
                      <SimpleText text={'امتیاز شما'} />
                      <Rating
                        type="star"
                        ratingCount={5}
                        imageSize={30}
                        fractions={0}
                        style={{
                          direction: 'ltr',
                          cursor: 'pointer',
                        }}
                        startingValue={rate}
                        onFinishRating={rating => setRate(rating)}
                      />
                    </EqualTwoTextInputs>
                    <EqualTwoTextInputs>
                      <CommonButton
                        onPress={() =>
                          window.open(
                            '/ticket/class/' + item.title + '/' + item.id,
                          )
                        }
                        title={commonTranslator.ticket}
                      />
                      <CommonButton
                        onPress={async () => {
                          if (rate === undefined) {
                            showError('لطفا امتیاز موردنظر خود را انتخاب کنید');
                            return;
                          }
                          props.setLoading(true);
                          let res = await generalRequest(
                            routes.rateContent + item.id,
                            'put',
                            {rate: rate},
                            'data',
                            props.token,
                          );
                          props.setLoading(false);
                          if (res != null) {
                            setPackageRate(res);
                            showSuccess();
                          }
                        }}
                        theme={vars.DARK_BLUE}
                        title={commonTranslator.confirm}
                      />
                    </EqualTwoTextInputs>
                  </CommonWebBox>
                )}
            </MyView>

            <CommonWebBox>
              <MyView
                style={{
                  ...styles.padding20,
                  ...styles.gap10,
                  ...styles.textJustify,
                  ...{
                    width: '100%',
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

            <CommonWebBox header={Translator.teacherBio}>
              <SimpleText
                style={styles.BlueBold}
                text={item.teacher.join(' - ')}
              />
              {item.teacherBio !== undefined &&
                item.teacherBio !== null &&
                item.teacherBio.length !== 0 && (
                  <MyView>
                    <MyView
                      style={{
                        ...styles.textJustify,
                        ...{
                          maxHeight: 85,
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
                      onPress={async () => {
                        if (teacherPackages !== undefined) setShowTeacher(true);
                        else {
                          let params = new URLSearchParams();
                          params.append('teacher', item.teacher[0]);
                          setSelectedTeacher(item.teacher[0]);

                          let res = await generalRequest(
                            routes.teacherPackages + params.toString(),
                            'get',
                            undefined,
                            'data',
                          );
                          if (res !== null) {
                            setTeacherPackages(
                              res.packages.filter(e => e.id !== item.id),
                            );
                            setTeacherBio(res.bio);
                          } else {
                            setTeacherPackages([]);
                            setTeacherBio('');
                          }
                          setShowTeacher(true);
                        }
                      }}
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

            <CommonWebBox>
              <PhoneView style={{...styles.gap10}}>
                <SimpleFontIcon
                  style={{color: vars.DARK_BLUE}}
                  kind={'normal'}
                  icon={faPaperPlane}
                />
                <SimpleText
                  style={{...styles.BlueBold, ...styles.alignSelfCenter}}
                  text="اشتراک گذاری"
                />
              </PhoneView>
              <EqualTwoTextInputs>
                <SimpleText
                  style={{
                    maxWidth: 180,
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    alignSelf: 'center',
                  }}
                  text={decodeURIComponent(document.URL)}
                />
                <MyView>
                  {copying && (
                    <SimpleText
                      style={{
                        width: 50,
                        position: 'absolute',
                        left: 'calc(50% - 25px)',
                        top: -20,
                      }}
                      text={commonTranslator.copied}
                    />
                  )}
                  <CommonButton
                    onPress={() => doCopy()}
                    theme={'transparent'}
                    title={'کپی لینک'}
                  />
                </MyView>
              </EqualTwoTextInputs>
              <PhoneView>
                <div
                  style={{
                    cursor: 'pointer',
                    width: 40,
                    height: 40,
                    background:
                      "url('https://e.irysc.com/assets/images/social.png?v=1.2')",
                    backgroundRepeat: 'no-repeat',
                    backgroundPositionX: '-102px',
                    backgroundPositionY: '-9px',
                  }}
                  onClick={() =>
                    window.open(
                      'http://twitter.com/share?url=' +
                        decodeURIComponent(document.URL) +
                        '&text=' +
                        item.title,
                    )
                  }></div>
                <div
                  style={{
                    cursor: 'pointer',
                    width: 40,
                    height: 40,
                    background:
                      "url('https://e.irysc.com/assets/images/social.png?v=1.2')",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '-148px -52px',
                  }}
                  onClick={() =>
                    window.open(
                      'https://www.linkedin.com/shareArticle?min=true&url=' +
                        decodeURIComponent(document.URL) +
                        '&text=' +
                        item.title,
                    )
                  }></div>
                <div
                  style={{
                    cursor: 'pointer',
                    width: 40,
                    height: 40,
                    background:
                      "url('https://e.irysc.com/assets/images/social.png?v=1.2')",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: '-58px -52px',
                  }}
                  onClick={() =>
                    window.open(
                      'https://t.me/share/url?url=' +
                        decodeURIComponent(document.URL) +
                        '&text=' +
                        item.title,
                    )
                  }></div>
              </PhoneView>
            </CommonWebBox>

            {item.lastBuyers !== undefined && item.lastBuyers.length > 0 && (
              <CommonWebBox>
                <PhoneView style={{...styles.gap10}}>
                  <SimpleFontIcon
                    style={{color: vars.DARK_BLUE}}
                    kind={'normal'}
                    icon={faUsers}
                  />
                  <SimpleText
                    style={{...styles.BlueBold, ...styles.alignSelfCenter}}
                    text="آخرین خریداران"
                  />
                </PhoneView>
                <EqualTwoTextInputs>
                  <SimpleText
                    style={{...styles.alignSelfCenter, ...styles.BlueBold}}
                    text={
                      item.buyers !== undefined && item.buyers > 0
                        ? '+' + (item.buyers - item.lastBuyers?.length)
                        : ''
                    }
                  />
                  <PhoneView style={{justifyContent: 'end', marginLeft: 20}}>
                    {item.lastBuyers.map((e, index) => {
                      return (
                        <LastBuyer
                          index={index}
                          key={index}
                          pic={e.pic}
                          text={e.name}
                          onPress={() =>
                            window.open(
                              '/student-public-profile/' + e.id,
                              '_target',
                            )
                          }
                        />
                      );
                    })}
                  </PhoneView>
                </EqualTwoTextInputs>
              </CommonWebBox>
            )}

            <CommonWebBox
              btn={
                showChapters ? (
                  <SimpleFontIcon
                    onPress={() => setShowChapters(!showChapters)}
                    kind="midSize"
                    icon={faAngleDown}
                  />
                ) : (
                  <SimpleFontIcon
                    onPress={() => setShowChapters(!showChapters)}
                    kind="midSize"
                    icon={faAngleUp}
                  />
                )
              }
              header={Translator.chapters}>
              {showChapters && (
                <MyView>
                  {item.chapters.map((elem, index) => {
                    return (
                      <Chapter
                        user={props.user}
                        navigate={props.navigate}
                        sessions={item.sessions.filter(e => {
                          return e.chapter === elem.title;
                        })}
                        onPressSession={s => {
                          props.navigate('/packages/' + props.slug + '/' + s);
                        }}
                        isFree={item.price === 0}
                        chapter={elem}
                        key={index}
                      />
                    );
                  })}
                </MyView>
              )}
            </CommonWebBox>

            <CommonWebBox
              // style={{marginBottom: '75px'}}
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

export default PhoneDetail;
