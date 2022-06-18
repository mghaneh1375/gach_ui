import React, {useState} from 'react';
import {View} from 'react-native';
import CodeInput from 'react-native-confirmation-code-input';
import {routes} from '../../../../../API/APIRoutes';
import {generalRequest, showError} from '../../../../../API/Utility';
import {
  TextLink,
  BlueTextInline,
  CommonButton,
  InlineTextContainer,
} from '../../../../../styles/Common';
import {MyCountDown} from '../../../../../styles/Common/MyCountDown';
import vars from '../../../../../styles/root';
import translator from '../../../signup/translate';

const Verification = props => {
  const [canResend, setCanResend] = useState(false);

  const onFinishCheckingCode = code => {
    props.setLoading(true);

    const data = {
      token: props.token,
      code: code,
      username: props.username,
    };

    Promise.all([
      generalRequest(
        props.isSignUp ? routes.activate : routes.checkCode,
        'post',
        data,
        props.isSignUp ? 'token' : undefined,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] != null) {
        props.setCode(code);
        if (props.isSignUp) {
          props.setToken(res[0]);
          props.setMode('roleForm');
        } else props.setMode('resetPass');
      }
    });
  };

  const requestResendCode = () => {
    if (!canResend) {
      showError(translator.canNotResend);
      return;
    }

    props.setReminder(0);

    const data = {
      token: props.token,
      username: props.username,
    };

    props.setLoading(true);

    Promise.all([
      generalRequest(routes.resendCode, 'post', data, 'reminder'),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] != null) {
        setCanResend(false);
      }
    });
  };

  return (
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

      {props.reminder > 0 && (
        <MyCountDown
          until={props.reminder}
          onFinish={() => setCanResend(true)}
        />
      )}
      {props.reminder > 0 && (
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
        <BlueTextInline text={translator.ifWrongData} />
        <TextLink
          onPress={() =>
            props.isSignUp
              ? props.setMode('signUp')
              : props.setMode('forgetPsas')
          }
          text={translator.ifWrongDataHref}
        />
      </InlineTextContainer>
    </View>
  );
};

export default Verification;
