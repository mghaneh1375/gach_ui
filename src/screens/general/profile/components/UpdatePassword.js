import React from 'react';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../translate';
import commonTranslator from '../../../../tranlates/Common';
import {
  BigBoldBlueText,
  EqualTwoTextInputs,
  MyView,
} from '../../../../styles/Common';

const UpdatePassword = props => {
  return (
    <MyView>
      <BigBoldBlueText text={translator.yourInfo} />
      <EqualTwoTextInputs>
        <JustBottomBorderTextInput
          isHalf={false}
          placeholder={commonTranslator.firstname}
          subText={commonTranslator.firstname}
        />
        <JustBottomBorderTextInput
          isHalf={false}
          placeholder={commonTranslator.lastname}
          subText={commonTranslator.lastname}
        />
      </EqualTwoTextInputs>
    </MyView>
  );
};
export default UpdatePassword;
