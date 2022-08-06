import {useState} from 'react';
import {View} from 'react-native';
import {
  BigBoldBlueTextInline,
  CommonButton,
  CommonWebBox,
  PhoneView,
} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import Translate from '../Translate';
import commonTranslator from '../../../../tranlates/Common';
import {checkDuplicate} from '../Utility';

import StateAndCity from '../../../../components/web/StateAndCity';

function CreateStep1(props) {
  const [phone, setPhone] = useState();
  const [nid, setNid] = useState();

  const [name, setName] = useState();
  //   const [phone, setPhone] = useState();
  const [manager, setManager] = useState();
  const [address, setAddress] = useState();
  const [tel, setTel] = useState();
  const [liableName, setLiableName] = useState();
  const [liableFamily, setLiableFamily] = useState();
  const [password, setPassword] = useState();
  const [repeatPassword, setRepeatPassword] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();

  const [showAllFields, setShowAllFields] = useState();
  const [step, setStep] = useState(1);

  return (
    <CommonWebBox
      header={Translate.schoolInfo}
      backBtn={true}
      onBackClick={() => (step === 1 ? props.setMode('list') : setStep(1))}>
      {step === 1 && (
        <View>
          <PhoneView style={{gap: 10, flexWrap: 'wrap'}}>
            <JustBottomBorderTextInput
              onChangeText={text => setPhone(text)}
              isHalf={true}
              placeholder={Translate.phone}
              subText={Translate.phone}
              value={phone}
            />
            <JustBottomBorderTextInput
              onChangeText={text => setNid(text)}
              isHalf={true}
              placeholder={commonTranslator.NID}
              subText={commonTranslator.NID}
              value={nid}
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
        </View>
      )}
      {step === 2 && (
        <View>
          <PhoneView style={{gap: 10, flexWrap: 'wrap'}}>
            <JustBottomBorderTextInput
              onChangeText={text => setName(text)}
              isHalf={true}
              placeholder={Translate.name}
              subText={Translate.name}
              value={name}
            />
            <JustBottomBorderTextInput
              onChangeText={text => setManager(text)}
              isHalf={true}
              placeholder={Translate.manager}
              subText={Translate.manager}
              value={manager}
            />
            <JustBottomBorderTextInput
              onChangeText={text => setTel(text)}
              isHalf={true}
              placeholder={Translate.tel}
              subText={Translate.tel}
              value={tel}
            />
            <JustBottomBorderTextInput
              onChangeText={text => setAddress(text)}
              isHalf={true}
              placeholder={Translate.address}
              subText={Translate.address}
              value={address}
            />
            {showAllFields && (
              <View>
                <PhoneView>
                  <BigBoldBlueTextInline text={Translate.info} />
                </PhoneView>
                <PhoneView style={{gap: 10, flexWrap: 'wrap'}}>
                  <JustBottomBorderTextInput
                    onChangeText={text => setLiableName(text)}
                    isHalf={true}
                    placeholder={Translate.liableName}
                    subText={Translate.liableName}
                    value={liableName}
                  />
                  <JustBottomBorderTextInput
                    onChangeText={text => setLiableFamily(text)}
                    isHalf={true}
                    placeholder={Translate.liableFamily}
                    subText={Translate.liableFamily}
                    value={liableFamily}
                  />
                  <JustBottomBorderTextInput
                    onChangeText={text => setPassword(text)}
                    isHalf={true}
                    placeholder={commonTranslator.password}
                    subText={commonTranslator.password}
                    value={password}
                  />
                  <JustBottomBorderTextInput
                    onChangeText={text => setRepeatPassword(text)}
                    isHalf={true}
                    placeholder={
                      commonTranslator.repeat + ' ' + commonTranslator.password
                    }
                    subText={
                      commonTranslator.repeat + ' ' + commonTranslator.password
                    }
                    value={repeatPassword}
                  />
                  <StateAndCity
                    state={state}
                    city={city}
                    setter={setCity}
                    stateSetter={setState}
                    setLoading={props.setLoading}
                  />
                </PhoneView>
              </View>
            )}
          </PhoneView>

          <CommonButton title={commonTranslator.confrim}></CommonButton>
        </View>
      )}
    </CommonWebBox>
  );
}

export default CreateStep1;
