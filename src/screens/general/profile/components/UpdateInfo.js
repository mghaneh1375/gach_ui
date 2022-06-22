import React, {useState} from 'react';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import translator from '../translate';
import commonTranslator from '../../../../tranlates/Common';
import {
  BigBoldBlueText,
  CommonButton,
  EqualTwoTextInputs,
} from '../../../../styles/Common';
import {View} from 'react-native';
import {generalRequest, showError} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import vars from '../../../../styles/root';
import {setCacheItem} from '../../../../API/User';
import {shouldUseActivityState} from 'react-native-screens';

const UpdateInfo = props => {
  const [states, setStates] = useState([]);
  const [grades, setGrades] = useState([]);
  const [branches, setBranches] = useState([]);
  const [schools, setSchools] = useState([]);

  const [state, setState] = useState(props.user.state);
  const [city, setCity] = useState(props.user.city);
  const [sex, setSex] = useState(props.user.sex);
  const [grade, setGrade] = useState(props.user.grade);
  const [branch, setBranch] = useState(undefined);
  const [school, setSchool] = useState(props.user.school);

  const [resetCity, setResetCity] = useState(false);

  const [firstname, setFirstname] = useState(props.user.firstName);
  const [lastname, setLastname] = useState(props.user.lastName);
  const [NID, setNID] = useState(props.user.NID);

  const [fetchedStates, setFetchedStates] = useState(false);
  const sexKeyVals = [
    {name: 'آقا', id: 'male'},
    {name: 'خانم', id: 'female'},
  ];

  React.useEffect(() => {
    if (fetchedStates) return;

    setFetchedStates(true);
    props.setLoading(true);

    Promise.all([
      generalRequest(routes.fetchState, 'get', undefined, 'data'),
      generalRequest(routes.fetchGrades, 'get', undefined, 'data'),
      generalRequest(routes.fetchBranches, 'get', undefined, 'data'),
      generalRequest(routes.fetchSchoolsDigest, 'get', undefined, 'data'),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] !== null) setStates(res[0]);
      if (res[1] !== null) setGrades(res[1]);
      if (res[2] !== null) setBranches(res[2]);
      if (res[3] !== null) setSchools(res[3]);
    });
  }, [fetchedStates, props]);

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

  const setSelectedSex = (item_key, item_idx) => {
    setSex(sexKeyVals[item_idx].id);
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

  const update = () => {
    if (
      state === undefined ||
      city === undefined ||
      grade === undefined ||
      school === undefined ||
      firstname.length === 0 ||
      lastname.length === 0 ||
      NID.length === 0
    ) {
      showError(commonTranslator.pleaseFillAllFields);
      return;
    }

    const data = {
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
    };

    props.setLoading(true);
    console.log(data);
    Promise.all([
      generalRequest(
        routes.updateInfo,
        'post',
        data,
        undefined,
        true,
        props.token,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0]) setCacheItem('user', undefined);
    });
  };

  return (
    <View>
      <BigBoldBlueText text={translator.yourInfo} />
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
        <EqualTwoTextInputs style={{marginTop: 20}}>
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
            value={sex !== undefined ? (sex === 'male' ? 'آقا' : 'خانم') : ''}
            placeholder={commonTranslator.sex}
            onSelect={setSelectedSex}
            values={sexKeyVals}
          />
        </EqualTwoTextInputs>
        <EqualTwoTextInputs style={{marginTop: 20}}>
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
        </EqualTwoTextInputs>

        <EqualTwoTextInputs style={{marginTop: 30}}>
          <JustBottomBorderTextInput
            isHalf={true}
            placeholder={commonTranslator.grade}
            resultPane={true}
            setSelectedItem={setSelectedGrade}
            values={grades}
            value={grade !== undefined ? grade.name : ''}
            reset={false}
          />

          <JustBottomBorderTextInput
            isHalf={true}
            resultPane={true}
            placeholder={commonTranslator.branch}
            setSelectedItem={setSelectedBranch}
            reset={false}
            values={branches}
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
            values={schools}
            value={school !== undefined ? school.name : ''}
            reset={false}
          />
        </View>
      </View>
      <CommonButton
        style={{backgroundColor: vars.DARK_BLUE, marginTop: 50, minWidth: 120}}
        title={commonTranslator.doChange}
        onPress={() => update()}
      />
    </View>
  );
};
export default UpdateInfo;
