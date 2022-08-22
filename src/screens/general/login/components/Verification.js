import React, {useState} from 'react';
import CodeInput from 'react-native-confirmation-code-input';
import {routes} from '../../../../API/APIRoutes';
import {fetchUser, setCacheItem} from '../../../../API/User';
import {generalRequest} from '../../../../API/Utility';
import {showError} from '../../../../services/Utility';
import {
  TextLink,
  BlueTextInline,
  CommonButton,
  InlineTextContainer,
  MyView,
} from '../../../../styles/Common';
import {MyCountDown} from '../../../../styles/Common/MyCountDown';
import vars from './../../../../styles/root';
import translator from './../translate';

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
        props.mode === 'signUp'
          ? routes.activate
          : props.mode === 'forgetPass'
          ? routes.checkCode
          : routes.setUsername,
        'post',
        data,
        props.mode === 'signUp' ? 'token' : undefined,
        props.mode === 'changeUsername' ? props.authToken : undefined,
      ),
    ]).then(async res => {
      if (res[0] != null) {
        if (props.mode === 'signUp') {
          props.setToken(res[0]);
          props.setCode(code);
          await setCacheItem('user', undefined);
          await fetchUser(res[0], async user => {
            props.setLoading(false);
            await setCacheItem('token', res[0]);
            props.setMode('roleForm');
          });
        } else if (props.mode === 'changeUsername') {
          props.setMode('finish');
          props.setLoading(false);
        } else {
          props.setMode('resetPass');
          props.setCode(code);
          props.setLoading(false);
        }
      } else {
        props.setLoading(false);
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
    <MyView style={{paddingLeft: 50}}>
      <BlueTextInline
        style={{marginTop: 20}}
        text={translator.enterVerification}
      />
      <MyView style={{direction: 'ltr'}}>
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
      </MyView>
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
          // 'forgetPsas' 'signUp'
          onPress={() => props.setMode(props.mode)}
          text={translator.ifWrongDataHref}
        />
      </InlineTextContainer>
    </MyView>
  );
};

export default Verification;
