import React, {useState} from 'react';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import commonTranslator from '../../../../tranlates/Common';
import {
  CommonButton,
  EqualTwoTextInputs,
  MyView,
  PhoneView,
} from '../../../../styles/Common';
import {View} from 'react-native';
import vars from '../../../../styles/root';
import {updateInfo} from './Utility';
import {sexKeyVals} from '../../../../services/Utility';

const UpdateInfo = props => {
  const [state, setState] = useState(props.user.state);
  const [city, setCity] = useState(props.user.city);
  const [sex, setSex] = useState(props.user.sex);
  const [grade, setGrade] = useState(props.user.grade);
  const [branch, setBranch] = useState(props.user.branches);
  const [school, setSchool] = useState(props.user.school);

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
          isHalf={true}
          value={firstname}
          subText={commonTranslator.firstname}
          placeholder={commonTranslator.firstname}
          onChangeText={e => setFirstname(e)}
        />
        <JustBottomBorderTextInput
          isHalf={true}
          value={lastname}
          subText={commonTranslator.lastname}
          placeholder={commonTranslator.lastname}
          onChangeText={e => setLastname(e)}
        />
        <JustBottomBorderTextInput
          isHalf={true}
          justNum={true}
          value={NID}
          onChangeText={e => setNID(e)}
          subText={commonTranslator.NID}
          placeholder={commonTranslator.NID}
        />
        <JustBottomBorderSelect
          isHalf={true}
          value={sexKeyVals.find(elem => elem.id === sex)}
          placeholder={commonTranslator.sex}
          subText={commonTranslator.sex}
          setter={setSex}
          values={sexKeyVals}
        />
        <JustBottomBorderTextInput
          style={{marginTop: 10}}
          isHalf={true}
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
          isHalf={true}
          resultPane={true}
          placeholder={commonTranslator.city}
          subText={commonTranslator.city}
          setSelectedItem={setSelectedCity}
          reset={resetCity}
          value={city !== undefined ? city.name : ''}
          values={state !== undefined ? state.cities : []}
        />
        <JustBottomBorderTextInput
          style={{marginTop: 10}}
          isHalf={true}
          placeholder={commonTranslator.grade}
          subText={commonTranslator.grade}
          resultPane={true}
          setSelectedItem={setSelectedGrade}
          values={props.grades}
          value={grade !== undefined ? grade.name : ''}
          reset={false}
        />

        <JustBottomBorderTextInput
          style={{marginTop: 10}}
          isHalf={true}
          resultPane={true}
          placeholder={commonTranslator.branch}
          subText={commonTranslator.branch}
          setSelectedItem={setSelectedBranch}
          reset={false}
          values={props.branches}
          value={branch}
          multi={true}
        />
        <JustBottomBorderTextInput
          isHalf={true}
          style={{maxWidth: 'unset'}}
          placeholder={commonTranslator.school}
          subText={commonTranslator.school}
          resultPane={true}
          setSelectedItem={setSelectedSchool}
          values={props.schools}
          value={school !== undefined ? school.name : ''}
          reset={false}
        />
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
            schoolId: school.id,
            branches:
              branch !== undefined
                ? branch.map(function (element) {
                    return element.id;
                  })
                : [],
            gradeId: grade.id,
            cityId: city.id,
            NID: NID,
            sex: sex,
          })
        }
      />
    </MyView>
  );
};
export default UpdateInfo;
