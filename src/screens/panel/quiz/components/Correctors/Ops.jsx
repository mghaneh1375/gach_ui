import React from 'react';
import translator from '../../Translator';
import {quizContext} from '../Context';
import {LargePopUp} from '../../../../../styles/Common/PopUp';
import {CommonButton, PhoneView} from '../../../../../styles/Common';

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
