import React from 'react';
import JustBottomBorderTextInput from '@/styles/common/JustBottomBorderTextInput.jsx';
import translator from '../translate';
import commonTranslator from '@/translator/common';
import {BigBoldBlueText, EqualTwoTextInputs, MyView} from '@/styles/common.jsx';
const UpdatePassword = () => {
  return (
    <MyView>
      <BigBoldBlueText text={translator.yourInfo} />
      <EqualTwoTextInputs>
        <JustBottomBorderTextInput
          placeholder={commonTranslator.firstname}
          subText={commonTranslator.firstname}
        />
        <JustBottomBorderTextInput
          placeholder={commonTranslator.lastname}
          subText={commonTranslator.lastname}
        />
      </EqualTwoTextInputs>
    </MyView>
  );
};
export default UpdatePassword;
