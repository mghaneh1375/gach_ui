import React from 'react';
import {getDevice} from '../../../../services/Utility';
import {CommonWebBox, PhoneView} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';
import vars from '../../../../styles/root';
import QuestionNumber from '../../../studentPanel/RunQuiz/components/questionComponents/QuestionNumber';
import {dispatchDoCorrectContext, doCorrectContext} from './Context';

function Filter(props) {
  const useGlobalState = () => [
    React.useContext(doCorrectContext),
    React.useContext(dispatchDoCorrectContext),
  ];

  const [state, dispatch] = useGlobalState();

  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;

  return (
    <CommonWebBox
      childStyle={{...styles.padding5}}
      style={{...styles.padding0, ...styles.marginTop10}}
      width={isInPhone ? '100%' : vars.RIGHT_MENU_WIDTH}>
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
                selected={state.currIdx === index}
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
              />
            );
          })}
      </PhoneView>
    </CommonWebBox>
  );
}

export default Filter;
