import {faClose, faExpand} from '@fortawesome/free-solid-svg-icons';
import {Image} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
} from '../../../../styles/Common';
import {CommonTextInput} from '../../../../styles/Common/CommonTextInput';
import {FontIcon} from '../../../../styles/Common/FontIcon';
import Translate from '../Translate';
import {styles} from '../../../../styles/Common/Styles';
import React, {useState} from 'react';
import {doQuizContext, dispatchDoQuizContext} from './Context';
import MultiChoice from './questionComponents/MultiChoice';
import vars from '../../../../styles/root';
import {getWidthHeight} from '../../../../services/Utility';
import {basketBox} from '../../../panel/package/card/Style';
import commonTranslator from '../../../../translator/Common';

function Question(props) {
  const useGlobalState = () => [
    React.useContext(doQuizContext),
    React.useContext(dispatchDoQuizContext),
  ];

  const [state, dispatch] = useGlobalState();

  const [question, setQuestion] = useState();

  React.useEffect(() => {
    Image.getSize(
      state.questions[state.currIdx].questionFile,
      (width, height) => {
        if (width / height < 2) setHeight(400);
        else if (width / height < 2.5) setHeight(300);
        else setHeight(200);
      },
    );
    if (state.questions[state.currIdx].answerFile !== undefined) {
      Image.getSize(
        state.questions[state.currIdx].answerFile,
        (width, height) => {
          if (width / height < 2) setAnswerHeight(400);
          else if (width / height < 2.5) setAnswerHeight(300);
          else setHeight(200);
        },
      );
    }
    setQuestion(state.questions[state.currIdx]);
  }, [state.questions, state.currIdx]);

  const [height, setHeight] = useState(200);
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
  }, [zoomImg, totalWidth, totalHeight]);

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
            style={{margin: 20, padding: 5}}>
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
          <CommonWebBox header={Translate.description} style={{padding: 15}}>
            {question.questionFile !== undefined && (
              <Image
                resizeMode="contain"
                style={{
                  width: '100%',
                  height: height,
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
                    selected={question.stdAns}
                    onChange={
                      props.isInReviewMode
                        ? undefined
                        : idx => {
                            let tmp = question;
                            tmp.stdAns = idx;
                            dispatch({question: tmp, needUpdate: true});
                          }
                    }
                  />
                )}
                {question.kindQuestion === 'short_answer' && (
                  <CommonTextInput
                    placeholder={Translate.resInput}
                    subText={Translate.resInput}
                    // value={title}
                    // onChangeText={e => changeText(e, setTitle)}
                    parentStyle={{width: '100%'}}
                    style={{backgroundColor: '#efefef', border: 0}}
                  />
                )}
                {question.kindQuestion === 'tashrihi' && (
                  <CommonTextInput
                    multiline={true}
                    placeholder={Translate.resInput}
                    subText={Translate.resInput}
                    //   value={desc}
                    //   onChangeText={text => setDesc(text)}
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

          {question.answerFile === undefined && question.answer !== undefined && (
            <CommonWebBox header={Translate.answer}>
              <MyView>
                {question.kindQuestion === 'test' && (
                  <MultiChoice
                    choicesCount={question.choicesCount}
                    selected={question.answer}
                    onChange={idx => {
                      let tmp = question;
                      tmp.answer = idx;
                      dispatch({question: tmp, needUpdate: true});
                    }}
                  />
                )}
                {question.kindQuestion === 'short_answer' && (
                  <CommonTextInput
                    placeholder={Translate.resInput}
                    subText={Translate.resInput}
                    // value={title}
                    // onChangeText={e => changeText(e, setTitle)}
                    parentStyle={{width: '100%'}}
                    style={{backgroundColor: '#efefef', border: 0}}
                  />
                )}
                {question.kindQuestion === 'tashrihi' && (
                  <CommonTextInput
                    multiline={true}
                    placeholder={Translate.resInput}
                    subText={Translate.resInput}
                    //   value={desc}
                    //   onChangeText={text => setDesc(text)}
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
                  width: '100%',
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
        style={{
          ...basketBox,
          ...{width: vars.BASKET_WIDTH_WITH_OPEN_MENU},
        }}>
        <CommonWebBox style={{padding: 0}}>
          <EqualTwoTextInputs>
            {!props.isInReviewMode && (
              <CommonButton
                onPress={() => {
                  dispatch({currIdx: state.currIdx - 1});
                }}
                title={Translate.finish}
                theme={'orangeRed'}
              />
            )}
            {props.isInReviewMode && (
              <CommonButton
                onPress={props.onBack}
                title={commonTranslator.back}
                theme={'orangeRed'}
              />
            )}
            {props.isInReviewMode && <PhoneView></PhoneView>}
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
                  title={Translate.prev}
                />
              )}
              {state.currIdx < state.questions.length - 1 && (
                <CommonButton
                  onPress={() => {
                    dispatch({currIdx: state.currIdx + 1});
                  }}
                  theme={'dark'}
                  title={Translate.next}
                />
              )}
            </PhoneView>
          </EqualTwoTextInputs>
        </CommonWebBox>
      </MyView>
    </MyView>
  );
}

export default Question;
