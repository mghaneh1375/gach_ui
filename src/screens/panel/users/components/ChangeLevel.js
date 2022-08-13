import {View} from 'react-native';
import React, {useState} from 'react';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import commonTranslator from '../../../../tranlates/Common';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {levelKeyVals} from '../../ticket/components/KeyVals';
import {addAccess} from './Utility';
import MultiBox from '../../../../components/web/MultiBox/MultiBox';
import {useParams} from 'react-router';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import Translator from '../Translator';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {showError} from '../../../../services/Utility';

function ChangeLevel(props) {
  const [newLevel, setNewLevel] = useState();
  const [accesses, setAccesses] = useState();
  const [showChooseSchool, setShowChooseSchool] = useState(false);
  const [schools, setSchools] = useState();
  const [school, setSchool] = useState();
  const [isWorking, setIsWorking] = useState(false);

  React.useEffect(() => {
    if (props.user !== undefined)
      setAccesses(
        props.user.accesses.map(elem => {
          return {
            id: elem,
            title: levelKeyVals.find(level => level.id === elem).item,
          };
        }),
      );
    else setAccesses([]);
  }, [props.user]);

  const setSelectedSchool = item => {
    setSchool(item);
  };

  const fetchSchools = React.useCallback(async () => {
    if (schools !== undefined) {
      setShowChooseSchool(true);
      return;
    }
    setIsWorking(true);
    props.setLoading(true);
    let res = await generalRequest(
      routes.fetchSchoolsDigest + '?justUnsets=true',
      'get',
      undefined,
      'data',
    );
    if (res !== null) {
      setSchools(res);
      setShowChooseSchool(true);
    }
    setIsWorking(false);
  }, [schools, props]);

  React.useEffect(() => {
    if (newLevel === undefined || isWorking) return;
    if (newLevel === 'school') fetchSchools();
  }, [newLevel, fetchSchools, isWorking]);

  const currLevel = useParams().level;

  const confirmSchool = async () => {
    if (school == undefined) {
      showError(Translator.pleaseSelectSchool);
      return;
    }
    let res = await addAccess(
      props.setLoading,
      props.token,
      props.user.id,
      newLevel,
      newAccesses => setAccesses(newAccesses),
      school.id,
    );
    if (res !== null) setShowChooseSchool(false);
  };

  const back = () => {
    if (accesses.find(elem => elem.id === currLevel) === undefined)
      props.removeFromList([props.user.id]);
    props.setMode('list');
  };

  return (
    <MyView>
      {!showChooseSchool && (
        <CommonWebBox
          header={commonTranslator.changeLevel}
          backBtn={true}
          onBackClick={() => back()}>
          <PhoneView style={{margin: 10}}>
            <MultiBox
              setLoading={props.setLoading}
              token={props.token}
              userId={props.user.id}
              afterFunc={newAccesses => setAccesses(newAccesses)}
              items={accesses}
            />
            <JustBottomBorderSelect
              isHalf={true}
              setter={setNewLevel}
              values={levelKeyVals}
              value={levelKeyVals.find(elem => elem.id === newLevel)}
              placeholder={commonTranslator.newLevel}
            />
          </PhoneView>
          <PhoneView style={{alignSelf: 'end'}}>
            <CommonButton
              onPress={() =>
                addAccess(
                  props.setLoading,
                  props.token,
                  props.user.id,
                  newLevel,
                  newAccesses => setAccesses(newAccesses),
                )
              }
              title={commonTranslator.confrim}
            />
          </PhoneView>
        </CommonWebBox>
      )}
      {showChooseSchool && (
        <LargePopUp
          btns={
            <CommonButton
              onPress={() => confirmSchool()}
              theme={'dark'}
              title={commonTranslator.confirm}
            />
          }
          title={Translator.chooseSchool}
          toggleShowPopUp={() => setShowChooseSchool(false)}>
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
        </LargePopUp>
      )}
    </MyView>
  );
}

export default ChangeLevel;
