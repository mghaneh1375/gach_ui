import React from 'react';
import {getDevice} from '../../../../services/Utility';
import {MyView} from '../../../../styles/Common';
import Bookmark from './Bookmark';
import Question from './Question';
function Quiz(props) {
  const device = getDevice();
  const isInPhone = device.indexOf('WebPort') !== -1;

  return (
    <MyView>
      {!isInPhone && <Bookmark isInReviewMode={props.isInReviewMode} />}
      <Question onBack={props.onBack} isInReviewMode={props.isInReviewMode} />
    </MyView>
  );
}

export default Quiz;
