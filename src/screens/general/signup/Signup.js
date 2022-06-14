import React, {useState} from 'react';

import {
  signUpOrForgetPass,
  activate,
  sendRoleForm,
  resencCode,
} from '../../../API/User';
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
  InlineTextContainer,
  SilverTextInline,
  EqualTwoTextInputs,
  CommonRadioButton,
  MinFullHeightView,
  ContentView,
  TextLink,
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
import {RoleCard} from '../../../styles/Common/RoleCard';
import {MyCountDown} from '../../../styles/Common/MyCountDown';

const SignUp = navigator => {
  const device = getDevice();

  const [userRoleFormData, setUserRoleFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const [step, setStep] = useState('signUp'); // available values: [signUp, verification, role, form]
  const [role, setRole] = useState('student'); // available values: [student, teacher, school, advisor, agent]
  const [token, setToken] = useState('');
  const [reminder, setReminder] = useState(0);
  const [firstname, setFirstname] = useState('سش');
  const [lastname, setLastname] = useState('سیش');
  const [NID, setNID] = useState('0018914373');
  const [username, setUsername] = useState('09214915905');
  const [password, setPassword] = useState('Ghhy@110');
  const [authVia, setAuthVia] = useState('sms');

  const roleForms = [];
  roleForms['school'] = [
    {
      title: translator.schoolName,
      key: 'schoolName',
    },
    {
      title: translator.schoolPhone,
      justNum: true,
      key: 'schoolPhone',
    },
  ];
  roleForms['agent'] = [
    {
      title: translator.stateName,
      justNum: true,
      key: 'stateName',
    },
  ];
  roleForms['student'] = [
    {
      title: translator.invitationCode,
      justNum: true,
      help: translator.invitationCodeHelp,
      required: false,
      key: 'invitationCode',
    },
  ];

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
        showError(commonTranslator.pleaseFillAllFields);
        return;
      }
    }

    setLoading(true);

    new Promise.all([signUpOrForgetPass(data, true)]).then(res => {
      setLoading(false);
      if (res[0] != null) {
        setToken(res[0].token);
        setReminder(res[0].reminder);
        setStep('verification');
      }
    });
  };

  const onFinishCheckingCode = code => {
    setLoading(true);

    const data = {
      token: token,
      code: code,
      username: username,
    };

    new Promise.all([activate(data)]).then(res => {
      setLoading(false);
      if (res[0] != null) {
        setToken(res[0]);
        setStep('role');
      }
    });
  };

  const setFormUserData = (key, val) => {
    userRoleFormData[key] = val;
    setUserRoleFormData(userRoleFormData);
  };

  const checkSendRoleForm = () => {
    userRoleFormData['role'] = role;

    for (var i = 0; i < roleForms[role].length; i++) {
      const field = roleForms[role][i];

      if (field.required !== undefined && !field.required) continue;

      if (
        userRoleFormData[field.key] === undefined ||
        userRoleFormData[field.key].length === 0
      ) {
        showError(commonTranslator.pleaseFillAllFields);
        return;
      }
    }

    setLoading(true);

    new Promise.all([sendRoleForm(userRoleFormData, token)]).then(res => {
      setLoading(false);
      if (res[0] != null) {
        showError('بررسی میشه میگم نتیجه رو');
        setTimeout(function () {
          navigator.navigation.navigate('Home');
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
      username: username,
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
                  onPress={() => {
                    setRole('student');
                    setStep('form');
                  }}
                  style={{marginTop: 20}}
                  color={vars.ORANGE}
                  source={require('./../../../images/student.png')}
                />
              </EqualTwoTextInputs>

              <EqualTwoTextInputs>
                <RoleCard
                  text={commonTranslator.teacher}
                  onPress={() => {
                    setRole('teacher');
                    setStep('form');
                  }}
                  style={{marginTop: 20}}
                  source={require('./../../../images/teacher.png')}
                />
                <RoleCard
                  text={commonTranslator.agent}
                  style={{marginTop: 20}}
                  onPress={() => {
                    setRole('agent');
                    setStep('form');
                  }}
                  source={require('./../../../images/agent.png')}
                />
              </EqualTwoTextInputs>

              <EqualTwoTextInputs style={{marginBottom: 20}}>
                <RoleCard
                  text={commonTranslator.school}
                  style={{marginTop: 20}}
                  onPress={() => {
                    setRole('school');
                    setStep('form');
                  }}
                  source={require('./../../../images/school.png')}
                />
                <RoleCard
                  text={commonTranslator.advisor}
                  style={{marginTop: 20}}
                  onPress={() => {
                    setRole('advisor');
                    setStep('form');
                  }}
                  source={require('./../../../images/consultant.png')}
                />
              </EqualTwoTextInputs>
            </View>
          )}

          {step !== 'role' && (
            <TextIcon>
              <BigBoldBlueTextInline
                text={translator.entryText}
                device={device}
              />
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
                onFulfill={code => onFinishCheckingCode(code)}
                containerStyle={{marginTop: 30}}
                codeInputStyle={{borderWidth: 1.5}}
              />

              {reminder > 0 && (
                <MyCountDown
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

              <InlineTextContainer style={{marginTop: 50}}>
                <BlueTextInline text={translator.ifWrongData} device={device} />
                <TextLink
                  onPress={() => navigator.navigation.navigate('SignUp')}
                  text={translator.ifWrongDataHref}
                  device={device}
                />
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
                <Pressable
                  onPress={() => navigator.navigation.navigate('Login')}>
                  <TextLink text={translator.login} device={device} />
                </Pressable>
              </InlineTextContainer>
            </View>
          )}
          {step === 'form' && (
            <View style={{marginTop: 20}}>
              {roleForms[role].map(function (obj, i) {
                return (
                  <CommonTextInput
                    key={i}
                    placeholder={obj.title}
                    justNum={obj.justNum}
                    subText={obj.help}
                    onChangeText={e => setFormUserData(obj.key, e)}
                  />
                );
              })}
              <CommonButton
                style={{
                  alignSelf: 'flex-start',
                  marginTop: 40,
                }}
                onPress={() => checkSendRoleForm()}
                title={commonTranslator.confirm}
              />
            </View>
          )}
        </ContentView>
      </MinFullHeightView>
    </ScreenScroll>
  );
};

export default SignUp;
