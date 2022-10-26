import {
  faAngleDoubleDown,
  faAngleDoubleUp,
} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react';
import StateAndCity from '../../../../../../components/web/StateAndCity';
import {allTrueFalseValues} from '../../../../../../services/Utility';
import {
  CommonButton,
  PhoneView,
  MyView,
  SimpleText,
} from '../../../../../../styles/Common';
import {SimpleFontIcon} from '../../../../../../styles/Common/FontIcon';
import JustBottomBorderSelect from '../../../../../../styles/Common/JustBottomBorderSelect';
import JustBottomBorderTextInput from '../../../../../../styles/Common/JustBottomBorderTextInput';
import vars from '../../../../../../styles/root';
import commonTranslator from '../../../../../../translator/Common';
import translator from '../../Translator';
import {dispatchSchoolContext, schoolContext} from '../Context';
import {gradesForFilter, kindSchoolsForFilter} from '../KeyVals';
import {filter} from '../Utility';

function Filter(props) {
  const [kindSchool, setKindSchool] = useState();
  const [grade, setGrade] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [hasUser, setHasUser] = useState('all');

  const useGlobalState = () => [
    React.useContext(schoolContext),
    React.useContext(dispatchSchoolContext),
  ];

  const [globalState, dispatch] = useGlobalState();

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
    if (res !== null) dispatch({data: res, selectedSchoolForFilter: undefined});
  };

  const [showPro, setShowPro] = useState(false);
  const [wantedIcon, setWantedIcon] = useState(faAngleDoubleDown);

  React.useEffect(() => {
    if (showPro) setWantedIcon(faAngleDoubleUp);
    else setWantedIcon(faAngleDoubleDown);
  }, [showPro]);

  return (
    <MyView>
      <PhoneView style={{gap: 15}}>
        <JustBottomBorderTextInput
          style={{maxWidth: 'unset'}}
          placeholder={commonTranslator.school}
          subText={commonTranslator.school}
          resultPane={true}
          setSelectedItem={school => {
            dispatch({selectedSchoolForFilter: school, needFilter: true});
            setCity(undefined);
            setState(undefined);
            setGrade(undefined);
            setKindSchool(undefined);
          }}
          values={globalState.allSchools}
          value={
            globalState.selectedSchoolForFilter !== undefined
              ? globalState.selectedSchoolForFilter.name
              : ''
          }
          reset={false}
        />
      </PhoneView>
      <PhoneView>
        <SimpleText
          onPress={() => setShowPro(!showPro)}
          style={{
            paddingTop: 15,
            paddingrRight: 15,
            paddingBottom: 15,
            cursor: 'pointer',
            color: vars.DARK_BLUE,
          }}
          text={commonTranslator.advancedSearch}
        />
        <MyView
          style={{
            width: 20,
            height: 20,
            alignSelf: 'center',
          }}>
          <SimpleFontIcon
            onPress={() => setShowPro(!showPro)}
            style={{
              color: vars.DARK_BLUE,
            }}
            icon={wantedIcon}
          />
        </MyView>
      </PhoneView>

      {showPro && (
        <PhoneView style={{gap: 15}}>
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
            states={globalState.states}
            state={state}
            city={city}
            setter={setCity}
            stateSetter={setState}
            setLoading={props.setLoading}
          />
          <CommonButton
            onPress={() => doFilter()}
            title={commonTranslator.filter}
            style={{alignSelf: 'flex-start'}}
          />
        </PhoneView>
      )}
    </MyView>
  );
}

export default Filter;
