import {
  faAngleLeft,
  faAngleRight,
  faExpand,
} from '@fortawesome/free-solid-svg-icons';
import {Image} from 'react-native';
import {CommonWebBox, MyView, PhoneView} from '../../../../styles/Common';
import {CommonTextInput} from '../../../../styles/Common/CommonTextInput';
import {FontIcon, SimpleFontIcon} from '../../../../styles/Common/FontIcon';
import Translate from '../Translate';
import {styles} from '../../../../styles/Common/Styles';
import React, {useState} from 'react';
import {doQuizContext, dispatchDoQuizContext} from './Context';
import MultiChoice from './questionComponents/MultiChoice';
import vars from '../../../../styles/root';

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

  React.useEffect(() => {
    if (zoomImg === undefined) {
      setIsInZoomMode(false);
      return;
    }
    setIsInZoomMode(true);
  }, [zoomImg]);

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
            width={'100%'}
            backBtn={true}
            onBackClick={() => setZoomImg(undefined)}
            style={{marginTop: 30, height: '100%'}}>
            <Image
              resizeMode="contain"
              style={{
                width: '100%',
                height: 200,
                borderRadius: 5,
              }}
              source={zoomImg}
            />
          </CommonWebBox>
        </MyView>
      )}
      {question !== undefined && (
        <MyView>
          <CommonWebBox
            btn={
              <PhoneView
                style={{
                  ...styles.justifyContentCenter,
                  ...styles.alignItemsCenter,
                }}>
                <SimpleFontIcon
                  onPress={() => {
                    dispatch({currIdx: state.currIdx + 1});
                  }}
                  kind={'large'}
                  icon={faAngleRight}
                />
                <SimpleFontIcon
                  onPress={() => {
                    dispatch({currIdx: state.currIdx - 1});
                  }}
                  kind={'large'}
                  icon={faAngleLeft}
                />
              </PhoneView>
            }
            header={Translate.description}
            style={{padding: 15}}>
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
                            tmp.answer = idx;
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
    </MyView>
  );
}

export default Question;
