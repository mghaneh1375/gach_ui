import React from 'react';
import {MyView} from '../../../../styles/Common';
import Question from './Question';

function Quiz(props) {
  return (
    <MyView>
      <Question onBack={props.onBack} isInReviewMode={props.isInReviewMode} />
    </MyView>
  );
}

export default Quiz;
