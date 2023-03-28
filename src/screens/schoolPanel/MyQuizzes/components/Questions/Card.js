import React, {useState} from 'react';
import {
  CommonRadioButton,
  MyView,
  PhoneView,
} from '../../../../../styles/Common';
import Question from '../../../../panel/question/components/Detail/Question';
import {dispatchMyQuizzesContext, myQuizzesContext} from '../Context';
import commonTranslator from '../../../../../translator/Common';

function Card(props) {
  const [isSelected, setIsSelected] = useState(false);

  const useGlobalState = () => [
    React.useContext(myQuizzesContext),
    React.useContext(dispatchMyQuizzesContext),
  ];
  const [state, dispatch] = useGlobalState();

  const toggleSelected = () => {
    setIsSelected(!isSelected);
    let newSelectedIds = state.selectedIds;

    newSelectedIds.indexOf(props.idx) === -1
      ? newSelectedIds.push(props.idx)
      : newSelectedIds.splice(newSelectedIds.indexOf(props.idx), 1);

    dispatch({selectedIds: newSelectedIds});
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
      <MyView style={{width: '90%'}}>
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
      </MyView>
    </PhoneView>
  );
}

export default Card;
