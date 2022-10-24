import {useState} from 'react';
import StateAndCity from '../../../../../../components/web/StateAndCity';
import {allTrueFalseValues} from '../../../../../../services/Utility';
import {CommonButton, PhoneView, MyView} from '../../../../../../styles/Common';
import JustBottomBorderSelect from '../../../../../../styles/Common/JustBottomBorderSelect';
import commonTranslator from '../../../../../../translator/Common';
import translator from '../../Translator';
import {gradesForFilter, kindSchoolsForFilter} from '../KeyVals';
import {filter} from '../Utility';

function Filter(props) {
  const [kindSchool, setKindSchool] = useState();
  const [grade, setGrade] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [hasUser, setHasUser] = useState('all');

  const doFilter = async () => {
    props.setLoading(true);
    let res = await filter(
      props.token,
      kindSchool,
      grade,
      state,
      city,
      hasUser,
    );
    props.setLoading(false);
    if (res !== null) props.setData(res);
  };

  const [school, setSchool] = useState();

  return (
    <MyView>
      <PhoneView style={{gap: 15}}>
        <JustBottomBorderTextInput
          isHalf={true}
          style={{maxWidth: 'unset'}}
          placeholder={commonTranslator.school}
          subText={commonTranslator.school}
          resultPane={true}
          setSelectedItem={setSchool}
          values={props.schools}
          value={school !== undefined ? school.name : ''}
          reset={false}
        />

        {props.isAdmin && (
          <JustBottomBorderSelect
            setter={setHasUser}
            values={allTrueFalseValues}
            value={allTrueFalseValues.find(elem => elem.id === hasUser)}
            placeholder={translator.hasUser}
            subText={translator.hasUser}
          />
        )}

        <JustBottomBorderSelect
          setter={setKindSchool}
          values={kindSchoolsForFilter}
          value={kindSchoolsForFilter.find(elem => elem.id === kindSchool)}
          placeholder={translator.kind}
          subText={translator.kind}
        />
        <JustBottomBorderSelect
          setter={setGrade}
          values={gradesForFilter}
          value={gradesForFilter.find(elem => elem.id === grade)}
          placeholder={translator.grade}
          subText={translator.grade}
        />
        <StateAndCity
          states={props.states}
          state={state}
          city={city}
          setter={setCity}
          stateSetter={setState}
          setLoading={props.setLoading}
        />
        <CommonButton
          onPress={() => doFilter()}
          title={commonTranslator.show}
          style={{alignSelf: 'flex-start'}}
        />
      </PhoneView>
    </MyView>
  );
}

export default Filter;
