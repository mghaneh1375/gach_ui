import React from 'react';
import {MyView} from '../../../../styles/Common';
import Question from './Question';

function Correct(props) {
  return (
    <MyView>
      <Question onBack={props.onBack} isCorrector={props.isCorrector} />
    </MyView>
  );
}

export default Correct;
