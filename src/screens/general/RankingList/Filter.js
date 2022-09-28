import React, {useState} from 'react';
import {MyView, PhoneView} from '../../../styles/Common';
import JustBottomBorderSelect from '../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderTextInput from '../../../styles/Common/JustBottomBorderTextInput';
import translator from '../../../translator/Common';
import {grades} from './KeyVals';

function Filter(props) {
  const [grade, setGrade] = useState();
  return (
    <MyView>
      <PhoneView style={{gap: 15}}>
        <JustBottomBorderSelect
          //   setter={setGrade}
          //   values={grades}
          //   value={grades.find(elem => elem.id === grade)}
          placeholder={'نام مدرسه'}
          subText={'نام مدرسه'}
        />
        <JustBottomBorderSelect
          setter={setGrade}
          values={grades}
          value={grades.find(elem => elem.id === grade)}
          placeholder={translator.grade}
          subText={translator.grade}
        />
        <JustBottomBorderTextInput
          placeholder={'رتبه در ایرسیک'}
          subText={'رتبه در ایرسیک'}
        />
      </PhoneView>
    </MyView>
  );
}

export default Filter;
