import {CommonWebBox} from '../../../../../styles/Common';
import React, {useState} from 'react';
import Card from '../Questions/Card';
import {quizContext, dispatchQuizContext} from '../Context';

function A1Report(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];

  const [state, dispatch] = useGlobalState();

  return (
    <CommonWebBox>
      {state.selectedQuiz.A1Report !== undefined &&
        state.selectedQuiz.A1Report.map((element, index) => {
          return (
            <Card
              key={index}
              idx={index}
              setLoading={props.setLoading}
              token={props.token}
              question={element}
              needUpdate={false}
            />
          );
        })}
    </CommonWebBox>
  );
}

export default A1Report;
