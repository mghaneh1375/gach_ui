import React, {useState} from 'react';
import {View} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  EqualTwoTextInputs,
  SimpleText,
} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import vars from '../../../../styles/root';
import translator from '../translate';
import commonTranslator from '../../../../tranlates/Common';
import {generalRequest, showError} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {removeAuthCache} from '../../../../API/User';
import {getDevice} from '../../../../services/Utility';
import {Device} from '../../../../models/Device';

const ChangePass = props => {
  const [oldPass, setOldPass] = useState('');
  const [pass, setPass] = useState('');
  const [rpass, setRpass] = useState('');
  const [step, setStep] = useState('chagePass');
  const navigate = props.navigate;

  const changeText = (label, text) => {
    if (label === 'old') setOldPass(text);
    else if (label === 'new') setPass(text);
    else if (label === 'rpass') setRpass(text);
  };

  const requestChange = () => {
    if (oldPass.length === 0 || pass.length === 0 || rpass.length === 0) {
      showError(commonTranslator.pleaseFillAllFields);
      return;
    }

    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.changePass,
        'post',
        {
          oldPass: oldPass,
          newPass: pass,
          confirmNewPass: rpass,
        },
        undefined,
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0]) {
        setStep('finish');
        removeAuthCache();
        const isApp = getDevice().indexOf(Device.App) !== -1;
        setTimeout(function () {
          navigate(isApp ? 'Login' : '/login');
        }, 2000);
      }
    });
  };

  return (
    <View>
      {step === 'chagePass' && (
        <View>
          <JustBottomBorderTextInput
            subText={commonTranslator.necessaryField}
            placeholder={translator.oldPass}
            type={'password'}
            onChangeText={e => changeText('old', e)}
          />
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
            onPress={() => requestChange()}
          />
        </View>
      )}

      {step === 'finish' && (
        <SimpleText text={translator.changePassSuccessfully} />
      )}
    </View>
  );
};

export default ChangePass;
