import React, {useState} from 'react';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import commonTranslator from '../../../../tranlates/Common';
import {CommonButton, EqualTwoTextInputs} from '../../../../styles/Common';
import {View} from 'react-native';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import vars from '../../../../styles/root';
import {fetchUser, setCacheItem} from '../../../../API/User';
import {showError, showSuccess} from '../../../../services/Utility';
import {updateInfo} from './Utility';

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

  const sexKeyVals = [
    {item: 'آقا', id: 'male'},
    {item: 'خانم', id: 'female'},
  ];

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
    <View>
      <View style={{paddingLeft: 70}}>
        <EqualTwoTextInputs>
          <JustBottomBorderTextInput
            isHalf={true}
            value={firstname}
            subText={commonTranslator.necessaryField}
            placeholder={commonTranslator.firstname}
            onChangeText={e => setFirstname(e)}
          />
          <JustBottomBorderTextInput
            isHalf={true}
            value={lastname}
            subText={commonTranslator.necessaryField}
            placeholder={commonTranslator.lastname}
            onChangeText={e => setLastname(e)}
          />
        </EqualTwoTextInputs>
        <EqualTwoTextInputs>
          <JustBottomBorderTextInput
            isHalf={true}
            justNum={true}
            value={NID}
            onChangeText={e => setNID(e)}
            subText={commonTranslator.necessaryField}
            placeholder={commonTranslator.NID}
          />
          <JustBottomBorderSelect
            isHalf={true}
            value={sexKeyVals.find(elem => elem.id === sex)}
            placeholder={commonTranslator.sex}
            setter={setSex}
            values={sexKeyVals}
          />
        </EqualTwoTextInputs>
        <EqualTwoTextInputs>
          <JustBottomBorderTextInput
            isHalf={true}
            placeholder={commonTranslator.state}
            resultPane={true}
            setSelectedItem={setSelectedState}
            values={props.states}
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
        </EqualTwoTextInputs>

        <EqualTwoTextInputs style={{marginTop: 30}}>
          <JustBottomBorderTextInput
            isHalf={true}
            placeholder={commonTranslator.grade}
            resultPane={true}
            setSelectedItem={setSelectedGrade}
            values={props.grades}
            value={grade !== undefined ? grade.name : ''}
            reset={false}
          />

          <JustBottomBorderTextInput
            isHalf={true}
            resultPane={true}
            placeholder={commonTranslator.branch}
            setSelectedItem={setSelectedBranch}
            reset={false}
            values={props.branches}
            value={branch}
            multi={true}
          />
        </EqualTwoTextInputs>

        <View style={{marginTop: 30, marginRight: 10}}>
          <JustBottomBorderTextInput
            isHalf={false}
            style={{maxWidth: 'unset'}}
            placeholder={commonTranslator.school}
            resultPane={true}
            setSelectedItem={setSelectedSchool}
            values={props.schools}
            value={school !== undefined ? school.name : ''}
            reset={false}
          />
        </View>
      </View>
      <CommonButton
        style={{backgroundColor: vars.DARK_BLUE, marginTop: 50, minWidth: 120}}
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
    </View>
  );
};
export default UpdateInfo;
