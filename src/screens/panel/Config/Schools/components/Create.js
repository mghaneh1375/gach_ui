import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  MyView,
} from '../../../../../styles/Common';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../Translator';
import commonTranslator from '../../../../../translator/Common';
import {grades, kindSchools} from './KeyVals';
import StateAndCity from '../../../../../components/web/StateAndCity';
import {create, update} from './Utility';
import {changeText} from '../../../../../services/Utility';
import {dispatchSchoolContext, schoolContext} from './Context';

function Create(props) {
  const useGlobalState = () => [
    React.useContext(schoolContext),
    React.useContext(dispatchSchoolContext),
  ];

  const [globalState, dispatch] = useGlobalState();

  const [id, setId] = useState();
  const [city, setCity] = useState();
  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [grade, setGrade] = useState();
  const [kind, setKind] = useState();
  const [state, setState] = useState();

  React.useState(() => {
    if (!props.isInEditMode || globalState.selectedSchool === undefined) return;
    setName(globalState.selectedSchool.name);
    setId(globalState.selectedSchool.id);
    setGrade(globalState.selectedSchool.grade);
    setKind(globalState.selectedSchool.kind);
    setCity(globalState.selectedSchool.city);
    setAddress(globalState.selectedSchool.address);
  }, [globalState.selectedSchool, props.isInEditMode]);

  return (
    <MyView>
      <CommonWebBox
        header={
          !props.isInEditMode
            ? commonTranslator.add + ' ' + commonTranslator.school
            : commonTranslator.edit
        }
        backBtn={true}
        onBackClick={() => props.setMode('list')}>
        <PhoneView style={{gap: 15}}>
          <JustBottomBorderTextInput
            onChangeText={e => changeText(e, setName)}
            value={name}
            placeholder={translator.name}
            subText={translator.name}
          />
          <JustBottomBorderSelect
            values={grades}
            setter={setGrade}
            value={grades.find(elem => elem.id === grade)}
            placeholder={translator.grade}
            subText={translator.grade}
          />
          <JustBottomBorderSelect
            values={kindSchools}
            setter={setKind}
            value={kindSchools.find(elem => elem.id === kind)}
            placeholder={translator.kind}
            subText={translator.kind}
          />
        </PhoneView>

        <PhoneView style={{gap: 15}}>
          <StateAndCity
            state={
              props.isInEditMode ? globalState.selectedSchool.state : undefined
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
          onChangeText={e => changeText(e, setAddress)}
          multiline={true}
        />
        <CommonButton
          onPress={async () =>
            !props.isInEditMode
              ? await create(
                  {
                    name: name,
                    address: address,
                    kind: kind,
                    grade: grade,
                    city: city,
                  },
                  props.setLoading,
                  props.token,
                  newItem => {
                    let allItems = globalState.schools;
                    allItems.push(newItem);
                    dispatch({data: allItems, schools: allItems});
                    props.setMode('list');
                  },
                )
              : await update(
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
                  item => {
                    let allItems = globalState.schools;

                    allItems = allItems.map(elem => {
                      if (elem.id === item.id) return item;
                      return elem;
                    });
                    dispatch({schools: allItems, data: allItems});
                    props.setMode('list');
                  },
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
