import React, {useState} from 'react';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import commonTranslator from '../../../../translator/Common';
import {CommonButton, MyView, PhoneView} from '../../../../styles/Common';
import vars from '../../../../styles/root';
import {updateInfo} from './Utility';
import {sexKeyVals} from '../../../../services/Utility';
import {CommonDatePicker} from '../../../../styles/Common/CommonDatePicker';

const UpdateInfo = props => {
  const [state, setState] = useState(props.user.state);
  const [city, setCity] = useState(props.user.city);
  const [sex, setSex] = useState(props.user.sex);
  const [grade, setGrade] = useState(props.user.grade);
  const [branch, setBranch] = useState(props.user.branches);
  const [school, setSchool] = useState(props.user.school);
  const [birthDay, setBirthDay] = useState(props.user.birthDay);
  const [resetCity, setResetCity] = useState(false);

  const [firstname, setFirstname] = useState(props.user.firstName);
  const [lastname, setLastname] = useState(props.user.lastName);
  const [NID, setNID] = useState(props.user.NID);

  const setSelectedState = item => {
    setState(item);
    if (city !== undefined) {
      setCity(undefined);
      setResetCity(true);
    }
  };

  const setSelectedCity = item => {
    setCity(item);
    setResetCity(false);
  };

  const setSelectedGrade = item => {
    setGrade(item);
  };

  const setSelectedBranch = item => {
    setBranch(item);
  };

  const setSelectedSchool = item => {
    setSchool(item);
  };

  return (
    <MyView>
      <PhoneView style={{gap: 15}}>
        <JustBottomBorderTextInput
          isHalf={props.isInPhone ? undefined : true}
          value={firstname}
          subText={commonTranslator.firstname}
          placeholder={commonTranslator.firstname}
          onChangeText={e => setFirstname(e)}
        />
        <JustBottomBorderTextInput
          isHalf={props.isInPhone ? undefined : true}
          value={lastname}
          subText={commonTranslator.lastname}
          placeholder={commonTranslator.lastname}
          onChangeText={e => setLastname(e)}
        />
        <JustBottomBorderTextInput
          isHalf={props.isInPhone ? undefined : true}
          justNum={true}
          value={NID}
          onChangeText={e => setNID(e)}
          subText={commonTranslator.NID}
          placeholder={commonTranslator.NID}
        />
        <JustBottomBorderSelect
          isHalf={props.isInPhone ? undefined : true}
          value={sexKeyVals.find(elem => elem.id === sex)}
          placeholder={commonTranslator.sex}
          subText={commonTranslator.sex}
          setter={setSex}
          values={sexKeyVals}
        />
        <JustBottomBorderTextInput
          style={{marginTop: 10}}
          isHalf={props.isInPhone ? undefined : true}
          placeholder={commonTranslator.state}
          subText={commonTranslator.state}
          resultPane={true}
          setSelectedItem={setSelectedState}
          values={props.states}
          value={state !== undefined ? state.name : ''}
          reset={false}
        />

        <JustBottomBorderTextInput
          style={{marginTop: 10}}
          isHalf={props.isInPhone ? undefined : true}
          resultPane={true}
          placeholder={commonTranslator.city}
          subText={commonTranslator.city}
          setSelectedItem={setSelectedCity}
          reset={resetCity}
          value={city !== undefined ? city.name : ''}
          values={state !== undefined ? state.cities : []}
        />
        {props.accesses !== undefined &&
          props.accesses.indexOf('student') !== -1 && (
            <JustBottomBorderTextInput
              isHalf={props.isInPhone ? undefined : true}
              style={{maxWidth: 'unset'}}
              placeholder={commonTranslator.school}
              subText={commonTranslator.school}
              resultPane={true}
              setSelectedItem={setSelectedSchool}
              values={props.schools}
              value={school !== undefined ? school.name : ''}
              reset={false}
            />
          )}

        {props.accesses !== undefined &&
          props.accesses.indexOf('student') !== -1 && (
            <JustBottomBorderTextInput
              isHalf={props.isInPhone ? undefined : true}
              placeholder={commonTranslator.grade}
              subText={
                'نام مقطع خود را به شکل فارسی سرچ کنید مثلا: یازدهم تجربی'
              }
              resultPane={true}
              setSelectedItem={setSelectedGrade}
              values={props.grades}
              value={grade !== undefined ? grade.name : ''}
              reset={false}
            />
          )}

        {props.accesses !== undefined &&
          props.accesses.indexOf('student') !== -1 && (
            <JustBottomBorderTextInput
              style={{marginTop: 10}}
              isHalf={props.isInPhone ? undefined : true}
              resultPane={true}
              placeholder={commonTranslator.branch}
              subText={
                'نام رشته المپیادی خود را به شکل فارسی سرچ کنید مثلا: شیمی'
              }
              setSelectedItem={setSelectedBranch}
              reset={false}
              values={props.branches}
              value={branch}
              multi={true}
            />
          )}

        {birthDay !== undefined && (
          <CommonDatePicker
            parentStyle={{marginTop: 10}}
            isHalf={true}
            justDate={true}
            placeholder={commonTranslator.birthDay}
            value={birthDay}
            setter={setBirthDay}
            subText={
              commonTranslator.birthDay + ' - ' + commonTranslator.optional
            }
          />
        )}
      </PhoneView>
      <CommonButton
        style={{
          backgroundColor: vars.DARK_BLUE,
        }}
        title={commonTranslator.doChange}
        onPress={() =>
          updateInfo(props.setLoading, props.token, props.userId, {
            firstName: firstname,
            lastName: lastname,
            schoolId: school === undefined ? undefined : school.id,
            branches:
              branch !== undefined
                ? branch.map(function (element) {
                    return element.id;
                  })
                : [],
            gradeId: grade === undefined ? undefined : grade.id,
            cityId: city.id,
            NID: NID,
            sex: sex,
            birthDay: birthDay,
          })
        }
      />
    </MyView>
  );
};
export default UpdateInfo;
