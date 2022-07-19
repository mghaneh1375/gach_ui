import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../translate';
import commonTranslator from '../../../../tranlates/Common';
import {
  BigBoldBlueText,
  CommonButton,
  PhoneView,
} from '../../../../styles/Common';
import {View} from 'react-native';
import vars from '../../../../styles/root';

const UpdateUsername = props => {
  const changePhone = () => {
    props.setMode('sms');
    props.toggleModal();
  };
  const changeMail = () => {
    props.setMode('mail');
    props.toggleModal();
  };

  return (
    <View>
      <PhoneView>
        <JustBottomBorderTextInput
          value={props.phone}
          isHalf={true}
          disable={true}
          placeholder={commonTranslator.phone}
        />
        <CommonButton
          style={{
            backgroundColor: vars.DARK_BLUE,
            minWidth: 120,
          }}
          title={commonTranslator.change}
          onPress={() => changePhone()}
        />
      </PhoneView>
      <PhoneView>
        <JustBottomBorderTextInput
          isHalf={true}
          value={props.mail}
          disable={true}
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
