import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {MyView, PhoneView, SimpleText} from '../../../../../styles/Common';
import vars from '../../../../../styles/root';

function Test(props) {
  const index = props.index;

  const choicesCount = props.state.wanted_answer_sheet[index].choicesCount;
  const [choicesArr, setChoicesArr] = useState();

  React.useEffect(() => {
    if (choicesCount === undefined) return;

    let ans = props.state.wanted_answer_sheet[index].answer;
    let studentAns = props.state.wanted_answer_sheet[index].studentAns;

    let tmp = [];
    for (let i = 0; i < choicesCount; i++)
      tmp.push({
        text: i + 1,
        isAnswer: props.state.showAnswers && ans == i + 1,
        choosen:
          props.state.showStdAnswers &&
          studentAns !== undefined &&
          studentAns == i + 1,
      });

    setChoicesArr(tmp);
  }, [
    choicesCount,
    props.state.wanted_answer_sheet,
    index,
    props.state.showAnswers,
    props.state.showStdAnswers,
  ]);

  const changeAnsSelected = idx => {
    let ans = props.state.wanted_answer_sheet[index].answer;

    let studentAns = props.state.wanted_answer_sheet[index].studentAns;

    if (props.state.allowChangeAns) {
      ans = idx + 1;
      props.state.wanted_answer_sheet[index].answer = idx + 1;
      props.dispatch({
        wanted_answer_sheet: props.state.wanted_answer_sheet,
      });
    } else if (props.state.allowChangeStdAns) {
      studentAns = idx + 1;
      props.state.new_std_answer_sheet[index] = idx + 1;
      props.dispatch({new_std_answer_sheet: props.state.new_std_answer_sheet});
    }

    let tmp = [];
    for (let i = 0; i < choicesCount; i++)
      tmp.push({
        text: i + 1,
        isAnswer: props.state.showAnswers && ans == i + 1,
        choosen:
          props.state.showStdAnswers &&
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
                  props.state.allowChangeStdAns || props.state.allowChangeAns
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
                props.state.allowChangeStdAns || props.state.allowChangeAns
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

      {props.state.wanted_answer_sheet[index].percent !== undefined && (
        <SimpleText
          style={{alignSelf: 'center', marginLeft: 3}}
          text={'%' + props.state.wanted_answer_sheet[index].percent}
        />
      )}
    </PhoneView>
  );
}

export default Test;
