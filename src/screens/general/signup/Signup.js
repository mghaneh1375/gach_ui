import React, {useState} from 'react';

import {signUp, activate} from '../../../API/User';
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
  OrangeTextInline,
  InlineTextContainer,
  SilverTextInline,
  EqualTwoTextInputs,
  CommonRadioButton,
  MyCountDown,
  BigBoldBlueText,
  RoleCard,
} from '../../../styles/Common';
import translator from './translate';
import loginTranslator from './../login/translate';
import commonTranslator from './../../../tranlates/Common';
import {TextIcon} from '../../../styles/Common/TextIcon';
import {getDevice} from '../../../services/Utility';
import {Pressable, View} from 'react-native';
import {showError} from '../../../API/Utility';
import {Loader} from '../../../styles/Common/Loader';
import CodeInput from 'react-native-confirmation-code-input';
import vars from '../../../styles/root';

const SignUp = navigator => {
  const device = getDevice();
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [step, setStep] = useState('role');
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [reminder, setReminder] = useState(0);
  const [firstname, setFirstname] = useState('سش');
  const [lastname, setLastname] = useState('سیش');
  const [NID, setNID] = useState('0018914373');
  const [username, setUsername] = useState('09214915905');
  const [password, setPassword] = useState('Ghhy@110');
  const [authVia, setAuthVia] = useState('sms');

  const isFocused = useIsFocused();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [globalStates, dispatch] = useGlobalState();
  React.useEffect(() => {
    if (navigator.navigation.isFocused()) dispatch({showBottonNav: false});
  }, [isFocused]);

  const changeInput = (label, text) => {
    if (label === 'username') setUsername(text);
    else if (label === 'password') setPassword(text);
    else if (label === 'firstname') setFirstname(text);
    else if (label === 'lastname') setLastname(text);
    else if (label === 'NID') setNID(text);
  };

  const submit = () => {
    var data = {
      username: username,
      password: password,
      firstName: firstname,
      lastName: lastname,
      NID: NID,
      authVia: authVia,
    };

    for (const [key, value] of Object.entries(data)) {
      if (value.length === 0) {
        showError('لطفا تمام فیلدهای لازم را پر نمایید.');
        return;
      }
    }

    setLoading(true);

    new Promise.all([signUp(data)]).then(res => {
      setLoading(false);
      if (res[0] != null) {
        setToken(res[0].token);
        setReminder(res[0].reminder);
        setStep('verification');
      }
    });
  };

  const onFinishCheckingCode = (isValid, code) => {
    if (!isValid) {
      showError('مقدار وارد شده صحیح نمی باشد.');
      return;
    }

    setLoading(true);

    const data = {
      token: token,
      code: code,
      username: username,
    };

    new Promise.all([activate(data)]).then(res => {
      setLoading(false);
      if (res[0] != null) {
        // navigator.navigation.navigate('Home');
        setStep('role');
      }
    });
  };

  return (
    <ScreenScroll>
      {loading && <Loader loading={loading} />}

      {step === 'role' && (
        <View>
          <TextIcon>
            <BigBoldBlueTextInline
              text={commonTranslator.congratulations}
              device={device}
            />
            <FontIcon icon={faClose}></FontIcon>
          </TextIcon>
          <BlueTextInline
            style={{marginTop: 20}}
            text={commonTranslator.chooseOne}
          />
          <EqualTwoTextInputs>
            <RoleCard
              text={commonTranslator.student}
              style={{marginTop: 20}}
              color={vars.ORANGE}
              source={require('./../../../images/student.png')}
            />
          </EqualTwoTextInputs>

          <EqualTwoTextInputs>
            <RoleCard
              text={commonTranslator.teacher}
              style={{marginTop: 20}}
              source={require('./../../../images/teacher.png')}
            />
            <RoleCard
              text={commonTranslator.namayande}
              style={{marginTop: 20}}
              source={require('./../../../images/agent.png')}
            />
          </EqualTwoTextInputs>

          <EqualTwoTextInputs style={{marginBottom: 20}}>
            <RoleCard
              text={commonTranslator.school}
              style={{marginTop: 20}}
              source={require('./../../../images/school.png')}
            />
            <RoleCard
              text={commonTranslator.advisor}
              style={{marginTop: 20}}
              source={require('./../../../images/consultant.png')}
            />
          </EqualTwoTextInputs>
        </View>
      )}

      {step !== 'role' && (
        <TextIcon>
          <BigBoldBlueTextInline text={translator.entryText} device={device} />
          <FontIcon icon={faClose}></FontIcon>
        </TextIcon>
      )}

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
            compareWithCode="123456"
            onFulfill={(isValid, code) => onFinishCheckingCode(isValid, code)}
            containerStyle={{marginTop: 30}}
            codeInputStyle={{borderWidth: 1.5}}
          />
          <MyCountDown
            style={{marginTop: 30}}
            until={reminder}
            onFinish={() => setCanResend(true)}
          />
          <BlueTextInline
            style={{marginTop: 20, alignSelf: 'center'}}
            text={translator.reminderUntilResend}
          />
          {canResend && (
            <CommonButton
              style={{
                alignSelf: 'center',
                backgroundColor: vars.RED,
                marginTop: 20,
              }}
              onPress={() => submit()}
              title={translator.resend}
            />
          )}

          <InlineTextContainer style={{marginTop: 50}}>
            <BlueTextInline text={translator.ifWrongData} device={device} />
            <Pressable onPress={() => navigator.navigation.navigate('Login')}>
              <OrangeTextInline
                text={translator.ifWrongDataHref}
                device={device}
              />
            </Pressable>
          </InlineTextContainer>
        </View>
      )}

      {step === 'signUp' && (
        <View>
          <EqualTwoTextInputs>
            <CommonTextInput
              placeholder={commonTranslator.firstname}
              onChangeText={e => changeInput('firstname', e)}
              style={{minWidth: '48%'}}
            />

            <CommonTextInput
              placeholder={commonTranslator.lastname}
              style={{minWidth: '48%'}}
              onChangeText={e => changeInput('lastname', e)}
            />
          </EqualTwoTextInputs>

          <CommonTextInput
            placeholder={commonTranslator.NID}
            justNum="true"
            onChangeText={e => changeInput('NID', e)}
          />

          <CommonRadioButton
            text={translator.auth}
            value="sms"
            status={authVia === 'sms' ? 'checked' : 'unchecked'}
            onPress={() => setAuthVia('sms')}
          />

          <CommonTextInput
            justNum="true"
            placeholder={commonTranslator.phone}
            subText={loginTranslator.usernameFilter}
            onChangeText={e => changeInput('username', e)}
          />

          <CommonRadioButton
            text={translator.auth}
            value="mail"
            status={authVia === 'mail' ? 'checked' : 'unchecked'}
            onPress={() => setAuthVia('mail')}
          />

          <CommonTextInput
            placeholder={commonTranslator.mail}
            subText={commonTranslator.mail}
            onChangeText={e => changeInput('username', e)}
          />

          <CommonTextInput
            placeholder={commonTranslator.password}
            subText={loginTranslator.passwordFilter}
            type="password"
            onChangeText={e => changeInput('password', e)}
          />

          <SilverTextInline
            style={{marginTop: 20}}
            text={translator.acceptTerms}
          />
          <CommonButton
            style={{alignSelf: 'flex-start', marginTop: 10}}
            onPress={() => submit()}
            title={commonTranslator.signUp}
          />
          <InlineTextContainer style={{marginTop: 30}}>
            <BlueTextInline text={translator.ifSubscribe} device={device} />
            <Pressable onPress={() => navigator.navigation.navigate('Login')}>
              <OrangeTextInline text={translator.login} device={device} />
            </Pressable>
          </InlineTextContainer>
        </View>
      )}
    </ScreenScroll>
  );
};

export default SignUp;
