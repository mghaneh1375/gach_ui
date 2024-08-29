import React, {useState} from 'react';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  MyView,
} from '../../../../styles/Common';
import commonTranslator from '../../../../translator/Common';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import {levelKeyVals} from '../../ticket/components/KeyVals';
import MultiBox from '../../../../components/web/MultiBox/MultiBox';
import {useParams} from 'react-router';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import {LargePopUp} from '../../../../styles/Common/PopUp';
import Translator from '../Translator';
import JustBottomBorderTextInput from '../../../../styles/Common/JustBottomBorderTextInput';
import {showError} from '../../../../services/Utility';
import {addAccess, removeAccess} from '../../users/components/Utility';

function ChangeLevel(props) {
  const [newLevel, setNewLevel] = useState();
  const [accesses, setAccesses] = useState();
  const [showChooseSchool, setShowChooseSchool] = useState(false);
  const [schools, setSchools] = useState();
  const [school, setSchool] = useState();
  const [isWorking, setIsWorking] = useState(false);
  console.log(props.selectedUser);

  React.useEffect(() => {
    if (props.selectedUser !== undefined)
      setAccesses(
        props.selectedUser.accesses.map(elem => {
          return {
            id: elem,
            title: levelKeyVals.find(level => level.id === elem).item,
          };
        }),
      );
    else setAccesses([]);
  }, [props.selectedUser]);

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
    props.setLoading(false);
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
      props.selectedUser.id,
      newLevel,
      newAccesses => setAccesses(newAccesses),
      school.id,
    );
    if (res !== null) {
      setSchool(undefined);
      setNewLevel(undefined);
      setShowChooseSchool(false);
    }
  };

  return (
    <MyView>
      {!showChooseSchool && (
        <CommonWebBox
          header={commonTranslator.changeLevel}
          backBtn={true}
          onBackClick={() => props.setMode('list')}>
          <PhoneView style={{margin: 10}}>
            <MultiBox
              items={accesses}
              onRemoveClick={id =>
                removeAccess({
                  setLoading: props.setLoading,
                  token: props.token,
                  userId: props.selectedUser.id,
                  afterFunc: newAccesses => setAccesses(newAccesses),
                  access: id,
                })
              }
            />
            <JustBottomBorderSelect
              setter={setNewLevel}
              values={levelKeyVals}
              value={levelKeyVals.find(elem => elem.id === newLevel)}
              placeholder={commonTranslator.newLevel}
            />
          </PhoneView>
          <PhoneView style={{alignSelf: 'end'}}>
            <CommonButton
              onPress={async () => {
                let res = await addAccess(
                  props.setLoading,
                  props.token,
                  props.selectedUser.id,
                  newLevel,
                  newAccesses => setAccesses(newAccesses),
                );
                if (res !== null) {
                  setNewLevel(undefined);
                }
              }}
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
