import React, {useState} from 'react';
import {View} from 'react-native';
import {CommonButton, EqualTwoTextInputs} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import vars from '../../../../styles/root';
import translator from '../translate';
import commonTranslator from '../../../../tranlates/Common';
import {changePass} from './Utility';

const ChangePass = props => {
  const [oldPass, setOldPass] = useState('');
  const [pass, setPass] = useState('');
  const [rpass, setRpass] = useState('');

  const changeText = (label, text) => {
    if (label === 'old') setOldPass(text);
    else if (label === 'new') setPass(text);
    else if (label === 'rpass') setRpass(text);
  };

  return (
    <MyView>
      <MyView>
        {props.userId === undefined && (
          <JustBottomBorderTextInput
            subText={commonTranslator.necessaryField}
            placeholder={translator.oldPass}
            type={'password'}
            onChangeText={e => changeText('old', e)}
          />
        )}
        <EqualTwoTextInputs>
          <JustBottomBorderTextInput
            subText={commonTranslator.necessaryField}
            placeholder={translator.newPass}
            type={'password'}
            onChangeText={e => changeText('new', e)}
          />
          <JustBottomBorderTextInput
            subText={commonTranslator.necessaryField}
            placeholder={translator.rNewPass}
            onChangeText={e => changeText('rpass', e)}
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
