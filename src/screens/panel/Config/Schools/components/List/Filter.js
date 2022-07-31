import {useState} from 'react';
import {View} from 'react-native';
import StateAndCity from '../../../../../../components/web/StateAndCity';
import {CommonButton, PhoneView} from '../../../../../../styles/Common';
import JustBottomBorderSelect from '../../../../../../styles/Common/JustBottomBorderSelect';
import commonTranslator from '../../../../../../tranlates/Common';
import translator from '../../Translator';
import {grades, kindSchools} from '../KeyVals';
import {filter} from '../Utility';

function Filter(props) {
  const [kindSchool, setKindSchool] = useState();
  const [grade, setGrade] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();

  const doFilter = async () => {
    props.setLoading(true);
    let res = await filter(props.token, kindSchool, grade, state, city);
    props.setLoading(false);
    if (res !== null) props.setData(res);
  };

  return (
    <View>
      <PhoneView style={{display: 'flex', gap: 10, flexWrap: 'wrap'}}>
        <JustBottomBorderSelect
          isHalf={true}
          setter={setKindSchool}
          values={kindSchools}
          value={kindSchools.find(elem => elem.id === kindSchool)}
          placeholder={translator.kind}
        />
        <JustBottomBorderSelect
          isHalf={true}
          setter={setGrade}
          values={grades}
          value={grades.find(elem => elem.id === grade)}
          placeholder={translator.grade}
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
          isHalf={true}
          title={commonTranslator.show}
          style={{alignSelf: 'flex-start'}}
        />
      </PhoneView>
    </View>
  );
}

export default Filter;
