import {
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

function Filter(props) {
  const useGlobalState = () => [
    React.useContext(doQuizContext),
    React.useContext(dispatchDoQuizContext),
  ];

  const [state, dispatch] = useGlobalState();
  //   console.log(state.questions);

  return (
    <MyView style={{backgroundColor: vars.WHITE, width: vars.RIGHT_MENU_WIDTH}}>
      <EqualTwoTextInputs>
        <SimpleText style={{color: styles.BlueBold}} text={'لیست سوالات'} />
        <SimpleText style={{color: styles.colorOrange}} text={'راهنما'} />
      </EqualTwoTextInputs>
      <PhoneView style={{...styles.gap10, ...styles.padding10}}>
        {state.questions !== undefined &&
          state.questions.map((elem, index) => {
            return (
              <QuestionNumber
                theme={
                  elem.stdAns === undefined ||
                  elem.stdAns === '' ||
                  elem.stdAns === 0
                    ? 'transparent'
                    : 'green'
                }
                key={index}
                number={index + 1}
              />
            );
          })}
      </PhoneView>
    </MyView>
  );
}

export default Filter;
