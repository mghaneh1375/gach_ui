import {MyView, PhoneView, SimpleText} from '../../../../../styles/Common';
import React from 'react';
import {questionContext, dispatchQuestionContext} from './Context';

function Report() {
  const useGlobalState = () => [
    React.useContext(questionContext),
    React.useContext(dispatchQuestionContext),
  ];
  const [state, dispatch] = useGlobalState();

  return (
    <MyView style={{gap: 20}}>
      <PhoneView style={{gap: 50}}></PhoneView>
    </MyView>
  );
}

export default Report;
