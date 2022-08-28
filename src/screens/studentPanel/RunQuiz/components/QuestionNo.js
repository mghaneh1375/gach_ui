import React, {useState} from 'react';
import {CommonWebBox, PhoneView} from '../../../../styles/Common';
import vars from '../../../../styles/root';
import Translate from '../Translate';
import QuestionNumber from './QuestionNumber/QuestionNumber';

function QuestionNo(props) {
  return (
    <CommonWebBox width={vars.RIGHT_MENU_WIDTH}>
      <PhoneView style={{gap: 5}}>
        <QuestionNumber
          number={1}
          theme={'transparent'}
          bookmark={true}
          bookmarkColor={true}
        />
        <QuestionNumber number={2} bookmark={0} />
        <QuestionNumber
          number={3}
          theme={'transparent'}
          bookmark={true}
          bookmarkColor={true}
        />
        <QuestionNumber number={4} bookmark={0} />
      </PhoneView>
    </CommonWebBox>
  );
}

export default QuestionNo;
