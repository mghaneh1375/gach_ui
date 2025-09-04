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
import React from 'react';
import {doQuizContext, dispatchDoQuizContext} from './Context';

import {faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import commonTranslator from '../../../../translator/Common';
import AttachBox from '../../../panel/ticket/components/Show/AttachBox/AttachBox';
import {getDevice} from '../../../../services/Utility';
import Timer from './Timer';

function Filter(props) {
  const useGlobalState = () => [
    React.useContext(doQuizContext),
    React.useContext(dispatchDoQuizContext),
  ];

  const [state, dispatch] = useGlobalState();
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
              <SimpleText text={'پاسخ دانش آموز: '} />

              <SimpleText text={state.questions[state.currIdx].stdAns} />
            </EqualTwoTextInputs>

            <EqualTwoTextInputs>
              <SimpleText text={state.questions[state.currIdx].answer} />
            </EqualTwoTextInputs>

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
