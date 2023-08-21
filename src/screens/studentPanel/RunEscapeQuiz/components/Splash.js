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
} from '@fortawesome/free-solid-svg-icons';
import QuizItemCard from '../../../../components/web/QuizItemCard';
import {
  convertSecToMin,
  convertSecToMinWithOutSec,
  getDevice,
  systemFonts,
  tagsStyles,
} from '../../../../services/Utility';
import RenderHTML from 'react-native-render-html';
import AttachBox from '../../../panel/ticket/components/Show/AttachBox/AttachBox';

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
        ? reviewQuiz(props.quizId, props.token)
        : doQuiz(props.quizId, props.token),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] === null) {
        props.navigate('/');
        return;
      }

      dispatch({
        token: props.token,
        navigate: props.navigate,
        questions: res[0].questions,
        answers: res[0].questions.map(elem => {
          return elem.stdAns;
        }),
        quizInfo: res[0].quizInfo,
        reminder: res[0].quizInfo.reminder,
        refresh: res[0].quizInfo.refresh,
        setLoadingWithText: props.setLoadingWithText,
      });

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
                  val={convertSecToMinWithOutSec(state.quizInfo.duration)}
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
            </EqualTwoTextInputs>
          </CommonWebBox>
        </MyView>
      )}
    </MyView>
  );
}

export default Splash;
