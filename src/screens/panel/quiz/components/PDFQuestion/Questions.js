import React from 'react';
import {dispatchQuizContext, quizContext} from '../Context';
import PDFQuestion from './PDFQuestion';

function Questions(props) {
  const useGlobalState = () => [
    React.useContext(quizContext),
    React.useContext(dispatchQuizContext),
  ];
  const [state, dispatch] = useGlobalState();

  return (
    <PDFQuestion
      state={state}
      dispatch={dispatch}
      setLoading={props.setLoading}
      setMode={props.setMode}
      token={props.token}
    />
  );
}

export default Questions;
