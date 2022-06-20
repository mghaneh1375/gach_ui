import {useState} from 'react';
import {View} from 'react-native';
import {CommonButton} from '../../../../styles/Common';
import {JustBottomBorderTextInput} from '../../../../styles/Common/JustBottomBorderTextInput';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import vars from '../../../../styles/root';
import translator from '../translate';
import commonTranslator from '../../../../tranlates/Common';

const ChangePass = props => {
  const [newPhone, setNewPhone] = useState();
  const changeNewPhone = text => {
    setNewPhone(text);
  };

  return (
    <LargePopUp
      toggleShowPopUp={props.toggleModal}
      title={translator.changePhone}
      child={
        <View>
          <JustBottomBorderTextInput
            subText={commonTranslator.necessaryField}
            justNum={true}
            placeholder={translator.newPhone}
          />
        </View>
      }
      btns={
        <CommonButton
          style={{backgroundColor: vars.DARK_BLUE}}
          title={translator.sendCode}
        />
      }
    />
  );
};

export default ChangePass;
