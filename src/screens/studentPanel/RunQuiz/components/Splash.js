import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import vars from '../../../../styles/root';
import {
  basketBox,
  basketBoxInPhone,
  styleTitle,
  styleYellowBox,
} from '../../../panel/package/card/Style';
import Translate from '../Translate';
import {doQuizContext, dispatchDoQuizContext} from './Context';
import {doQuiz, reviewQuiz} from './Utility';
import commonTranslator from '../../../../translator/Common';
import {styles} from '../../../../styles/Common/Styles';
import {FontIcon} from '../../../../styles/Common/FontIcon';
import {
  faArrowLeft,
  faClock,
  faMagnifyingGlass,
  faMessage,
  faInfo,
  faQuestion,
} from '@fortawesome/free-solid-svg-icons';
import QuizItemCard from '../../../../components/web/QuizItemCard';
import {
  convertSecToMin,
  getDevice,
  systemFonts,
  tagsStyles,
} from '../../../../services/Utility';
import RenderHTML from 'react-native-render-html';
import AttachBox from '../../../panel/ticket/components/Show/AttachBox/AttachBox';
import {CV_BASE_URL, downloadRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';

function Splash(props) {
  const useGlobalState = () => [
    React.useContext(doQuizContext),
    React.useContext(dispatchDoQuizContext),
  ];

  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;

  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);

  React.useEffect(() => {
    if (
      isWorking ||
      state.questions !== undefined ||
      state.stdAnswerSheets !== undefined
    )
      return;
    setIsWorking(true);
    props.setLoading(true);

    Promise.all([
      props.isInReviewMode
        ? reviewQuiz(props.quizId, props.quizGeneralMode, props.token)
        : doQuiz(props.quizId, props.quizGeneralMode, props.token),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] === null) {
        props.navigate('/');
        return;
      }

      if (
        res[0].quizInfo.isQRNeeded !== undefined &&
        res[0].quizInfo.isQRNeeded
      ) {
        dispatch({
          token: props.token,
          navigate: props.navigate,
          quizInfo: res[0].quizInfo,
          stdAnswerSheets: res[0].answerSheets,
          setLoadingWithText: props.setLoadingWithText,
        });
      } else {
        dispatch({
          token: props.token,
          navigate: props.navigate,
          questions: res[0].questions,
          answers: res[0].questions.map(elem => {
            return elem.stdAns;
          }),
          bookmarks: res[0].questions.map(() => {
            return false;
          }),
          quizInfo: res[0].quizInfo,
          reminder: res[0].quizInfo.reminder,
          refresh: res[0].quizInfo.refresh,
          setLoadingWithText: props.setLoadingWithText,
        });
      }

      setIsWorking(false);
    });
  }, [dispatch, props, isWorking, state.questions, state.stdAnswerSheets]);

  return (
    <MyView>
      {state.quizInfo !== undefined && (
        <MyView>
          <CommonWebBox>
            <EqualTwoTextInputs>
              <PhoneView style={isInPhone ? {width: '90%'} : {}}>
                <MyView
                  style={{
                    ...styleYellowBox,
                    width: '100%',
                    marginTop: 0,
                  }}>
                  <SimpleText
                    style={{
                      ...styleTitle,
                      ...styles.BlueBold,
                    }}
                    text={state.quizInfo.title}
                  />
                </MyView>
              </PhoneView>
              {!isInPhone && (
                <PhoneView style={{marginTop: -10}}>
                  <FontIcon
                    kind={'normal'}
                    theme={'rect'}
                    back={'orange'}
                    parentStyle={{
                      marginTop: 8,
                      marginLeft: 0,
                      marginRight: 0,
                    }}
                    onPress={() => props.onBack(0)}
                    icon={faArrowLeft}
                  />
                </PhoneView>
              )}
            </EqualTwoTextInputs>
            <PhoneView
              style={isInPhone ? {...styles.gap15} : {...styles.gap100}}>
              {state.quizInfo.duration > 0 && (
                <QuizItemCard
                  icon={faClock}
                  iconFontSize={'large'}
                  color={vars.ORANGE}
                  background={false}
                  textFontSize={10}
                  valFontSize={16}
                  text={'مدت زمان '}
                  val={convertSecToMin(state.quizInfo.duration)}
                />
              )}
              {state.quizInfo.isQRNeeded !== undefined &&
                state.quizInfo.isQRNeeded && (
                  <CommonButton
                    onPress={async () => {
                      props.setLoading(true);
                      await downloadRequest(
                        routes.getMyQuestionPDF +
                          state.quizInfo.generalMode +
                          '/' +
                          state.quizInfo.id,
                        undefined,
                        props.token,
                      );
                      props.setLoading(false);
                    }}
                    theme={'dark'}
                    title={'دانلود دفترچه آزمون'}
                  />
                )}
              {state.quizInfo.isQRNeeded !== undefined &&
                state.quizInfo.isQRNeeded && (
                  <CommonButton
                    onPress={async () => {
                      props.setLoading(true);
                      await downloadRequest(
                        CV_BASE_URL +
                          'generateMyTashrihiAnswerSheet/' +
                          state.quizInfo.generalMode +
                          '/' +
                          state.quizInfo.id,
                        undefined,
                        props.token,
                      );
                      props.setLoading(false);
                    }}
                    title={'دانلود پاسخبرگ'}
                  />
                )}

              {state.quizInfo.isQRNeeded !== undefined &&
                state.quizInfo.isQRNeeded && (
                  <QuizItemCard
                    icon={faInfo}
                    iconFontSize={'large'}
                    background={false}
                    color={vars.ORANGE}
                    textFontSize={10}
                    valFontSize={16}
                    text={'وضعیت ارسال پاسخبرگ'}
                    val={
                      state.stdAnswerSheets !== undefined &&
                      state.stdAnswerSheets.find(
                        e => e.status === 'accepted',
                      ) !== undefined
                        ? 'ارسال شده'
                        : 'ارسال نشده'
                    }
                  />
                )}
              <QuizItemCard
                icon={faMessage}
                iconFontSize={'large'}
                background={false}
                color={vars.ORANGE}
                textFontSize={10}
                valFontSize={16}
                text={'تعداد سوال'}
                val={state.quizInfo.questionsNo}
              />
              <QuizItemCard
                icon={faQuestion}
                iconFontSize={'normal'}
                color={vars.ORANGE}
                textFontSize={11}
                valFontSize={15}
                text={'نوع آزمون '}
                val={
                  state.quizInfo.mode === 'regular'
                    ? 'تستی'
                    : 'tashrihi'
                    ? 'تشریحی'
                    : 'hybrid'
                    ? 'تشریحی و تستی'
                    : {}
                }
              />
            </PhoneView>
          </CommonWebBox>

          {state.quizInfo.description !== undefined &&
            state.quizInfo.description !== '' && (
              <CommonWebBox header={'توضیحات آزمون'}>
                <RenderHTML
                  contentWidth={'100%'}
                  source={{
                    html: state.quizInfo.description,
                  }}
                  tagsStyles={tagsStyles}
                  systemFonts={systemFonts}
                />
              </CommonWebBox>
            )}

          {state.quizInfo.descriptionAfter !== undefined &&
            state.quizInfo.descriptionAfter !== '' && (
              <CommonWebBox header={'توضیحات بعد آزمون'}>
                <RenderHTML
                  contentWidth={'100%'}
                  source={{
                    html: state.quizInfo.descriptionAfter,
                  }}
                  tagsStyles={tagsStyles}
                  systemFonts={systemFonts}
                />
              </CommonWebBox>
            )}

          {state.quizInfo.attaches !== undefined &&
            state.quizInfo.attaches.length > 0 && (
              <CommonWebBox header={'فایل توضیحات'}>
                <SimpleText
                  text={'مشاهده این فایل ها برای این آزمون ضروری است.'}
                />
                <PhoneView>
                  {state.quizInfo.attaches.map((elem, index) => {
                    return (
                      <AttachBox
                        icon={faMagnifyingGlass}
                        key={index}
                        filename={elem}
                        onClick={() => {
                          if (
                            elem.toLowerCase().indexOf('.jpg') !== -1 ||
                            elem.toLowerCase().indexOf('.png') !== -1
                          ) {
                            props.setSelectedAttach(elem);
                            props.setMode('attach');
                          } else {
                            window.open(elem);
                          }
                        }}
                      />
                    );
                  })}
                </PhoneView>
              </CommonWebBox>
            )}

          <CommonWebBox
            style={
              isInPhone
                ? {
                    ...basketBoxInPhone,
                    ...{
                      width: 'calc(100% - 20px)',
                      padding: 0,
                      height: 'unset',
                    },
                  }
                : {
                    ...basketBox,
                    ...{
                      width: vars.BASKET_WIDTH_WITH_OPEN_MENU,
                      padding: 0,
                      height: 'unset',
                    },
                  }
            }>
            <EqualTwoTextInputs>
              {(props.isInReviewMode ||
                props.quizGeneralMode !== 'content') && (
                <CommonButton
                  padding={isInPhone ? '5px 5px' : undefined}
                  textStyle={
                    isInPhone
                      ? {fontSize: 14, paddingLeft: 20, paddingRight: 20}
                      : {}
                  }
                  onPress={props.onBack}
                  title={commonTranslator.back}
                  theme={'orangeRed'}
                />
              )}

              {(state.quizInfo.isQRNeeded === undefined ||
                !state.quizInfo.isQRNeeded) && (
                <CommonButton
                  padding={isInPhone ? '5px 5px' : undefined}
                  textStyle={
                    isInPhone
                      ? {fontSize: 14, paddingLeft: 20, paddingRight: 20}
                      : {}
                  }
                  title={
                    props.isInReviewMode
                      ? Translate.review
                      : state.quizInfo.isNewPerson
                      ? Translate.start
                      : Translate.continue
                  }
                  onPress={() => props.setMode('doQuiz')}
                />
              )}

              {state.quizInfo.isQRNeeded !== undefined &&
                state.quizInfo.isQRNeeded && (
                  <PhoneView>
                    {/* {state.stdAnswerSheet !== undefined && (
                      <a
                        style={{
                          fontFamily: 'IRANSans',
                          alignSelf: 'center',
                          marginLeft: 10,
                        }}
                        target={'_blank'}
                        download={true}
                        href={state.stdAnswerSheet}>
                        دانلود فایل بارگذاری شده
                      </a>
                    )} */}
                    {!state.isInReviewMode && (
                      <CommonButton
                        padding={isInPhone ? '5px 5px' : undefined}
                        textStyle={
                          isInPhone
                            ? {
                                fontSize: 14,
                                paddingLeft: 20,
                                paddingRight: 20,
                              }
                            : {}
                        }
                        title={'مرحله بعد'}
                        onPress={() => {
                          props.setMode('submits');
                        }}
                      />
                    )}
                  </PhoneView>
                )}
            </EqualTwoTextInputs>
          </CommonWebBox>
        </MyView>
      )}
    </MyView>
  );
}

export default Splash;
