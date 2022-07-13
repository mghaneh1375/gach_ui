import {useState} from 'react';
import {View} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
} from '../../../../../styles/Common';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../Translator';
import commonTranslator from '../../../../../tranlates/Common';
import {grades, kindSchools} from './KeyVals';
import StateAndCity from '../../../../../components/web/StateAndCity';
import {add} from 'react-native-reanimated';
import {create} from './Utility';

function Create(props) {
  const [city, setCity] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [grade, setGrade] = useState();
  const [kind, setKind] = useState();

  const changeText = (label, text) => {
    if (label === 'name') setName(text);
    else if (label === 'address') setAddress(text);
  };

  return (
    <View>
      <CommonWebBox
        header={translator.add}
        backBtn={true}
        onBackClick={() => props.setMode('list')}>
        <PhoneView>
          <JustBottomBorderTextInput
            onChangeText={e => changeText('name', e)}
            isHalf={true}
            value={name}
            placeholder={translator.name}
          />
          <JustBottomBorderSelect
            isHalf={true}
            values={grades}
            setter={setGrade}
            value={grades.find(elem => elem.id === grade)}
            placeholder={translator.grade}
          />
          <JustBottomBorderSelect
            isHalf={true}
            values={kindSchools}
            setter={setKind}
            value={kindSchools.find(elem => elem.id === kind)}
            placeholder={translator.kind}
          />
        </PhoneView>

        <PhoneView style={{marginTop: 20}}>
          <StateAndCity setter={setCity} setLoading={props.setLoading} />
        </PhoneView>

        <JustBottomBorderTextInput
          style={{marginTop: 20}}
          placeholder={commonTranslator.address}
          value={address}
          subText={commonTranslator.optional}
          onChangeText={e => changeText('address', e)}
          multiline={true}
        />
        <CommonButton
          onPress={() =>
            create(
              {
                name: name,
                address: address,
                kind: kind,
                grade: grade,
                city: city,
              },
              props.setLoading,
              props.token,
              props.addSchool,
            )
          }
          theme={'dark'}
          title={commonTranslator.confirm}
        />
      </CommonWebBox>
    </View>
  );
}

export default Create;
