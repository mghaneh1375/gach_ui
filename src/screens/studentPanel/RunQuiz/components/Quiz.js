import React from 'react';
import {MyView} from '../../../../styles/Common';
import {doQuizContext, dispatchDoQuizContext} from './Context';
function Quiz(props) {
  const useGlobalState = () => [
    React.useContext(doQuizContext),
    React.useContext(dispatchDoQuizContext),
  ];

  const [state, dispatch] = useGlobalState();

  return <MyView></MyView>;
}

export default Quiz;
