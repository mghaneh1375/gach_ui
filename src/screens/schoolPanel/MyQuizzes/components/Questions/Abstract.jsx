import React from 'react';
import {dispatchMyQuizzesContext, myQuizzesContext} from '../Context.jsx';
import PDFQuestion from '../../../../panel/quiz/components/pdfQuestion/PDFQuestion.jsx';
import Questions from './Questions.jsx';
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
