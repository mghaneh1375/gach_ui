import React from 'react';
import {MyView} from '../../../../styles/Common';
import Bookmark from './Bookmark';
import Question from './Question';
function Quiz(props) {
  return (
    <MyView>
      <Bookmark isInReviewMode={props.isInReviewMode} />
      <Question onBack={props.onBack} isInReviewMode={props.isInReviewMode} />
    </MyView>
  );
}

export default Quiz;
