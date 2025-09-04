import React from 'react';
import vars from '@/styles/root';
import translator from '../../../../translator/common';
import {CommonButton, CommonWebBox, EqualTwoTextInputs} from '@/styles';
const NextButtons = props => {
  return (
    <CommonWebBox>
      <EqualTwoTextInputs>
        <CommonButton onPress={props.onCancel} title={translator.cancel} />
        <CommonButton
          style={{
            backgroundColor: vars.DARK_BLUE,
          }}
          title={translator.nextStep}
          onPress={props.onNext}
        />
      </EqualTwoTextInputs>
    </CommonWebBox>
  );
};
export default NextButtons;
