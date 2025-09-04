import React, {useState} from 'react';
import {
  BigBoldBlueTextInline,
  CommonButton,
  CommonWebBox,
  MyView,
  PhoneView,
} from '../../../styles/CommonComponents';
import JustBottomBorderTextInput from '../../../styles/common/JustBottomBorderTextInput';
import Translate from './translate';
import commonTranslator from '../../../translator/common';
import {checkDuplicate, addSchool, addExistSchool} from './utility';
import StateAndCity from '../../../components/web/StateAndCity';
import {changeText, sexKeyVals, showError} from '../../../services/utility';
import {grades} from '../../panel/config/schools/components/keyVals';
import JustBottomBorderSelect from '../../../styles/common/JustBottomBorderSelect';
function Create(props) {
  const [phone, setPhone] = useState();
  const [nid, setNid] = useState();
  const [name, setName] = useState();
  const [sex, setSex] = useState();
  const [manager, setManager] = useState();
  const [address, setAddress] = useState();
  const [tel, setTel] = useState();
  const [liableName, setLiableName] = useState();
  const [liableFamily, setLiableFamily] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
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
          <PhoneView
            style={{
              gap: 15,
            }}>
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
              const info = {
                phone: phone,
                NID: nid,
              };
              const res = await checkDuplicate(info, props.token);
              props.setLoading(false);
              if (res !== null) {
                if (res.isSchool) {
                  props.setLoading(true);
                  const res2 = await addExistSchool(
                    {
                      phone: phone,
                      NID: nid,
                    },
                    props.token,
                  );
                  props.setLoading(false);
                  if (res2 != null) props.setMode('list');
                } else {
                  setShowAllFields(!res.exist);
                  setStep(2);
                }
              } else props.setMode('list');
            }}
          />
        </MyView>
      )}
      {step === 2 && (
        <MyView>
          <PhoneView
            style={{
              gap: 15,
            }}>
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
                <PhoneView
                  style={{
                    gap: 15,
                  }}>
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
              const info = {
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
              const res = await addSchool(info, props.token);
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
