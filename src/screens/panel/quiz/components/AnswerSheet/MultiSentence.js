import React, {useState} from 'react';
import {
  EqualTwoTextInputs,
  PhoneView,
  SimpleText,
} from '../../../../../styles/Common';

import {dispatchQuizContext, quizContext} from '../Context';

function MultiSentence(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [stdAns, setStdAns] = useState();
  const [answer, setAnswer] = useState();

  const index = props.index;

  React.useEffect(() => {
    setStdAns(
      state.wanted_answer_sheet[index].studentAns
        .replaceAll('1', 'ص ')
        .replaceAll('0', 'غ ')
        .replaceAll('_', 'ن'),
    );
    setAnswer(
      state.wanted_answer_sheet[index].answer
        .replaceAll('1', 'ص ')
        .replaceAll('0', 'غ '),
    );
  }, [
    state.wanted_answer_sheet,
    index,
    state.showAnswers,
    state.showStdAnswers,
  ]);
  return (
    <PhoneView style={{direction: 'ltr', marginBottom: 10}}>
      <SimpleText
        style={{alignSelf: 'center', width: 25}}
        text={index + 1 + ' - '}
      />

      <EqualTwoTextInputs style={{width: 180}}>
        {stdAns !== undefined && <SimpleText text={'پاسخ شما: ' + stdAns} />}
        {answer !== undefined && <SimpleText text={'پاسخ صحیح: ' + answer} />}
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

export default MultiSentence;
