import React, {useState, useRef} from 'react';
import CodeInput from 'react-native-confirmation-code-input';
import {routes} from '../../../../API/APIRoutes';
import {fetchUser, setCacheItem} from '../../../../API/User';
import {generalRequest} from '../../../../API/Utility';
import {style} from '../../../../components/web/LargeScreen/Header/style';
import {showError, showSuccess} from '../../../../services/Utility';
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
  const [reminder, setReminder] = useState(props.reminder);

  const onFinishCheckingCode = async code => {
    props.setLoading(true);

    const data = {
      token: props.token,
      code: code,
      NID: props.username,
    };

    let res = await generalRequest(
      props.mode === 'signUp'
        ? routes.activate
        : props.mode === 'forget'
        ? routes.checkCode
        : routes.setUsername,
      'post',
      data,
      props.mode === 'signUp' ? 'token' : undefined,
      props.mode === 'changeUsername' ? props.authToken : undefined,
    );

    if (res != null) {
      if (props.mode === 'signUp') {
        props.setToken(res);
        props.setCode(code);
        await setCacheItem('user', undefined);
        await fetchUser(res, async user => {
          props.setLoading(false);
          await setCacheItem('token', res);
          props.setMode('roleForm');
        });
      } else if (props.mode === 'changeUsername') {
        props.setLoading(false);
        showSuccess(
          'عملیات موردنظر با موفقیت انجام شد و باید مجددا به سیستم ورود کنید',
        );
        props.setMode('finish');
      } else {
        props.setMode('resetPass');
        props.setCode(code);
        props.setLoading(false);
      }
    } else {
      props.setLoading(false);
    }
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
      if (res[0] != null) {
        setCanResend(false);
        setReminder(undefined);
        setTimeout(() => {
          setReminder(res[0]);
          props.setLoading(false);
        }, 500);
      } else props.setLoading(false);
    });
  };

  const RefCodeInput = useRef(null);

  React.useEffect(() => {
    if (RefCodeInput === undefined || RefCodeInput.current === undefined)
      return;

    let activeInputIdx = 0;
    function handleKeyUp(event) {
      if (RefCodeInput.current) {
        var inputs = document.getElementsByTagName('input');
        inputs[activeInputIdx + 1].focus();
        activeInputIdx++;
      }
    }
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.addEventListener('keyup', handleKeyUp);
    };
  }, [RefCodeInput]);

  return (
    <MyView style={{...style.ParentLoginModule}}>
      <BlueTextInline
        style={{marginTop: 20}}
        text={translator.enterVerification}
      />
      <MyView style={{direction: 'ltr'}}>
        <CodeInput
          ref={RefCodeInput}
          activeColor="rgba(49, 180, 4, 1)"
          inactiveColor="rgba(49, 180, 4, 1.3)"
          keyboardType="numeric"
          autoFocus={true}
          codeLength={6}
          onFulfill={code => onFinishCheckingCode(code)}
          containerStyle={{marginTop: 30}}
          codeInputStyle={{borderWidth: 1.5}}
        />
        {reminder !== undefined && reminder > 0 && (
          <MyCountDown until={reminder} onFinish={() => setCanResend(true)} />
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

      <CommonButton
        style={{marginTop: 50}}
        onPress={() => props.setMode(props.mode)}
        text={'اصلاح شماره موبایل/ایمیل'}
      />
    </MyView>
  );
};

export default Verification;
