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

  return (
    <CommonWebBox
      childStyle={{...styles.padding5}}
      style={{...styles.padding0, ...styles.marginTop10}}
      width={vars.RIGHT_MENU_WIDTH}>
      {!props.isInReviewMode &&
        state.quizInfo !== undefined &&
        !state.clearTimer && <Timer />}

      <EqualTwoTextInputs
        style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10}}>
        <SimpleText style={styles.dark_blue_color} text={Translate.quizList} />
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
        </MyView>
      )}

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
      {state.quizInfo !== undefined &&
        state.quizInfo.attaches !== undefined &&
        state.quizInfo.attaches.length > 0 && (
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
                      props.setSelectedAttach(elem);
                      props.setMode('attach');
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
          </MyView>
        )}
    </CommonWebBox>
  );
}

export default Filter;
