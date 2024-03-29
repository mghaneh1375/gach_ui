import {
  faArrowLeft,
  faArrowRight,
  faClose,
  faExpand,
  faFolder,
} from '@fortawesome/free-solid-svg-icons';
import {Image} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
} from '../../../../styles/Common';
import {CommonTextInput} from '../../../../styles/Common/CommonTextInput';
import {FontIcon, SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import Translate from '../Translate';
import {styles} from '../../../../styles/Common/Styles';
import React, {useState} from 'react';
import {doQuizContext, dispatchDoQuizContext} from './Context';
import MultiChoice from './questionComponents/MultiChoice';
import vars from '../../../../styles/root';
import {
  getDevice,
  getWidthHeight,
  setImgSize,
} from '../../../../services/Utility';
import {basketBox, basketBoxInPhone} from '../../../panel/package/card/Style';
import commonTranslator from '../../../../translator/Common';
import MultiSentence from './questionComponents/MultiSentence';
import AttachBox from '../../../panel/ticket/components/Show/AttachBox/AttachBox';

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
      {question !== undefined && (
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
                            if (state.answers[state.currIdx] == idx) {
                              dispatch({
                                answer: 0,
                                needUpdateAnswer: true,
                              });
                            } else
                              dispatch({answer: idx, needUpdateAnswer: true});
                          }
                    }
                  />
                )}
                {question.kindQuestion === 'multi_sentence' && (
                  <MultiSentence
                    sentencesCount={question.sentencesCount}
                    selected={state.answers[state.currIdx]}
                    onChange={
                      props.isInReviewMode
                        ? undefined
                        : newStatus => {
                            dispatch({
                              answer: newStatus,
                              needUpdateAnswer: true,
                            });
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
                {question.kindQuestion === 'tashrihi' &&
                  question.canUpload &&
                  state.answers[state.currIdx] !== undefined &&
                  state.answers[state.currIdx] !== '' && (
                    <AttachBox filename={state.answers[state.currIdx]} />
                  )}
                {question.kindQuestion === 'tashrihi' && !question.canUpload && (
                  <CommonTextInput
                    multiline={true}
                    placeholder={Translate.resInput}
                    subText={Translate.resInput}
                    value={state.answers[state.currIdx]}
                    onChangeText={text =>
                      dispatch({
                        answer: text,
                        needUpdateAnswer: true,
                      })
                    }
                    parentStyle={{width: '100%'}}
                    style={{
                      height: 200,
                      maxWidth: '100%',
                      backgroundColor: '#efefef',
                      border: 0,
                    }}
                  />
                )}
                {question.kindQuestion === 'tashrihi' && question.canUpload && (
                  <MyView style={{width: 40, height: 40}}>
                    <SimpleFontIcon
                      onPress={() => dispatch({openFileSelectorFlag: true})}
                      icon={faFolder}
                    />
                  </MyView>
                )}
              </MyView>
            </CommonWebBox>
          )}

          {question.answerFile === undefined &&
            question.answer !== undefined &&
            question.kindQuestion !== 'tashrihi' && (
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
                  {question.kindQuestion === 'tashrihi' && (
                    <CommonTextInput
                      multiline={true}
                      placeholder={Translate.resInput}
                      subText={Translate.resInput}
                      value={question.answer}
                      disable={true}
                      parentStyle={{width: '100%'}}
                      style={{
                        height: 200,
                        maxWidth: '100%',
                        backgroundColor: '#efefef',
                        border: 0,
                      }}
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
