import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {MyView, PhoneView, SimpleText} from '../../../../../styles/Common';
import vars from '../../../../../styles/root';
import {dispatchQuizContext, quizContext} from '../Context';

function Test(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();

  const index = props.index;

  const choicesCount = state.wanted_answer_sheet[index].choicesCount;
  const [choicesArr, setChoicesArr] = useState();

  React.useEffect(() => {
    if (choicesCount === undefined) return;

    let ans = state.wanted_answer_sheet[index].answer;
    let studentAns = state.wanted_answer_sheet[index].studentAns;

    let tmp = [];
    for (let i = 0; i < choicesCount; i++)
      tmp.push({
        text: i + 1,
        isAnswer: state.showAnswers && ans == i + 1,
        choosen:
          state.showStdAnswers &&
          studentAns !== undefined &&
          studentAns == i + 1,
      });

    setChoicesArr(tmp);
  }, [
    choicesCount,
    state.wanted_answer_sheet,
    index,
    state.showAnswers,
    state.showStdAnswers,
  ]);

  const changeAnsSelected = idx => {
    let ans = state.wanted_answer_sheet[index].answer;
    let studentAns = state.wanted_answer_sheet[index].studentAns;

    if (state.allowChangeAns) {
      ans = idx + 1;
      state.new_answer_sheet[index] = idx + 1;
      dispatch({new_answer_sheet: state.new_answer_sheet[index]});
    } else if (state.allowChangeStdAns) {
      studentAns = idx + 1;
      state.new_std_answer_sheet[index] = idx + 1;
      dispatch({new_std_answer_sheet: state.new_std_answer_sheet});
    }

    let tmp = [];
    for (let i = 0; i < choicesCount; i++)
      tmp.push({
        text: i + 1,
        isAnswer: state.showAnswers && ans == i + 1,
        choosen:
          state.showStdAnswers &&
          studentAns !== undefined &&
          studentAns == i + 1,
      });

    setChoicesArr(tmp);
  };

  return (
    <PhoneView style={{direction: 'ltr'}}>
      <SimpleText
        style={{alignSelf: 'center', width: 25}}
        text={index + 1 + ' - '}
      />

      {choicesArr !== undefined &&
        choicesArr.map((elem, idx) => {
          if (!elem.isAnswer)
            return (
              <SimpleText
                onPress={() =>
                  state.allowChangeStdAns || state.allowChangeAns
                    ? changeAnsSelected(idx)
                    : {}
                }
                key={idx}
                style={{
                  width: 30,
                  height: 25,
                  borderRadius: 7,
                  borderWidth: 2,
                  borderColor: 'black',
                  textAlign: 'center',
                  margin: 4,
                  cursor: 'pointer',
                  backgroundColor: elem.choosen ? vars.CREAM : vars.WHITE,
                }}
                text={elem.text}
              />
            );
          return (
            <Pressable
              onPress={() =>
                state.allowChangeStdAns || state.allowChangeAns
                  ? changeAnsSelected(idx)
                  : {}
              }
              style={{
                width: 30,
                height: 25,
                borderRadius: 7,
                borderWidth: 2,
                borderColor: 'black',
                textAlign: 'center',
                margin: 4,
                cursor: 'pointer',
                backgroundColor: elem.choosen ? vars.CREAM : vars.WHITE,
              }}>
              <MyView
                style={{
                  width: 7,
                  height: 7,
                  position: 'absolute',
                  top: 1,
                  left: 2,
                  borderRadius: '50%',
                  backgroundColor: vars.GREEN,
                }}
              />
              <SimpleText key={idx} text={elem.text} />
            </Pressable>
          );
        })}

      {state.wanted_answer_sheet[index].percent !== undefined && (
        <SimpleText
          style={{alignSelf: 'center', marginLeft: 3}}
          text={'%' + state.wanted_answer_sheet[index].percent}
        />
      )}
    </PhoneView>
  );
}

export default Test;
