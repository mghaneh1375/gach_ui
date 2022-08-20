import React, {useState} from 'react';
import {
  CommonButton,
  EqualTwoTextInputs,
  MyView,
} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import vars from '../../../../styles/root';
import translator from '../translate';
import commonTranslator from '../../../../tranlates/Common';
import {changePass} from './Utility';
import {changeText} from '../../../../services/Utility';

const ChangePass = props => {
  const [oldPass, setOldPass] = useState('');
  const [pass, setPass] = useState('');
  const [rpass, setRpass] = useState('');

  return (
    <MyView>
      <MyView>
        {props.userId === undefined && (
          <JustBottomBorderTextInput
            isHalf={true}
            subText={translator.oldPass}
            placeholder={translator.oldPass}
            type={'password'}
            onChangeText={text => changeText(text, setOldPass)}
          />
        )}
        <EqualTwoTextInputs>
          <JustBottomBorderTextInput
            isHalf={true}
            subText={translator.newPass}
            placeholder={translator.newPass}
            type={'password'}
            onChangeText={text => changeText(text, setPass)}
          />
          <JustBottomBorderTextInput
            isHalf={true}
            subText={translator.rNewPass}
            placeholder={translator.rNewPass}
            onChangeText={text => changeText(text, setRpass)}
            type={'password'}
          />
        </EqualTwoTextInputs>
        <CommonButton
          style={{backgroundColor: vars.DARK_BLUE}}
          title={commonTranslator.change}
          onPress={() =>
            changePass(
              props.setLoading,
              props.token,
              props.navigate,
              props.userId,
              props.userId !== undefined ? '1' : oldPass,
              pass,
              rpass,
            )
          }
        />
      </MyView>
    </MyView>
  );
};

export default ChangePass;
