import {useState} from 'react';
import {CommonButton, CommonWebBox, PhoneView} from '@/styles';
import JustBottomBorderTextInput from '../../../../styles/common/JustBottomBorderTextInput';
import commonTranslator from '@/translator/common';
import {generalRequest} from '@/api/utility';
import {routes} from '@/api/apiRoutes';
import {showError, showSuccess} from '../../../../services/utility';
import {justifyContentEnd} from '../../../../styles/common/button';
function CreateUser(props) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [NID, setNID] = useState();
  const [mail, setMail] = useState();
  const [password, setPassword] = useState();
  return (
    <CommonWebBox
      header={'ایجاد دانش آموز جدید'}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <PhoneView
        style={{
          gap: '20px',
        }}>
        <JustBottomBorderTextInput
          value={firstName}
          onChangeText={e => setFirstName(e)}
          placeholder={commonTranslator.firstname}
          subText={commonTranslator.firstname}
        />
        <JustBottomBorderTextInput
          value={lastName}
          onChangeText={e => setLastName(e)}
          placeholder={commonTranslator.lastname}
          subText={commonTranslator.lastname}
        />
        <JustBottomBorderTextInput
          justNum={true}
          value={NID}
          onChangeText={e => setNID(e)}
          placeholder={commonTranslator.NID}
          subText={commonTranslator.NID}
        />
        <JustBottomBorderTextInput
          value={password}
          type={'password'}
          onChangeText={e => setPassword(e)}
          placeholder={commonTranslator.password}
          subText={commonTranslator.password}
        />
        <JustBottomBorderTextInput
          justNum={true}
          value={phone}
          onChangeText={e => setPhone(e)}
          placeholder={commonTranslator.phone}
          subText={'وارد کردن یکی از فیلدهای شماره همراه و یا ایمیل ضروری است'}
        />
        <JustBottomBorderTextInput
          value={mail}
          onChangeText={e => setMail(e)}
          placeholder={commonTranslator.mail}
          subText={'وارد کردن یکی از فیلدهای شماره همراه و یا ایمیل ضروری است'}
        />
      </PhoneView>
      <PhoneView style={justifyContentEnd}>
        <CommonButton
          onPress={async () => {
            if (
              firstName?.length === 0 ||
              lastName?.length === 0 ||
              NID?.length === 0 ||
              password?.length === 0
            ) {
              showError(commonTranslator.pleaseFillAllFields);
              return;
            }
            if (password.length < 6) {
              showError('رمز عبور باید حداقل 6 کاراکتر باشد');
              return;
            }
            props.setLoading(true);
            const data = {
              firstName: firstName,
              lastName: lastName,
              password: phone,
              NID: NID,
            };
            if (phone && phone !== null && phone.length > 0) data.phone = phone;
            if (mail && mail !== null && mail.length > 0) data.mail = mail;
            const res = await generalRequest(
              routes.createUserByAdmin,
              'post',
              data,
              undefined,
              props.token,
            );
            props.setLoading(false);
            if (res !== null) {
              showSuccess();
              props.setMode('list');
            }
          }}
          theme={'dark'}
          title={'ثبت دانش آموز'}
        />
      </PhoneView>
    </CommonWebBox>
  );
}
export default CreateUser;
