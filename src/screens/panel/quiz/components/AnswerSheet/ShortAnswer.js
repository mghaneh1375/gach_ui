import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {
  EqualTwoTextInputs,
  MyView,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import vars from '../../../../../styles/root';
import {dispatchQuizContext, quizContext} from '../Context';

function ShortAnswer(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [stdAns, setStdAns] = useState();
  const [answer, setAnswer] = useState();

  const index = props.index;

  React.useEffect(() => {
    setStdAns(state.wanted_answer_sheet[index].studentAns);
    setAnswer(state.wanted_answer_sheet[index].answer);
  }, [
    state.wanted_answer_sheet,
    index,
    state.showAnswers,
    state.showStdAnswers,
  ]);

  //   const changeAnsSelected = idx => {
  //     let ans = state.wanted_answer_sheet[index].answer;
  //     let studentAns = state.wanted_answer_sheet[index].studentAns;

  //     if (state.allowChangeAns) {
  //       ans = idx + 1;
  //       state.new_answer_sheet[index] = idx + 1;
  //       dispatch({new_answer_sheet: state.new_answer_sheet[index]});
  //     } else if (state.allowChangeStdAns) {
  //       studentAns = idx + 1;
  //       state.new_std_answer_sheet[index] = idx + 1;
  //       dispatch({new_std_answer_sheet: state.new_std_answer_sheet});
  //     }

  //     let tmp = [];
  //     for (let i = 0; i < choicesCount; i++)
  //       tmp.push({
  //         text: i + 1,
  //         isAnswer: state.showAnswers && ans == i + 1,
  //         choosen:
  //           state.showStdAnswers &&
  //           studentAns !== undefined &&
  //           studentAns == i + 1,
  //       });

  //     setChoicesArr(tmp);
  //   };

  return (
    <PhoneView style={{direction: 'ltr', marginBottom: 10}}>
      <SimpleText
        style={{alignSelf: 'center', width: 25}}
        text={index + 1 + ' - '}
      />

      <EqualTwoTextInputs style={{width: 180}}>
        {stdAns !== undefined && (
          <MyView style={{width: '45%'}}>
            <JustBottomBorderTextInput
              style={{textAlign: 'center'}}
              backgroundColor={vars.WHITE}
              placeholder={stdAns}
              disable={true}
            />
            <div
              style={{
                width: 7,
                height: 7,
                position: 'absolute',
                top: 8,
                left: 4,
                borderRadius: '50%',
                backgroundColor: vars.DARK_CREAM,
              }}></div>
          </MyView>
        )}
        {answer !== undefined && (
          <MyView style={{width: '45%'}}>
            <JustBottomBorderTextInput
              style={{textAlign: 'center'}}
              backgroundColor={vars.WHITE}
              placeholder={answer}
              disable={true}
            />
            <div
              style={{
                width: 7,
                height: 7,
                position: 'absolute',
                top: 8,
                left: 4,
                borderRadius: '50%',
                backgroundColor: vars.GREEN,
              }}></div>
          </MyView>
        )}
      </EqualTwoTextInputs>

      {state.wanted_answer_sheet[index].percent !== undefined && (
        <SimpleText
          style={{alignSelf: 'center', marginLeft: 3}}
          text={'%' + state.wanted_answer_sheet[index].percent}
        />
      )}
    </PhoneView>
  );
}

export default ShortAnswer;
