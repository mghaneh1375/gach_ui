import React, {useState} from 'react';
import {CommonButton, EqualTwoTextInputs, MyView} from '@/styles';
import JustBottomBorderTextInput from '../../../../styles/common/JustBottomBorderTextInput';
import vars from '@/styles/root';
import translator from '../translate';
import commonTranslator from '@/translator/common';
import {changePass} from './utility';
import {changeText} from '../../../../services/utility';
const ChangePass = props => {
  const [oldPass, setOldPass] = useState('');
  const [pass, setPass] = useState('');
  const [rpass, setRpass] = useState('');
  return (
    <MyView>
      <MyView>
        {props.userId === undefined && (
          <JustBottomBorderTextInput
            isHalf={props.isInPhone ? undefined : true}
            subText={translator.oldPass}
            placeholder={translator.oldPass}
            type={'password'}
            onChangeText={text => changeText(text, setOldPass)}
          />
        )}
        <EqualTwoTextInputs>
          <JustBottomBorderTextInput
            isHalf={props.isInPhone ? undefined : true}
            subText={translator.newPass}
            placeholder={translator.newPass}
            type={'password'}
            onChangeText={text => changeText(text, setPass)}
          />
          <JustBottomBorderTextInput
            isHalf={props.isInPhone ? undefined : true}
            subText={translator.rNewPass}
            placeholder={translator.rNewPass}
            onChangeText={text => changeText(text, setRpass)}
            type={'password'}
          />
        </EqualTwoTextInputs>
        <CommonButton
          style={{
            backgroundColor: vars.DARK_BLUE,
          }}
          title={commonTranslator.change}
          padding={'5px 50px'}
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
