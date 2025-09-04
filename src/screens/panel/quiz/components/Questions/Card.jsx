import React, {useState} from 'react';
import {CommonRadioButton, PhoneView, MyView} from '@/styles';
import Question from '../../../question/components/detail/Question';
import commonTranslator from '@/translator/common';
import {dispatchQuizContext, quizContext} from '../Context';
import EscapeQuestion from '../../../question/components/detail/EscapeQuestion';
function Card(props) {
  const [isSelected, setIsSelected] = useState(false);
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();
  const toggleSelected = () => {
    setIsSelected(!isSelected);
    const newSelectedIds = state.selectedIds;
    newSelectedIds.indexOf(props.idx) === -1
      ? newSelectedIds.push(props.idx)
      : newSelectedIds.splice(newSelectedIds.indexOf(props.idx), 1);
    dispatch({
      selectedIds: newSelectedIds,
    });
  };
  return (
    <PhoneView>
      {(props.needUpdate === undefined || props.needUpdate) && (
        <CommonRadioButton
          status={isSelected ? 'checked' : 'unchecked'}
          onPress={() => toggleSelected()}
          text={''}
        />
      )}
      <MyView
        style={{
          width: '90%',
        }}>
        {state.selectedQuiz.generalMode !== 'escape' && (
          <Question
            dispatch={dispatch}
            needOps={false}
            question={props.question}
            totalQuestions={props.totalQuestions}
            btns={
              props.needUpdate !== undefined && !props.needUpdate
                ? []
                : [
                    {
                      theme: 'dark',
                      title: commonTranslator.edit,
                      onPress: question => {
                        props.setSelectedQuestion(question);
                      },
                    },
                  ]
            }
          />
        )}
        {state.selectedQuiz.generalMode === 'escape' && (
          <EscapeQuestion
            dispatch={dispatch}
            needOps={false}
            question={props.question}
            totalQuestions={props.totalQuestions}
          />
        )}
      </MyView>
    </PhoneView>
  );
}
export default Card;
