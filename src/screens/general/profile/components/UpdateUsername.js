import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import commonTranslator from '../../../../tranlates/Common';
import {CommonButton, PhoneView, MyView} from '../../../../styles/Common';
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
    <MyView>
      <PhoneView>
        <JustBottomBorderTextInput
          value={props.phone}
          isHalf={true}
          disable={true}
          placeholder={commonTranslator.phone}
          subText={commonTranslator.phone}
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
          subText={commonTranslator.mail}
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
    </MyView>
  );
};
export default UpdateUsername;
