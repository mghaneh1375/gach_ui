import React, {useState} from 'react';
import {View} from 'react-native';
import {CommonButton, SimpleText} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import vars from '../../../../styles/root';
import translator from '../translate';
import commonTranslator from '../../../../tranlates/Common';
import {generalRequest, showError} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import Verification from '../../login/components/Verification';
import {removeAuthCache, setCacheItem} from '../../../../API/User';
import {getDevice} from '../../../../services/Utility';
import {Device} from '../../../../models/Device';

const ChangeUsername = props => {
  const [newUsername, setNewUsername] = useState('');
  const [step, setStep] = useState('chageUsername');
  const [token, setToken] = useState('');
  const [reminder, setReminder] = useState(0);
  const [code, setCode] = useState('');

  const navigate = props.navigate;

  React.useEffect(() => {
    if (step === 'finish') {
      removeAuthCache();
      const isApp = getDevice().indexOf(Device.App) !== -1;
      setTimeout(function () {
        navigate(isApp ? 'Login' : '/login');
      }, 2000);
    }
  }, [step, navigate]);

  const changeNewUsername = text => {
    setNewUsername(text);
  };

  const requestChange = () => {
    console.log('sa');
    if (newUsername.length === 0) {
      showError(commonTranslator.pleaseFillAllFields);
      return;
    }

    props.setLoading(true);

    Promise.all([
      generalRequest(
        routes.updateUsername,
        'post',
        {
          mode: props.mode,
          username: newUsername,
        },
        ['token', 'reminder'],
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);

      if (res[0] !== null) {
        setToken(res[0].token);
        setReminder(res[0].reminder);
        setStep('verification');
      }
    });
  };

  return (
    <LargePopUp
      toggleShowPopUp={props.toggleModal}
      title={
        props.mode === 'sms' ? translator.changePhone : translator.changeMail
      }
      btns={
        step === 'chageUsername' ? (
          <CommonButton
            style={{backgroundColor: vars.DARK_BLUE}}
            title={translator.sendCode}
            onPress={() => requestChange()}
          />
        ) : (
          <></>
        )
      }>
      <View>
        {step === 'chageUsername' && (
          <JustBottomBorderTextInput
            subText={commonTranslator.necessaryField}
            justNum={true}
            placeholder={
              props.mode === 'sms' ? translator.newPhone : translator.newMail
            }
            onChangeText={e => changeNewUsername(e)}
          />
        )}
        {step === 'verification' && (
          <Verification
            setLoading={props.setLoading}
            setReminder={setReminder}
            reminder={reminder}
            token={token}
            authToken={props.token}
            mode={'changeUsername'}
            setMode={setStep}
            username={newUsername}
          />
        )}
        {step === 'finish' && (
          <SimpleText text={translator.changeUsernameSuccessfully} />
        )}
      </View>
    </LargePopUp>
  );
};

export default ChangeUsername;
