import {
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';
import vars from '../../../../styles/root';
import React, {useState} from 'react';
import {doQuizContext, dispatchDoQuizContext} from './Context';
import QuestionNumber from './questionComponents/QuestionNumber';
import {SimpleTextIcon} from '../../../../styles/Common/TextIcon';

import Timer from './Timer';

import {
  faAngleDown,
  faAngleUp,
  faBookmark,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import Translate from '../Translate';
import {FontIcon} from '../../../../styles/Common/FontIcon';
import commonTranslator from '../../../../translator/Common';
import Circle from '../../../../components/web/Circle';
import AttachBox from '../../../panel/ticket/components/Show/AttachBox/AttachBox';
import {getDevice} from '../../../../services/Utility';

function Filter(props) {
  const useGlobalState = () => [
    React.useContext(doQuizContext),
    React.useContext(dispatchDoQuizContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [help, setHelp] = useState(false);
  const toggleHelp = () => {
    setHelp(!help);
  };

  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;

  if (state.quizInfo === undefined) return <></>;

  return (
    <CommonWebBox
      childStyle={{...styles.padding5}}
      style={{...styles.padding0, ...styles.marginTop10}}
      width={isInPhone ? '100%' : vars.RIGHT_MENU_WIDTH}>
      {!props.isInReviewMode &&
        state.quizInfo.duration > 0 &&
        !state.clearTimer && (
          <Timer
            refresh={state.refresh}
            reminder={state.reminder}
            duration={state.quizInfo.duration}
            callNeedStore={() => dispatch({needStore: true})}
          />
        )}

      {!isInPhone && state.quizInfo.duration > 0 && (
        <EqualTwoTextInputs
          style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10}}>
          <SimpleText
            style={styles.dark_blue_color}
            text={Translate.quizList}
          />
          <SimpleTextIcon
            onPress={() => toggleHelp()}
            icon={help ? faAngleUp : faAngleDown}
            textStyle={{
              ...styles.colorOrangeRed,
              ...{marginLeft: -5},
              ...styles.cursor_pointer,
            }}
            iconStyle={{...styles.colorOrangeRed}}
            iconKind={'midSize'}
            text={Translate.help}
          />
        </EqualTwoTextInputs>
      )}

      {help && (
        <MyView>
          <PhoneView>
            <Circle
              style={{...styles.alignSelfCenter, marginRight: 3}}
              diameter={14}
              backgroundColor={vars.DARK_BLUE}
            />
            <SimpleText
              text={Translate.answered}
              style={{
                ...styles.colorGray,
                ...styles.fontSize12,
                ...styles.paddingRight15,
              }}
            />
          </PhoneView>
          {!props.isInReviewMode && (
            <PhoneView>
              <FontIcon
                kind={'small'}
                icon={faBookmark}
                style={{color: vars.ORANGE_RED}}
                parentStyle={{
                  ...styles.marginLeft5,
                  backgroundColor: 'transparent',
                }}
              />
              <SimpleText
                text={Translate.bookmarked}
                style={{
                  ...styles.colorGray,
                  ...styles.fontSize12,
                  ...styles.paddingRight5,
                }}
              />
            </PhoneView>
          )}
          {!isInPhone && (
            <PhoneView>
              <Circle
                style={{...styles.alignSelfCenter, marginRight: 3}}
                diameter={14}
                backgroundColor={vars.DARK_WHITE}
              />
              <SimpleText
                text={Translate.notAnswered}
                style={{
                  ...styles.colorGray,
                  ...styles.fontSize12,
                  ...styles.paddingRight15,
                }}
              />
            </PhoneView>
          )}
        </MyView>
      )}

      {!isInPhone && state.quizInfo.duration > 0 && (
        <PhoneView
          style={{
            ...styles.gap7,
            ...styles.margin15,
            ...styles.justifyContentStart,
            ...{
              marginBottom: 0,
              paddingBottom: 50,
              borderBottomWidth: 2,
              borderColor: vars.DARK_BLUE,
            },
          }}>
          {state.questions !== undefined &&
            state.questions.map((elem, index) => {
              return (
                <QuestionNumber
                  selected={props.mode !== 'splash' && state.currIdx === index}
                  theme={
                    state.answers[index] === undefined ||
                    state.answers[index] === '' ||
                    state.answers[index] === 0
                      ? 'transparent'
                      : 'green'
                  }
                  key={index}
                  number={index + 1}
                  bookmark={
                    props.isInReviewMode
                      ? 'hidden'
                      : state.bookmarks[index] === undefined ||
                        !state.bookmarks[index]
                      ? 'unfill'
                      : 'fill'
                  }
                  jump={() => {
                    if (props.mode === 'splash') return;
                    dispatch({currIdx: index});
                  }}
                  // onChange={() => {
                  //   if (props.mode === 'splash') return;
                  //   let b =
                  //     state.bookmarks[index] === undefined ||
                  //     !state.bookmarks[index]
                  //       ? true
                  //       : false;
                  //   dispatch({bookmarkStatus: b, needUpdateBookmarks: true});
                  // }}
                />
              );
            })}
        </PhoneView>
      )}
      {state.quizInfo !== undefined &&
        state.quizInfo.attaches !== undefined &&
        state.quizInfo.attaches.length > 0 &&
        !isInPhone && (
          <MyView>
            <SimpleText
              style={styles.dark_blue_color}
              text={commonTranslator.nesFile}
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
          </MyView>
        )}
      {props.isInReviewMode &&
        state.questions !== undefined &&
        props.mode !== 'splash' && (
          <MyView style={{padding: 20}}>
            <EqualTwoTextInputs>
              <SimpleText text={'مبحث: '} />
              <SimpleText text={state.questions[state.currIdx].subject.name} />
            </EqualTwoTextInputs>
            <EqualTwoTextInputs>
              <SimpleText text={'سطح سختی: '} />
              <SimpleText text={state.questions[state.currIdx].levelFa} />
            </EqualTwoTextInputs>
            <EqualTwoTextInputs>
              <SimpleText text={'طراح سوال: '} />
              <SimpleText text={state.questions[state.currIdx].author} />
            </EqualTwoTextInputs>
            {state.quizInfo.mode !== 'tashrihi' && (
              <EqualTwoTextInputs>
                <SimpleText text={'پاسخ دانش آموز: '} />
                {state.questions[state.currIdx].kindQuestion === 'test' && (
                  <SimpleText
                    text={'گزینه ' + state.questions[state.currIdx].stdAns}
                  />
                )}
                {state.questions[state.currIdx].kindQuestion ===
                  'short_answer' && (
                  <SimpleText text={state.questions[state.currIdx].stdAns} />
                )}
                {state.questions[state.currIdx].kindQuestion ===
                  'multi_sentence' && (
                  <SimpleText
                    text={state.questions[state.currIdx].stdAns
                      .replaceAll('1', 'ص ')
                      .replaceAll('0', 'غ ')
                      .replaceAll('_', 'ن')}
                  />
                )}
              </EqualTwoTextInputs>
            )}
            {state.quizInfo.mode !== 'tashrihi' && (
              <EqualTwoTextInputs>
                <SimpleText text={'پاسخ صحیح: '} />
                {state.questions[state.currIdx].kindQuestion === 'test' && (
                  <SimpleText
                    text={'گزینه ' + state.questions[state.currIdx].answer}
                  />
                )}
                {state.questions[state.currIdx].kindQuestion ===
                  'short_answer' && (
                  <SimpleText text={state.questions[state.currIdx].answer} />
                )}
                {state.questions[state.currIdx].kindQuestion ===
                  'multi_sentence' && (
                  <SimpleText
                    text={state.questions[state.currIdx].answer
                      .replaceAll('1', 'ص ')
                      .replaceAll('0', 'غ ')}
                  />
                )}
              </EqualTwoTextInputs>
            )}
            {state.quizInfo.mode !== 'tashrihi' &&
              state.questions[state.currIdx].oldCorrect +
                state.questions[state.currIdx].oldIncorrect +
                state.questions[state.currIdx].oldWhite >
                0 && (
                <EqualTwoTextInputs>
                  <SimpleText text={'پاسخ صحیح در کل: '} />
                  <SimpleText
                    text={
                      '%' +
                      Math.round(
                        (state.questions[state.currIdx].oldCorrect * 100.0) /
                          (state.questions[state.currIdx].oldCorrect +
                            state.questions[state.currIdx].oldIncorrect +
                            state.questions[state.currIdx].oldWhite),
                      )
                    }
                  />
                </EqualTwoTextInputs>
              )}
            {state.quizInfo.mode !== 'tashrihi' &&
              state.questions[state.currIdx].stdMark !== undefined && (
                <EqualTwoTextInputs>
                  <SimpleText text={'نمره دانش آموز: '} />
                  <SimpleText text={state.questions[state.currIdx].stdMark} />
                </EqualTwoTextInputs>
              )}
            {state.quizInfo.mode !== 'tashrihi' &&
              state.questions[state.currIdx].stdMark !== undefined && (
                <EqualTwoTextInputs>
                  <SimpleText text={'نمره سوال: '} />
                  <SimpleText text={state.questions[state.currIdx].mark} />
                </EqualTwoTextInputs>
              )}
            {state.quizInfo.mode === 'tashrihi' &&
              state.questions[state.currIdx].mark !== undefined && (
                <EqualTwoTextInputs>
                  <SimpleText text={'نمره سوال: '} />
                  <SimpleText text={state.questions[state.currIdx].mark} />
                </EqualTwoTextInputs>
              )}
            {state.quizInfo.mode === 'tashrihi' && (
              <EqualTwoTextInputs>
                <SimpleText text={'نمره داده شده: '} />
                <SimpleText
                  text={
                    state.questions[state.currIdx].stdMark === undefined
                      ? 'نمره داده نشده'
                      : state.questions[state.currIdx].stdMark
                  }
                />
              </EqualTwoTextInputs>
            )}
            {state.quizInfo.mode === 'tashrihi' &&
              state.questions[state.currIdx].markDesc !== undefined && (
                <SimpleText text={state.questions[state.currIdx].markDesc} />
              )}
          </MyView>
        )}
    </CommonWebBox>
  );
}

export default Filter;
