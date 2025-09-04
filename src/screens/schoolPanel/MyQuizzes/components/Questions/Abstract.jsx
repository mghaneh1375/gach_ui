import React from 'react';
import {dispatchMyQuizzesContext, myQuizzesContext} from '../Context';
import PDFQuestion from '../../../../panel/quiz/components/PDFQuestion/PDFQuestion';
import Questions from './Questions';

function Abstract(props) {
  const useGlobalState = () => [
    React.useContext(myQuizzesContext),
    React.useContext(dispatchMyQuizzesContext),
  ];
  const [state, dispatch] = useGlobalState();

  if (state.selectedQuiz.pdfQuiz) {
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

  return (
    <Questions
      setLoading={props.setLoading}
      setMode={props.setMode}
      user={props.user}
      navigate={props.navigate}
      token={props.token}
    />
  );
}

export default Abstract;
