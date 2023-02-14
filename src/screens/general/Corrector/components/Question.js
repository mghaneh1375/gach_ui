import {
  faArrowLeft,
  faArrowRight,
  faClose,
  faExpand,
} from '@fortawesome/free-solid-svg-icons';
import {Image} from 'react-native';
import React, {useState} from 'react';
import {doCorrectContext, dispatchDoCorrectContext} from './Context';
import vars from '../../../../styles/root';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';
import {FontIcon} from '../../../../styles/Common/FontIcon';
import {basketBox, basketBoxInPhone} from '../../../panel/package/card/Style';
import {CommonTextInput} from '../../../../styles/Common/CommonTextInput';
import commonTranslator from '../../../../translator/Common';
import {
  getDevice,
  getWidthHeight,
  setImgSize,
} from '../../../../services/Utility';

function Question(props) {
  const useGlobalState = () => [
    React.useContext(doCorrectContext),
    React.useContext(dispatchDoCorrectContext),
  ];

  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;

  const [state, dispatch] = useGlobalState();
  const [question, setQuestion] = useState();

  React.useEffect(() => {
    Image.getSize(
      state.answers[state.currIdx].questionFile,
      (width, height) => {
        setImgSize(
          width,
          height,
          setImgWidth,
          setImgHeight,
          totalWidth,
          isInPhone,
        );
      },
    );

    if (
      state.answers[state.currIdx].stdAns !== undefined &&
      state.answers[state.currIdx].stdAns.answer !== undefined &&
      state.answers[state.currIdx].stdAns.answer !== '' &&
      state.answers[state.currIdx].stdAns.type === 'file'
    ) {
      Image.getSize(
        state.answers[state.currIdx].stdAns.answer,
        (width, height) => {
          setImgSize(
            width,
            height,
            setStdImgWidth,
            setStdImgHeight,
            totalWidth,
            isInPhone,
          );
        },
      );
    }

    if (state.answers[state.currIdx].answerFile !== undefined) {
      Image.getSize(
        state.answers[state.currIdx].answerFile,
        (width, height) => {
          setImgSize(
            width,
            height,
            setAnswerWidth,
            setAnswerHeight,
            totalWidth,
            isInPhone,
          );
        },
      );
    }
    setQuestion(state.answers[state.currIdx]);
  }, [state.answers, state.currIdx, totalWidth, isInPhone]);

  const [stdImgWidth, setStdImgWidth] = useState(200);
  const [stdImgHeight, setStdImgHeight] = useState(200);

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

          {question.stdAns !== undefined &&
            question.stdAns.type !== undefined &&
            question.stdAns.type === 'file' && (
              <CommonWebBox style={{padding: 15}}>
                <Image
                  resizeMode="contain"
                  style={{
                    width: stdImgWidth,
                    height: stdImgHeight,
                    borderRadius: 5,
                  }}
                  source={question.stdAns.answer}
                />

                <FontIcon
                  onPress={() => setZoomImg(question.stdAns.answer)}
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

          {question.stdAns !== undefined &&
            (question.stdAns.type === undefined ||
              question.stdAns.type !== 'file') && (
              <CommonWebBox
                header={props.isCorrector ? 'پاسخ دانش آموز' : 'پاسخ شما'}>
                <MyView>
                  <CommonTextInput
                    multiline={true}
                    disable={true}
                    value={
                      question.stdAns.answer === undefined
                        ? ''
                        : question.stdAns.answer
                    }
                    parentStyle={{width: '100%'}}
                    style={{
                      height: 200,
                      maxWidth: '100%',
                      backgroundColor: '#efefef',
                      border: 0,
                    }}
                  />
                </MyView>
              </CommonWebBox>
            )}

          {question.answer !== undefined && (
            <CommonWebBox header={'پاسخ سوال'}>
              <MyView>
                <CommonTextInput
                  multiline={true}
                  value={question.answer}
                  parentStyle={{width: '100%'}}
                  style={{
                    height: 200,
                    maxWidth: '100%',
                    backgroundColor: '#efefef',
                    border: 0,
                  }}
                />
              </MyView>
            </CommonWebBox>
          )}
          {question.answerFile !== undefined && (
            <CommonWebBox header={'پاسخ تشریحی'} style={{padding: 15}}>
              <Image
                resizeMode="contain"
                style={{
                  width: imgWidth,
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

            <PhoneView></PhoneView>
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
                    title={'قبلی'}
                  />
                )}
                {state.currIdx < state.answers.length - 1 && (
                  <CommonButton
                    onPress={() => {
                      dispatch({currIdx: state.currIdx + 1});
                    }}
                    theme={'dark'}
                    padding={isInPhone ? '5px 5px' : undefined}
                    textStyle={isInPhone ? {fontSize: 14} : {}}
                    title={'بعدی'}
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
                {state.currIdx < state.answers.length - 1 && (
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
