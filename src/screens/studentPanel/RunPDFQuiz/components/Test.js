import React, {useState} from 'react';
import {Pressable} from 'react-native';
import {dispatchDoQuizContext, doQuizContext} from './Context';
import {MyView, PhoneView, SimpleText} from '../../../../styles/Common';
import vars from '../../../../styles/root';

function Test(props) {
  const useGlobalState = () => [
    React.useContext(doQuizContext),
    React.useContext(dispatchDoQuizContext),
  ];

  const [state, dispatch] = useGlobalState();

  const index = props.index;
  const qAns = state.showAnswers ? state.questions[index].answer : 0;

  const [stdAns, setStdAns] = useState(state.answers[index]);

  const choicesCount = state.questions[index].choicesCount;
  const [choicesArr, setChoicesArr] = useState();

  React.useEffect(() => {
    if (choicesCount === undefined) return;

    let tmp = [];
    for (let i = 0; i < choicesCount; i++)
      tmp.push({
        text: i + 1,
        isAnswer: qAns == i + 1,
        choosen: stdAns !== undefined && stdAns == i + 1,
      });

    setChoicesArr(tmp);
  }, [choicesCount, qAns, stdAns]);

  const changeAnsSelected = idx => {
    state.answers[index] = idx + 1;

    dispatch({answers: state.answers});
    setStdAns(idx + 1);
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
                  !state.showAnswers ? changeAnsSelected(idx) : {}
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
              onPress={() => (!state.showAnswers ? changeAnsSelected(idx) : {})}
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

      {/* {state.wanted_answer_sheet[index].percent !== undefined && (
        <SimpleText
          style={{alignSelf: 'center', marginLeft: 3}}
          text={'%' + state.wanted_answer_sheet[index].percent}
        />
      )} */}
    </PhoneView>
  );
}

export default Test;
