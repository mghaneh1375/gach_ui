import React from 'react';

import Question from './Question';
import {MyView} from '@/styles';
function Correct(props) {
  return (
    <MyView>
      <Question onBack={props.onBack} isCorrector={props.isCorrector} />
    </MyView>
  );
}
export default Correct;
