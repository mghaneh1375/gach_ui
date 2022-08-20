import React, {useState} from 'react';
import {CommonButton, SimpleText, MyView} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import vars from '../../../../styles/root';
import translator from '../translate';
import commonTranslator from '../../../../tranlates/Common';
import Verification from '../../login/components/Verification';
import {removeAuthCache} from '../../../../API/User';
import {getDevice, showSuccess} from '../../../../services/Utility';
import {Device} from '../../../../models/Device';
import {changeUsername} from './Utility';

const ChangeUsername = props => {
  const [newUsername, setNewUsername] = useState('');
  const [step, setStep] = useState('chageUsername');
  const [token, setToken] = useState('');
  const [reminder, setReminder] = useState(0);

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
            title={
              props.userId === undefined
                ? translator.sendCode
                : commonTranslator.confirmChanges
            }
            onPress={async () => {
              let res = await changeUsername(
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
            isHalf={false}
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
            username={newUsername}
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
