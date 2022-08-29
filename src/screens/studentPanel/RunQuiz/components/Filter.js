import {
  CommonWebBox,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';
import vars from '../../../../styles/root';
import React from 'react';
import {doQuizContext, dispatchDoQuizContext} from './Context';
import QuestionNumber from './questionComponents/QuestionNumber';
import {SimpleTextIcon} from '../../../../styles/Common/TextIcon';

import Timer from './Timer';

import {faAngleDown, faBookmark} from '@fortawesome/free-solid-svg-icons';
import Translate from '../Translate';
import {FontIcon} from '../../../../styles/Common/FontIcon';

function Filter(props) {
  const useGlobalState = () => [
    React.useContext(doQuizContext),
    React.useContext(dispatchDoQuizContext),
  ];

  const [state, dispatch] = useGlobalState();

  return (
    <CommonWebBox
      childStyle={{padding: 5}}
      style={{padding: 0}}
      width={vars.RIGHT_MENU_WIDTH}>
      {props.isInReviewMode && props.mode !== 'splash' && (
        <Timer totalTime={213} reminder={300} />
      )}
      <EqualTwoTextInputs
        style={{paddingLeft: 10, paddingRight: 10, paddingTop: 10}}>
        <SimpleText style={styles.dark_blue_color} text={Translate.quizList} />
        <SimpleTextIcon
          icon={faAngleDown}
          textStyle={{...styles.colorOrangeRed, ...{marginLeft: -5}}}
          iconStyle={{...styles.colorOrangeRed}}
          iconKind={'normal'}
          text={Translate.help}
        />
      </EqualTwoTextInputs>
      <MyView>
        <PhoneView>
          <FontIcon
            kind={'small'}
            icon={'circle'}
            back={'blue'}
            parentStyle={{
              marginLeft: 5,
            }}
          />
          <SimpleText text={Translate.answered} style={{...styles.BlueBold}} />
        </PhoneView>
        <PhoneView>
          <FontIcon
            kind={'small'}
            icon={faBookmark}
            style={{color: vars.ORANGE_RED}}
            parentStyle={{
              marginLeft: 5,
              backgroundColor: 'transparent',
            }}
          />
          <SimpleText
            text={Translate.bookmarked}
            style={{...styles.BlueBold}}
          />
        </PhoneView>
        <PhoneView>
          <FontIcon
            kind={'circle'}
            icon={faBookmark}
            back={'dark'}
            parentStyle={{
              marginLeft: 5,
            }}
          />
          <SimpleText
            text={Translate.notAnswered}
            style={{...styles.BlueBold}}
          />
        </PhoneView>
      </MyView>
      <PhoneView
        style={{
          ...styles.gap7,
          ...styles.margin15,
          ...styles.justifyContentCenter,
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
                  elem.stdAns === undefined ||
                  elem.stdAns === '' ||
                  elem.stdAns === 0
                    ? 'transparent'
                    : 'green'
                }
                key={index}
                number={index + 1}
                bookmark={
                  props.isInReviewMode
                    ? 'hidden'
                    : elem.bookmark === undefined || !elem.bookmark
                    ? 'unfill'
                    : 'fill'
                }
                jump={() => {
                  if (props.mode === 'splash') return;
                  dispatch({currIdx: index});
                }}
                onChange={() => {
                  if (props.mode === 'splash') return;
                  elem.bookmark =
                    elem.bookmark === undefined || !elem.bookmark
                      ? true
                      : false;
                  dispatch({question: elem, needUpdate: true});
                }}
              />
            );
          })}
      </PhoneView>
      {state.quizInfo !== undefined && state.quizInfo.attaches !== undefined && (
        <MyView>
          <SimpleText style={styles.dark_blue_color} text="فایل های ضروری" />

          {state.quizInfo.attaches.map((elem, index) => {
            return '';
          })}
        </MyView>
      )}
    </CommonWebBox>
  );
}

export default Filter;
