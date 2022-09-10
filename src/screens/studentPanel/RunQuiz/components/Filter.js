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
} from '@fortawesome/free-solid-svg-icons';
import Translate from '../Translate';
import {FontIcon} from '../../../../styles/Common/FontIcon';
import commonTranslator from '../../../../translator/Common';
import Circle from '../../../../components/web/Circle';

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
      {!props.isInReviewMode && state.quizInfo !== undefined && <Timer />}

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
          <SimpleText
            style={styles.dark_blue_color}
            text={commonTranslator.nesFile}
          />

          {state.quizInfo.attaches.map((elem, index) => {
            return '';
          })}
        </MyView>
      )}
    </CommonWebBox>
  );
}

export default Filter;
