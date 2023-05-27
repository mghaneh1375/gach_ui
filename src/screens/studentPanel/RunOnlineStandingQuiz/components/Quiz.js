import React from 'react';
import {getDevice} from '../../../../services/Utility';
import {MyView} from '../../../../styles/Common';
import Question from './Question';

function Quiz(props) {
  const device = getDevice();

  return (
    <MyView>
      <Question onBack={props.onBack} isInReviewMode={props.isInReviewMode} />
    </MyView>
  );
}

export default Quiz;
