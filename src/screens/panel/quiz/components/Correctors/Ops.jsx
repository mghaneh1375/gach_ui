import React from 'react';
import translator from '../../translator';
import {quizContext} from '../Context';
import {LargePopUp} from '../../../../../styles/common/PopUp';
import {CommonButton, PhoneView} from '@/styles';
const Ops = props => {
  const useGlobalState = () => [React.useContext(quizContext)];
  const [state] = useGlobalState();
  return (
    <LargePopUp
      title={state.selectedQuiz.title}
      toggleShowPopUp={props.toggleShowPopUp}>
      <PhoneView>
        <CommonButton
          onPress={() => props.changeMode('questionList')}
          dir={'rtl'}
          theme={'transparent'}
          title={translator.questionList}
        />
        <CommonButton
          onPress={() => props.changeMode('studentList')}
          dir={'rtl'}
          theme={'transparent'}
          title={translator.studentList}
        />
      </PhoneView>
    </LargePopUp>
  );
};
export default Ops;
