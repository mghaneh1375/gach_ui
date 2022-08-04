import {useState} from 'react';
import {View} from 'react-native';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import Translate from '../Translate';
import commonTranslator from '../../../../tranlates/Common';

function Create(props) {
  const [name, setName] = useState();
  const [phone, setPhone] = useState();
  const [manager, setManager] = useState();
  const [address, setAddress] = useState();
  const [tel, setTel] = useState();

  return (
    <CommonWebBox
      header={Translate.addSchool}
      backBtn={true}
      onBackClick={() => props.setMode('list')}>
      <View>
        <PhoneView style={{gap: 10, flexWrap: 'wrap'}}>
          <JustBottomBorderTextInput
            onChangeText={text => props.setName(text)}
            isHalf={true}
            placeholder={Translate.name}
            subText={Translate.name}
            value={name}
          />
          <JustBottomBorderTextInput
            onChangeText={text => props.setManager(text)}
            isHalf={true}
            placeholder={Translate.manager}
            subText={Translate.manager}
            value={manager}
          />
          <JustBottomBorderTextInput
            onChangeText={text => props.setPhone(text)}
            isHalf={true}
            placeholder={Translate.phone}
            subText={Translate.phone}
            value={phone}
          />
          <JustBottomBorderTextInput
            onChangeText={text => props.setTel(text)}
            isHalf={true}
            placeholder={Translate.tel}
            subText={Translate.tel}
            value={tel}
          />
          <JustBottomBorderTextInput
            onChangeText={text => props.setAddress(text)}
            isHalf={true}
            placeholder={Translate.address}
            subText={Translate.address}
            value={address}
          />
        </PhoneView>
      </View>
      <View>
        <CommonButton
          title={commonTranslator.confrim}
          onPress={() => props.save()}
        />
      </View>
    </CommonWebBox>
  );
}

export default Create;
