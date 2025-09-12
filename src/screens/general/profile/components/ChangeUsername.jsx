import React, {useState} from 'react';
import {CommonButton, SimpleText, MyView} from '@/styles';
import JustBottomBorderTextInput from '@/styles/common/JustBottomBorderTextInput.jsx';
import {LargePopUp} from '@/styles/common/PopUp.jsx';
import vars from '@/styles/root';
import translator from '../translate';
import commonTranslator from '@/translator/common';
import Verification from '../../login/components/Verification.jsx';
import {removeAuthCache} from '@/api/user';
import {getDevice, showSuccess} from '@/services/utility';
import {Device} from '@/models/device';
import {changeUsername} from './utility';
const ChangeUsername = props => {
  const [newUsername, setNewUsername] = useState('');
  const [step, setStep] = useState('chageUsername');
  const [token, setToken] = useState('');
  const [reminder, setReminder] = useState(0);

  // const navigate = props.navigate;

  React.useEffect(() => {
    if (step === 'finish') {
      const isApp = getDevice().indexOf(Device.App) !== -1;
      setTimeout(function () {
        removeAuthCache();
        window.location.href = '/login';
      }, 5000);
    }
  }, [step]); //, navigate

  const changeNewUsername = text => {
    setNewUsername(text);
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
            style={{
              backgroundColor: vars.DARK_BLUE,
            }}
            title={
              props.userId === undefined
                ? translator.sendCode
                : commonTranslator.confirmChanges
            }
            onPress={async () => {
              const res = await changeUsername(
                props.setLoading,
                props.token,
                props.userId,
                props.mode,
                newUsername,
              );
              if (res !== null) {
                if (props.userId === undefined) {
                  setToken(res.token);
                  setReminder(res.reminder);
                  setStep('verification');
                } else {
                  showSuccess(commonTranslator.success);
                  props.updateUser(
                    props.mode === 'sms' ? 'phone' : 'mail',
                    newUsername,
                  );
                  props.toggleModal();
                }
              }
            }}
          />
        ) : (
          <></>
        )
      }>
      <MyView>
        {step === 'chageUsername' && (
          <JustBottomBorderTextInput
            subText={
              props.mode === 'sms' ? translator.newPhone : translator.newMail
            }
            justNum={props.mode === 'sms' ? true : undefined}
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
            username={props.NID}
          />
        )}
        {step === 'finish' && (
          <SimpleText text={translator.changeUsernameSuccessfully} />
        )}
      </MyView>
    </LargePopUp>
  );
};
export default ChangeUsername;
