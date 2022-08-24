import {View} from 'react-native';
import {
  CommonRadioButton,
  PhoneView,
  MyView,
} from '../../../../../styles/Common';
import Question from '../../../question/components/Detail/Question';
import React, {useState} from 'react';
import commonTranslator from '../../../../../tranlates/Common';
import {dispatchQuizContext, quizContext} from '../Context';

function Card(props) {
  const [isSelected, setIsSelected] = useState(false);

  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
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
      <CommonRadioButton
        status={isSelected ? 'checked' : 'unchecked'}
        onPress={() => toggleSelected()}
        text={''}
      />
      <MyView style={{width: '90%'}}>
        <Question
          needOps={false}
          question={props.question}
          counter={props.counter}
          btns={[
            {
              theme: 'dark',
              title: commonTranslator.edit,
              onPress: question => {
                props.setSelectedQuestion(question);
              },
            },
          ]}
        />
      </MyView>
    </PhoneView>
  );
}

export default Card;
