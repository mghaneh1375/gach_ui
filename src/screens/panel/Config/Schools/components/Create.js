import React, {useState} from 'react';
import {View} from 'react-native';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  MyView,
} from '../../../../../styles/Common';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../Translator';
import commonTranslator from '../../../../../tranlates/Common';
import {grades, kindSchools} from './KeyVals';
import StateAndCity from '../../../../../components/web/StateAndCity';
import {create, update} from './Utility';

function Create(props) {
  const [id, setId] = useState();
  const [city, setCity] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [grade, setGrade] = useState();
  const [kind, setKind] = useState();
  const [state, setState] = useState();

  React.useState(() => {
    if (props.selectedSchool === undefined) return;
    setName(props.selectedSchool.name);
    setId(props.selectedSchool.id);
    setGrade(props.selectedSchool.grade);
    setKind(props.selectedSchool.kind);
    setCity(props.selectedSchool.city);
    setAddress(props.selectedSchool.address);
  }, [props.selectedSchool]);

  const changeText = (label, text) => {
    if (label === 'name') setName(text);
    else if (label === 'address') setAddress(text);
  };

  return (
    <MyView>
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
          <StateAndCity
            state={
              props.selectedSchool !== undefined
                ? props.selectedSchool.state
                : undefined
            }
            city={city}
            setter={setCity}
            stateSetter={setState}
            setLoading={props.setLoading}
          />
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
            props.selectedSchool === undefined
              ? create(
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
              : update(
                  id,
                  {
                    id: id,
                    name: name,
                    address: address,
                    kind: kind,
                    grade: grade,
                    city: city,
                    state: state,
                    gradeStr: grades.find(elem => elem.id === grade).item,
                    kindStr: kindSchools.find(elem => elem.id === kind).item,
                  },
                  {
                    name: name,
                    address: address,
                    kind: kind,
                    grade: grade,
                    cityId: city.id,
                  },
                  props.setLoading,
                  props.token,
                  props.editSchool,
                )
          }
          theme={'dark'}
          title={commonTranslator.confirm}
        />
      </CommonWebBox>
    </MyView>
  );
}

export default Create;
