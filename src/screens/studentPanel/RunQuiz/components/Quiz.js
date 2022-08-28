import React from 'react';
import {CommonButton, MyView, PhoneView} from '../../../../styles/Common';
import Bookmark from './Bookmark';
import {doQuizContext, dispatchDoQuizContext} from './Context';
import Question from './Question';
function Quiz(props) {
  const useGlobalState = () => [
    React.useContext(doQuizContext),
    React.useContext(dispatchDoQuizContext),
  ];

  const [state, dispatch] = useGlobalState();

  return (
    <MyView>
      <Bookmark isInReviewMode={props.isInReviewMode} />
      <Question isInReviewMode={props.isInReviewMode} />
    </MyView>
  );
}

export default Quiz;
