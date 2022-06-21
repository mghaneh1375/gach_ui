import {useState} from 'react';
import {JustBottomBorderTextInput} from '../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../translate';
import commonTranslator from '../../../../tranlates/Common';
import {BigBoldBlueText, EqualTwoTextInputs} from '../../../../styles/Common';
import {View} from 'react-native';

const UpdateUsername = props => {
  return (
    <View>
      <BigBoldBlueText text={translator.usernameInfo} />
      <EqualTwoTextInputs>
        <JustBottomBorderTextInput
          isHalf={true}
          subText={commonTranslator.necessaryField}
          placeholder={commonTranslator.firstname}
        />
        <JustBottomBorderTextInput
          isHalf={true}
          placeholder={commonTranslator.lastname}
        />
      </EqualTwoTextInputs>
    </View>
  );
};
export default UpdateUsername;
