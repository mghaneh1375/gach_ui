import {
  CommonButton,
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
import {SimpleTextIcon} from '../../../../styles/Common/TextIcon';

import {
  faAngleDown,
  faAngleUp,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import Translate from '../Translate';
import commonTranslator from '../../../../translator/Common';
import Circle from '../../../../components/web/Circle';
import AttachBox from '../../../panel/ticket/components/Show/AttachBox/AttachBox';
import {
  convertTimestampToJustTime,
  getDevice,
} from '../../../../services/Utility';
import QuestionNumber from '../../RunQuiz/components/questionComponents/QuestionNumber';
import Timer from './Timer';

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
            callExit={() => dispatch({exit: true})}
            callNeedStore={() => dispatch({needRanking: true})}
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
                  bookmark={'hidden'}
                  jump={() => {
                    if (props.mode === 'splash') return;
                    dispatch({currIdx: index});
                  }}
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
      {state.ranking !== undefined && (
        <MyView
          style={{
            padding: 20,
            paddingBottom: 50,
            borderBottomWidth: 2,
            borderColor: vars.DARK_BLUE,
          }}>
          <SimpleText
            style={{...styles.BlueBold, ...styles.marginBottom20}}
            text={'جدول رتبه بندی'}
          />
          {state.ranking.map((e, index) => {
            return (
              <PhoneView key={index}>
                <SimpleText text={index + 1} />
                <SimpleText text={' - '} />
                <SimpleText text={e.teamName} />
                <SimpleText text={' : '} />
                <SimpleText text={e.point} />
              </PhoneView>
            );
          })}
          {state.lastFetchedAt !== undefined && (
            <EqualTwoTextInputs
              style={{
                ...styles.marginTop20,
              }}>
              <SimpleText
                style={{
                  ...styles.fontSize12,
                  ...styles.BlueBold,
                  ...styles.alignSelfCenter,
                }}
                text={'آخرین به روزرسانی: '}
              />
              <SimpleText
                style={{
                  ...styles.fontSize12,
                  ...styles.BlueBold,
                  ...styles.alignSelfCenter,
                }}
                text={convertTimestampToJustTime(state.lastFetchedAt)}
              />
            </EqualTwoTextInputs>
          )}
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
                    .replaceAll('_', 'ن ')}
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

            {state.questions[state.currIdx].oldCorrect +
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

            {state.questions[state.currIdx].stdMark !== undefined && (
              <EqualTwoTextInputs>
                <SimpleText text={'نمره سوال: '} />
                <SimpleText text={state.questions[state.currIdx].mark} />
              </EqualTwoTextInputs>
            )}

            <CommonButton
              onPress={() => {
                props.setQuestionId(state.questions[state.currIdx].id);
                props.setShowReportPane(true);
              }}
              title={commonTranslator.questionReport}
            />
          </MyView>
        )}
    </CommonWebBox>
  );
}

export default Filter;
