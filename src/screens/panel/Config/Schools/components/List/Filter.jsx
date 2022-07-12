import {useState} from 'react';
import {CommonButton, PhoneView} from '../../../../../../styles/Common';
import JustBottomBorderSelect from '../../../../../../styles/Common/JustBottomBorderSelect';
import commonTranslator from '../../../../../../tranlates/Common';
import translator from '../../Translator';
import {grades, kindSchools} from '../KeyVals';
import {filter} from '../Utility';

function Filter(props) {
  const [kindSchool, setKindSchool] = useState();
  const [grade, setGrade] = useState();

  return (
    <PhoneView>
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
      <CommonButton
        onPress={() => filter(props, kindSchool, grade)}
        isHalf={true}
        title={commonTranslator.show}
        style={{alignSelf: 'flex-start'}}
      />
    </PhoneView>
  );
}

export default Filter;
