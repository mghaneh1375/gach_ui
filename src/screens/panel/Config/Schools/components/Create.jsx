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

function Create(props) {
  const [states, setStates] = useState([]);
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [grade, setGrade] = useState();
  const [kind, setKind] = useState();
  const [resetCity, setResetCity] = useState(false);

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
        <PhoneView>
          <JustBottomBorderTextInput
            isHalf={true}
            placeholder={commonTranslator.state}
            resultPane={true}
            setSelectedItem={setSelectedState}
            values={states}
            value={state !== undefined ? state.name : ''}
            reset={false}
          />

          <JustBottomBorderTextInput
            isHalf={true}
            resultPane={true}
            placeholder={commonTranslator.city}
            setSelectedItem={setSelectedCity}
            reset={resetCity}
            value={city !== undefined ? city.name : ''}
            values={state !== undefined ? state.cities : []}
          />
        </PhoneView>
        <CommonButton theme={'dark'} title={commonTranslator.confirm} />
      </CommonWebBox>
    </View>
  );
}

export default Create;
