import React, {useState} from 'react';
import {JustBottomBorderTextInput} from '../../../../styles/Common/JustBottomBorderTextInput';
import translator from '../translate';
import commonTranslator from '../../../../tranlates/Common';
import {
  BigBoldBlueText,
  CommonButton,
  EqualTwoTextInputs,
} from '../../../../styles/Common';
import {View} from 'react-native';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import vars from '../../../../styles/root';

const UpdateInfo = props => {
  const [states, setStates] = useState([]);
  const [grades, setGrades] = useState([]);
  const [branches, setBranches] = useState([]);

  const [state, setState] = useState(undefined);
  const [city, setCity] = useState(undefined);
  const [sex, setSex] = useState(undefined);
  const [grade, setGrade] = useState(undefined);
  const [branch, setBranch] = useState(undefined);

  const [resetCity, setResetCity] = useState(false);

  console.log(props.user);
  const [firstname, setFirstname] = useState(props.user.firstName);
  const [lastname, setLastname] = useState(props.user.lastName);
  const [NID, setNID] = useState(props.user.NID);

  const [fetchedStates, setFetchedStates] = useState(false);
  const sexKeyVals = [
    {name: 'مرد', id: 'male'},
    {name: 'مذکر', id: 'male'},
    {name: 'پسر', id: 'male'},
    {name: 'آقا', id: 'male'},
    {name: 'اقا', id: 'male'},
    {name: 'زن', id: 'female'},
    {name: 'مونت', id: 'female'},
    {name: 'دختر', id: 'female'},
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
    ]).then(res => {
      props.setLoading(false);
      if (res[0] !== null) setStates(res[0]);
      if (res[1] !== null) setGrades(res[1]);
      if (res[2] !== null) setBranches(res[2]);
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

  const setSelectedSex = item => {
    setSex(item);
  };

  const setSelectedGrade = item => {
    setGrade(item);
  };

  const setSelectedBranch = item => {
    setBranch(item);
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
          />
          <JustBottomBorderTextInput
            isHalf={true}
            value={lastname}
            subText={commonTranslator.necessaryField}
            placeholder={commonTranslator.lastname}
          />
        </EqualTwoTextInputs>
        <EqualTwoTextInputs style={{marginTop: 20}}>
          <JustBottomBorderTextInput
            isHalf={true}
            justNum={true}
            value={NID}
            subText={commonTranslator.necessaryField}
            placeholder={commonTranslator.NID}
          />
          <JustBottomBorderTextInput
            isHalf={true}
            subText={commonTranslator.necessaryField}
            placeholder={commonTranslator.sex}
            resultPane={true}
            setSelectedItem={setSelectedSex}
            values={sexKeyVals}
            reset={false}
          />
        </EqualTwoTextInputs>
        <EqualTwoTextInputs style={{marginTop: 20}}>
          <JustBottomBorderTextInput
            isHalf={true}
            placeholder={commonTranslator.state}
            resultPane={true}
            setSelectedItem={setSelectedState}
            values={states}
            reset={false}
          />

          <JustBottomBorderTextInput
            isHalf={true}
            resultPane={true}
            placeholder={commonTranslator.city}
            setSelectedItem={setSelectedCity}
            reset={resetCity}
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
      </View>
      <CommonButton
        style={{backgroundColor: vars.DARK_BLUE, marginTop: 50, minWidth: 120}}
        title={commonTranslator.doChange}
      />
    </View>
  );
};
export default UpdateInfo;
