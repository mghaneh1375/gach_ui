import {
  faArrowLeft,
  faArrowRight,
  faClose,
  faExpand,
} from '@fortawesome/free-solid-svg-icons';
import {Image} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {CommonTextInput} from '../../../../styles/Common/CommonTextInput';
import {FontIcon} from '../../../../styles/Common/FontIcon';
import Translate from '../Translate';
import {styles} from '../../../../styles/Common/Styles';
import React, {useState} from 'react';
import {doQuizContext, dispatchDoQuizContext} from './Context';
import vars from '../../../../styles/root';
import {
  getDevice,
  getWidthHeight,
  setImgSize,
} from '../../../../services/Utility';
import {basketBox, basketBoxInPhone} from '../../../panel/package/card/Style';
import commonTranslator from '../../../../translator/Common';
import MultiChoice from '../../RunQuiz/components/questionComponents/MultiChoice';

function Question(props) {
  const useGlobalState = () => [
    React.useContext(doQuizContext),
    React.useContext(dispatchDoQuizContext),
  ];

  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;

  const [state, dispatch] = useGlobalState();

  const [question, setQuestion] = useState();

  React.useEffect(() => {
    if (question === undefined) return;
    Image.getSize(question.questionFile, (width, height) => {
      setImgSize(
        width,
        height,
        setImgWidth,
        setImgHeight,
        totalWidth,
        isInPhone,
      );
    });
    if (question.answerFile !== undefined) {
      Image.getSize(question.answerFile, (width, height) => {
        setImgSize(
          width,
          height,
          setAnswerWidth,
          setAnswerHeight,
          totalWidth,
          isInPhone,
        );
      });
    }
  }, [question, totalWidth, isInPhone]);

  React.useEffect(() => {
    if (state.questions === undefined) return;
    setQuestion(state.questions[state.currIdx]);
  }, [state.questions, state.currIdx]);

  const [imgWidth, setImgWidth] = useState(200);
  const [imgHeight, setImgHeight] = useState(200);
  const [answerWidth, setAnswerWidth] = useState(200);
  const [answerHeight, setAnswerHeight] = useState(200);
  const [isInZoomMode, setIsInZoomMode] = useState();
  const [zoomImg, setZoomImg] = useState();

  const [zoomW, setZoomW] = useState();
  const [zoomH, setZoomH] = useState();

  const [totalWidth, totalHeight] = getWidthHeight();

  React.useEffect(() => {
    if (zoomImg === undefined) {
      setIsInZoomMode(false);
      return;
    }
    Image.getSize(zoomImg, (width, height) => {
      if (isInPhone) {
        setZoomW(totalWidth - 50);
        setZoomH((height * (totalWidth - 50)) / width);
        return;
      }

      let h = (height * 0.75 * totalWidth) / width;

      if (h < totalHeight) {
        setZoomW(totalWidth - 20);
        setZoomH(h);
      } else {
        let w = (width * (totalHeight - 100)) / height;
        setZoomW(w);
        setZoomH(totalHeight - 100);
      }
    });
  }, [zoomImg, totalWidth, totalHeight, isInPhone]);

  React.useEffect(() => {
    if (zoomH === undefined) return;
    setIsInZoomMode(true);
  }, [zoomH]);

  const closeZoom = () => {
    setZoomImg(undefined);
    setZoomH(undefined);
    setZoomW(undefined);
  };

  const [showConfirmationPane, setShowConfirmationPane] = useState(false);
  const [stdAns, setStdAns] = useState();

  return (
    <MyView>
      {isInZoomMode && (
        <MyView
          style={{
            width: '100%',
            height: '100%',
            position: 'fixed',
            left: 0,
            top: 0,
            zIndex: 20,
            backgroundColor: vars.darkTransparent,
          }}>
          <CommonWebBox
            header={''}
            btn={<FontIcon icon={faClose} onPress={() => closeZoom()} />}
            style={!isInPhone ? {margin: 20, padding: 5} : {}}>
            <Image
              resizeMode="contain"
              style={{
                width: zoomW,
                height: zoomH,
                borderRadius: 5,
              }}
              source={zoomImg}
            />
          </CommonWebBox>
        </MyView>
      )}
      {question !== undefined && !showConfirmationPane && (
        <MyView style={{marginBottom: 70}}>
          <CommonWebBox style={{padding: 15}}>
            {question.questionFile !== undefined && (
              <Image
                resizeMode="contain"
                style={{
                  width: imgWidth,
                  height: imgHeight,
                  borderRadius: 5,
                }}
                source={question.questionFile}
              />
            )}
            <FontIcon
              onPress={() => setZoomImg(question.questionFile)}
              icon={faExpand}
              style={{
                ...styles.colorOrange,
                position: 'absolute',
                bottom: 20,
                left: 15,
              }}
            />
          </CommonWebBox>
          {question.stdAns !== undefined && (
            <CommonWebBox
              header={
                props.isInReviewMode ? Translate.yourAnswer : Translate.res
              }>
              <MyView>
                {question.kindQuestion === 'test' && (
                  <MultiChoice
                    choicesCount={question.choicesCount}
                    selected={state.answers[state.currIdx]}
                    onChange={
                      props.isInReviewMode
                        ? undefined
                        : idx => {
                            if (state.answers[state.currIdx] == '') {
                              setShowConfirmationPane(true);
                              setStdAns(idx);
                            }
                          }
                    }
                  />
                )}

                {question.kindQuestion === 'short_answer' && (
                  <CommonTextInput
                    placeholder={Translate.resInput}
                    subText={Translate.resInput}
                    justNum={true}
                    float={true}
                    value={state.answers[state.currIdx]}
                    onChangeText={e =>
                      dispatch({answer: e, needUpdateAnswer: true})
                    }
                    parentStyle={{width: '100%'}}
                    style={{backgroundColor: '#efefef', border: 0}}
                  />
                )}
              </MyView>
            </CommonWebBox>
          )}

          {question.answerFile === undefined && question.answer !== undefined && (
            <CommonWebBox header={Translate.answer}>
              <MyView>
                {question.kindQuestion === 'test' && (
                  <MultiChoice
                    choicesCount={question.choicesCount}
                    selected={question.answer}
                    onChange={idx => {}}
                  />
                )}
                {question.kindQuestion === 'short_answer' && (
                  <CommonTextInput
                    placeholder={Translate.resInput}
                    subText={Translate.resInput}
                    disable={true}
                    value={question.answer}
                    parentStyle={{width: '100%'}}
                    style={{backgroundColor: '#efefef', border: 0}}
                  />
                )}
                {question.kindQuestion === 'multi_sentence' && (
                  <CommonTextInput
                    placeholder={Translate.resInput}
                    subText={Translate.resInput}
                    disable={true}
                    value={question.answer
                      .replaceAll('1', 'ص ')
                      .replaceAll('0', 'غ ')}
                    parentStyle={{width: '100%'}}
                    style={{backgroundColor: '#efefef', border: 0}}
                  />
                )}
              </MyView>
            </CommonWebBox>
          )}

          {question.answerFile !== undefined && (
            <CommonWebBox header={Translate.answerFile} style={{padding: 15}}>
              <Image
                resizeMode="contain"
                style={{
                  width: imgWidth,
                  // height: imgHeight,
                  // borderRadius: 5,
                  height: answerHeight,
                  borderRadius: 5,
                }}
                source={question.answerFile}
              />
              <FontIcon
                onPress={() => setZoomImg(question.answerFile)}
                icon={faExpand}
                style={{
                  ...styles.colorOrange,
                  position: 'absolute',
                  bottom: 20,
                  left: 15,
                }}
              />
            </CommonWebBox>
          )}
        </MyView>
      )}

      {showConfirmationPane && (
        <>
          <SimpleText
            style={{
              ...styles.BlueBold,
              ...styles.margin30,
              ...styles.fontSize15,
              ...styles.alignSelfCenter,
            }}
            text={
              'آیا از ثبت پاسخ اطمینان دارید؟ (توجه داشته باشید که در این آزمون تنها یکبار فرصت پاسخدهی به هر سوال را دارید)'
            }
          />
          <PhoneView style={{...styles.justifyContentCenter}}>
            <CommonButton
              onPress={() => {
                dispatch({answer: stdAns, needUpdateAnswer: true});
                setStdAns(undefined);
                setShowConfirmationPane(false);
              }}
              theme={'dark'}
              title={commonTranslator.yes}
            />
            <CommonButton
              onPress={() => setShowConfirmationPane(false)}
              theme={'orangeRed'}
              title={commonTranslator.no}
            />
          </PhoneView>
        </>
      )}

      <MyView
        style={
          isInPhone
            ? {
                ...basketBoxInPhone,
                ...{width: 'calc(100% - 20px)'},
              }
            : {
                ...basketBox,
                ...{width: vars.BASKET_WIDTH_WITH_OPEN_MENU},
              }
        }>
        <CommonWebBox style={{padding: 0}}>
          <EqualTwoTextInputs>
            {!props.isInReviewMode && (
              <CommonButton
                onPress={() => {
                  dispatch({exit: true});
                }}
                padding={isInPhone ? '5px 5px' : undefined}
                textStyle={
                  isInPhone
                    ? {fontSize: 14, paddingLeft: 20, paddingRight: 20}
                    : {}
                }
                title={Translate.finish}
                theme={isInPhone ? 'dark' : 'orangeRed'}
              />
            )}
            {props.isInReviewMode && (
              <CommonButton
                onPress={props.onBack}
                padding={isInPhone ? '5px 5px' : undefined}
                textStyle={
                  isInPhone
                    ? {fontSize: 14, paddingLeft: 20, paddingRight: 20}
                    : {}
                }
                title={commonTranslator.back}
                theme={'orangeRed'}
              />
            )}
            {props.isInReviewMode && <PhoneView></PhoneView>}
            {!isInPhone && (
              <PhoneView
                style={{
                  ...styles.justifyContentCenter,
                  ...styles.alignItemsCenter,
                }}>
                {state.currIdx > 0 && (
                  <CommonButton
                    onPress={() => {
                      dispatch({currIdx: state.currIdx - 1});
                    }}
                    padding={isInPhone ? '5px 5px' : undefined}
                    textStyle={isInPhone ? {fontSize: 14} : {}}
                    title={Translate.prev}
                  />
                )}
                {state.currIdx < state.questions.length - 1 && (
                  <CommonButton
                    onPress={() => {
                      dispatch({currIdx: state.currIdx + 1});
                    }}
                    theme={'dark'}
                    padding={isInPhone ? '5px 5px' : undefined}
                    textStyle={isInPhone ? {fontSize: 14} : {}}
                    title={Translate.next}
                  />
                )}
              </PhoneView>
            )}
            {isInPhone && (
              <PhoneView
                style={{
                  ...styles.justifyContentCenter,
                  ...styles.alignItemsCenter,
                  ...styles.padding5,
                  ...styles.gap5,
                }}>
                {state.currIdx > 0 && (
                  <FontIcon
                    onPress={() => {
                      dispatch({currIdx: state.currIdx - 1});
                    }}
                    icon={faArrowRight}
                    theme={'rect'}
                  />
                )}
                {state.currIdx < state.questions.length - 1 && (
                  <FontIcon
                    onPress={() => {
                      dispatch({currIdx: state.currIdx + 1});
                    }}
                    icon={faArrowLeft}
                    theme={'rect'}
                  />
                )}
              </PhoneView>
            )}
          </EqualTwoTextInputs>
        </CommonWebBox>
      </MyView>
    </MyView>
  );
}

export default Question;
