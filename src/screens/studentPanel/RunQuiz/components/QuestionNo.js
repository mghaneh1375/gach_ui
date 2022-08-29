import React, {useState} from 'react';
import {MyView} from 'react-native-multi-selectbox';
import {CommonWebBox, PhoneView, SimpleText} from '../../../../styles/Common';
import {styles} from '../../../../styles/Common/Styles';
import vars from '../../../../styles/root';
import Translate from '../Translate';
import QuestionNumber from './questionComponents/QuestionNumber';
import Timer from './Timer/Timer';

function QuestionNo(props) {
  return (
    <CommonWebBox width={vars.RIGHT_MENU_WIDTH}>
      <Timer time={'15:30'} />
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
