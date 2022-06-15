import React, {useState} from 'react';

import {resencCode} from '../../../API/User';
import {useIsFocused} from '@react-navigation/native';
import {dispatchStateContext, globalStateContext} from './../../../App';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import {
  BigBoldBlueTextInline,
  FontIcon,
  ScreenScroll,
  CommonTextInput,
  CommonButton,
  BlueTextInline,
  CommonRadioButton,
  MinFullHeightView,
  ContentView,
} from '../../../styles/Common';
import translator from './translate';
import loginTranslator from './../login/translate';
import commonTranslator from './../../../tranlates/Common';
import {TextIcon} from '../../../styles/Common/TextIcon';
import {getDevice} from '../../../services/Utility';
import {View} from 'react-native';
import {generalRequest, showError} from '../../../API/Utility';
import {Loader} from '../../../styles/Common/Loader';
import CodeInput from 'react-native-confirmation-code-input';
import vars from '../../../styles/root';
import {MyCountDown} from '../../../styles/Common/MyCountDown';
import {routes} from '../../../API/APIRoutes';

const ForgetPass = navigator => {
  const device = getDevice();

  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [step, setStep] = useState('forget'); // available values: [signUp, verification, role, form]
  const [token, setToken] = useState('');
  const [reminder, setReminder] = useState(0);
  const [NID, setNID] = useState('0018914373');
  const [password, setPassword] = useState('Ghhy@112');
  const [rp, setRp] = useState('Ghhy@112');
  const [authVia, setAuthVia] = useState('sms');
  const [code, setCode] = useState(111111);

  const isFocused = useIsFocused();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [globalStates, dispatch] = useGlobalState();
  React.useEffect(() => {
    if (navigator.navigation.isFocused()) dispatch({showBottonNav: false});
  }, [isFocused, dispatch, navigator.navigation]);

  const changeInput = (label, text) => {
    if (label === 'NID') setNID(text);
    else if (label === 'password') setPassword(text);
    else if (label === 'rp') setRp(text);
  };

  const getWhichKindOfAuthIsAvailable = () => {
    if (NID.length === 0) {
      showError(commonTranslator.pleaseFillAllFields);
      return;
    }

    setLoading(true);
    new Promise.all([
      generalRequest(
        routes.whichKindOfAuthIsAvailable + NID,
        'get',
        null,
        'via',
      ),
    ]).then(res => {
      if (res[0] != null) {
        const via = res[0];
        if (via === 'none') showError('کد ملی وارد شده معتبر نیست');
        else if (via === 'both') setStep('chooseAuthMethod');
        else {
          setStep('verification');
          setAuthVia(via);
          requestForgetPass();
          return;
        }
      }

      setLoading(false);
    });
  };

  const requestForgetPass = () => {
    var data = {
      NID: NID,
      authVia: authVia,
    };

    setLoading(true);

    new Promise.all([
      generalRequest(routes.forgetPassword, 'post', data, [
        'token',
        'reminder',
      ]),
    ]).then(res => {
      setLoading(false);
      if (res[0] != null) {
        setToken(res[0].token);
        setReminder(res[0].reminder);
        setStep('verification');
      }
    });
  };

  const resetPassword = () => {
    const data = {
      token: token,
      code: code,
      NID: NID,
      newPass: password,
      rNewPass: rp,
    };

    for (const [key, value] of Object.entries(data)) {
      if (value.length === 0) {
        showError(commonTranslator.pleaseFillAllFields);
        return;
      }
    }

    setLoading(true);

    new Promise.all([
      generalRequest(routes.resetPassword, 'post', data, undefined),
    ]).then(res => {
      setLoading(false);
      if (res[0] != null) {
        showError('رمز شما با موفقیت تغییر کرد.');
        setTimeout(() => {
          navigator.navigation.navigate('Login');
        }, 2000);
      }
    });
  };

  const requestResendCode = () => {
    if (!canResend) {
      showError('هنوز زمان ارسال مجدد فرانرسیده است.');
      return;
    }

    setReminder(0);

    const data = {
      token: token,
      username: NID,
    };

    setLoading(true);

    new Promise.all([resencCode(data)]).then(res => {
      setLoading(false);
      if (res[0] != null) {
        setCanResend(false);
      }
    });
  };

  return (
    <ScreenScroll
      keyboardDismissMode="on-drag"
      keyboardShouldPersistTaps="always">
      <MinFullHeightView>
        {loading && <Loader loading={loading} />}
        <ContentView>
          <TextIcon>
            <BigBoldBlueTextInline
              text={translator.entryText}
              device={device}
            />

            <FontIcon
              onPress={() => navigator.navigation.navigate('Login')}
              icon={faClose}
            />
          </TextIcon>

          {step === 'verification' && (
            <View>
              <BlueTextInline
                style={{marginTop: 20}}
                text={translator.enterVerification}
              />
              <CodeInput
                activeColor="rgba(49, 180, 4, 1)"
                inactiveColor="rgba(49, 180, 4, 1.3)"
                keyboardType="numeric"
                autoFocus={false}
                codeLength={6}
                onFulfill={code => setCode(code)}
                containerStyle={{marginTop: 30}}
                codeInputStyle={{borderWidth: 1.5}}
              />

              {reminder > 0 && (
                <MyCountDown
                  style={{marginTop: 30}}
                  until={reminder}
                  onFinish={() => setCanResend(true)}
                />
              )}
              {reminder > 0 && (
                <BlueTextInline
                  style={{marginTop: 20, alignSelf: 'center'}}
                  text={translator.reminderUntilResend}
                />
              )}
              {canResend && (
                <CommonButton
                  style={{
                    alignSelf: 'center',
                    backgroundColor: vars.RED,
                    marginTop: 20,
                  }}
                  onPress={() => requestResendCode()}
                  title={translator.resend}
                />
              )}

              <CommonTextInput
                placeholder={translator.password}
                subText={loginTranslator.passwordFilter}
                type="password"
                onChangeText={e => changeInput('password', e)}
              />

              <CommonTextInput
                placeholder={translator.rPassword}
                type="password"
                onChangeText={e => changeInput('rp', e)}
              />

              <CommonButton
                style={{alignSelf: 'flex-start', marginTop: 10}}
                onPress={() => resetPassword()}
                title={commonTranslator.confirm}
              />
            </View>
          )}

          {step === 'forget' && (
            <View>
              <CommonTextInput
                placeholder={commonTranslator.NID}
                justNum={true}
                onChangeText={e => changeInput('NID', e)}
              />

              <CommonButton
                style={{alignSelf: 'flex-start', marginTop: 10}}
                onPress={() => getWhichKindOfAuthIsAvailable()}
                title={commonTranslator.confirm}
              />
            </View>
          )}

          {step === 'chooseAuthMethod' && (
            <View>
              <CommonRadioButton
                text={translator.auth}
                value="sms"
                status={authVia === 'mail' ? 'checked' : 'unchecked'}
                onPress={() => setAuthVia('sms')}
              />

              <CommonRadioButton
                text={translator.auth}
                value="mail"
                status={authVia === 'mail' ? 'checked' : 'unchecked'}
                onPress={() => setAuthVia('mail')}
              />

              <CommonButton
                style={{alignSelf: 'flex-start', marginTop: 10}}
                onPress={() => requestForgetPass()}
                title={commonTranslator.confirm}
              />
            </View>
          )}
        </ContentView>
      </MinFullHeightView>
    </ScreenScroll>
  );
};

export default ForgetPass;
