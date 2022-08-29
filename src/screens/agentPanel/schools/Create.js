import React, {useState} from 'react';
import {
  BigBoldBlueTextInline,
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
} from '../../../styles/Common';
import JustBottomBorderTextInput from '../../../styles/Common/JustBottomBorderTextInput';
import Translate from './Translate';
import commonTranslator from '../../../translator/Common';
import {checkDuplicate, addSchool} from './Utility';

import StateAndCity from '../../../components/web/StateAndCity';
import {changeText, sexKeyVals, showError} from '../../../services/Utility';
import {grades} from '../../panel/Config/Schools/components/KeyVals';
import JustBottomBorderSelect from '../../../styles/Common/JustBottomBorderSelect';

function Create(props) {
  const [phone, setPhone] = useState('09224786125');
  const [nid, setNid] = useState('0018374921');

  const [name, setName] = useState('البرز');
  const [sex, setSex] = useState('male');
  const [manager, setManager] = useState('علی');
  const [address, setAddress] = useState('سه راه تهارنپاری');
  const [tel, setTel] = useState('02177417714');
  const [liableName, setLiableName] = useState('قلی');
  const [liableFamily, setLiableFamily] = useState('علی');
  const [password, setPassword] = useState('123456Al');
  const [repeatPassword, setRepeatPassword] = useState('123456Al');
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [grade, setGrade] = useState();
  const [showAllFields, setShowAllFields] = useState();
  const [step, setStep] = useState(1);

  return (
    <CommonWebBox
      header={Translate.schoolInfo}
      backBtn={true}
      onBackClick={() => (step === 1 ? props.setMode('list') : setStep(1))}>
      {step === 1 && (
        <MyView>
          <PhoneView style={{gap: 15}}>
            <JustBottomBorderTextInput
              onChangeText={text => changeText(text, setPhone)}
              placeholder={Translate.phone}
              subText={Translate.phone}
              value={phone}
              justNum={true}
            />
            <JustBottomBorderTextInput
              onChangeText={text => changeText(text, setNid)}
              placeholder={commonTranslator.NID}
              subText={commonTranslator.NID}
              value={nid}
              justNum={true}
            />
          </PhoneView>
          <CommonButton
            title={commonTranslator.continue}
            onPress={async () => {
              props.setLoading(true);
              let info = {
                phone: phone,
                NID: nid,
              };
              let res = await checkDuplicate(info, props.token);
              props.setLoading(false);
              if (res !== null) {
                setShowAllFields(!res);
                setStep(2);
              } else props.setMode('list');
            }}
          />
        </MyView>
      )}
      {step === 2 && (
        <MyView>
          <PhoneView style={{gap: 15}}>
            <JustBottomBorderTextInput
              onChangeText={text => changeText(text, setName)}
              placeholder={Translate.name}
              subText={Translate.name}
              value={name}
            />
            <JustBottomBorderTextInput
              onChangeText={text => changeText(text, setManager)}
              placeholder={Translate.manager}
              subText={Translate.manager}
              value={manager}
            />
            <JustBottomBorderTextInput
              onChangeText={text => changeText(text, setTel)}
              placeholder={Translate.tel}
              subText={Translate.tel}
              justNum={true}
              value={tel}
            />
            <JustBottomBorderTextInput
              onChangeText={text => changeText(text, setAddress)}
              placeholder={Translate.address}
              subText={Translate.address}
              value={address}
            />
            <JustBottomBorderSelect
              values={grades}
              setter={setGrade}
              value={grades.find(elem => elem.id === grade)}
              placeholder={commonTranslator.grade}
            />
            <JustBottomBorderSelect
              values={sexKeyVals}
              setter={setSex}
              value={sexKeyVals.find(elem => elem.id === sex)}
              placeholder={commonTranslator.sex}
            />
            {showAllFields && (
              <MyView>
                <PhoneView>
                  <BigBoldBlueTextInline text={Translate.info} />
                </PhoneView>
                <PhoneView style={{gap: 15}}>
                  <JustBottomBorderTextInput
                    onChangeText={text => changeText(text, setLiableName)}
                    placeholder={Translate.liableName}
                    subText={Translate.liableName}
                    value={liableName}
                  />
                  <JustBottomBorderTextInput
                    onChangeText={text => changeText(text, setLiableFamily)}
                    placeholder={Translate.liableFamily}
                    subText={Translate.liableFamily}
                    value={liableFamily}
                  />
                  <MyView>
                    <PhoneView>
                      <JustBottomBorderTextInput
                        onChangeText={text => changeText(text, setPassword)}
                        type={'password'}
                        placeholder={commonTranslator.password}
                        subText={commonTranslator.password}
                        value={password}
                      />
                      <JustBottomBorderTextInput
                        onChangeText={text =>
                          changeText(text, setRepeatPassword)
                        }
                        type={'password'}
                        placeholder={
                          commonTranslator.repeat +
                          ' ' +
                          commonTranslator.password
                        }
                        subText={
                          commonTranslator.repeat +
                          ' ' +
                          commonTranslator.password
                        }
                        value={repeatPassword}
                      />
                    </PhoneView>
                  </MyView>
                  <StateAndCity
                    state={state}
                    city={city}
                    setter={setCity}
                    stateSetter={setState}
                    setLoading={props.setLoading}
                  />
                </PhoneView>
              </MyView>
            )}
          </PhoneView>
          <CommonButton
            title={commonTranslator.confrim}
            onPress={async () => {
              if (showAllFields && city === undefined) {
                showError(commonTranslator.pleaseFillAllFields);
                return;
              }
              props.setLoading(true);
              let info = {
                phone: phone,
                NID: nid,
                name: name,
                tel: tel,
                address: address,
                managerName: manager,
                schoolSex: sex,
                kindSchool: grade,
              };
              if (showAllFields) {
                info.password = password;
                info.rPassword = repeatPassword;
                info.city = city.id;
                info.firstName = liableName;
                info.lastName = liableFamily;
              }
              let res = await addSchool(info, props.token);
              props.setLoading(false);

              if (res !== null) {
                props.setMode('list');
              }
            }}
          />
        </MyView>
      )}
    </CommonWebBox>
  );
}

export default Create;
