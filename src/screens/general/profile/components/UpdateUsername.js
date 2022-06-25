import {useState} from 'react';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../translate';
import commonTranslator from '../../../../tranlates/Common';
import {
  BigBoldBlueText,
  CommonButton,
  EqualTwoTextInputs,
  PhoneView,
} from '../../../../styles/Common';
import {View} from 'react-native';
import vars from '../../../../styles/root';

const UpdateUsername = props => {
  const changePass = () => {
    props.setMode('sms');
    props.toggleModal();
  };
  const changeMail = () => {
    props.setMode('mail');
    props.toggleModal();
  };

  return (
    <View>
      <BigBoldBlueText text={translator.usernameInfo} />
      <PhoneView>
        <JustBottomBorderTextInput
          isHalf={true}
          placeholder={commonTranslator.phone}
        />
        <CommonButton
          style={{
            backgroundColor: vars.DARK_BLUE,
            minWidth: 120,
          }}
          title={commonTranslator.change}
          onPress={() => changePass()}
        />
      </PhoneView>
      <PhoneView>
        <JustBottomBorderTextInput
          isHalf={true}
          placeholder={commonTranslator.mail}
        />
        <CommonButton
          style={{
            backgroundColor: vars.DARK_BLUE,
            minWidth: 120,
          }}
          title={commonTranslator.change}
          onPress={() => changeMail()}
        />
      </PhoneView>
    </View>
  );
};
export default UpdateUsername;
