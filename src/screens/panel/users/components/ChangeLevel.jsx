import React, {useState} from 'react';
import {CommonButton, CommonWebBox, PhoneView, MyView} from '@/styles';
import commonTranslator from '@/translator/common';
import JustBottomBorderSelect from '../../../../styles/common/JustBottomBorderSelect';
import {levelKeyVals} from '../../ticket/components/keyVals';
import {addAccess, removeAccess} from './utility';
import MultiBox from '../../../../components/web/multiBox/MultiBox';
import {useParams} from 'react-router';
import {generalRequest} from '@/api/utility';
import {routes} from '@/api/apiRoutes';
import {LargePopUp} from '../../../../styles/common/PopUp';
import Translator from '../translator';
import JustBottomBorderTextInput from '../../../../styles/common/JustBottomBorderTextInput';
import {showError} from '@/services/utility';
import {usersContext, dispatchUsersContext} from './Context';
function ChangeLevel(props) {
  const useGlobalState = () => [
    React.useContext(usersContext),
    React.useContext(dispatchUsersContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [newLevel, setNewLevel] = useState();
  const [accesses, setAccesses] = useState();
  const [showChooseSchool, setShowChooseSchool] = useState(false);
  const [schools, setSchools] = useState();
  const [school, setSchool] = useState();
  const [isWorking, setIsWorking] = useState(false);
  React.useEffect(() => {
    if (state.selectedUser !== undefined)
      setAccesses(
        state.selectedUser.accesses.map(elem => {
          return {
            id: elem,
            title: levelKeyVals.find(level => level.id === elem).item,
          };
        }),
      );
    else setAccesses([]);
  }, [state.selectedUser]);
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
    const res = await generalRequest(
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
    const res = await addAccess(
      props.setLoading,
      props.token,
      state.selectedUser.id,
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
  const back = () => {
    if (accesses.find(elem => elem.id === currLevel) === undefined) {
      dispatch({
        users: undefined,
      });
    }
    props.setMode('list');
  };
  return (
    <MyView>
      {!showChooseSchool && (
        <CommonWebBox
          header={commonTranslator.changeLevel}
          backBtn={true}
          onBackClick={() => back()}>
          <PhoneView
            style={{
              margin: 10,
            }}>
            <MultiBox
              items={accesses}
              onRemoveClick={id =>
                removeAccess({
                  setLoading: props.setLoading,
                  token: props.token,
                  userId: state.selectedUser.id,
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
          <PhoneView
            style={{
              alignSelf: 'end',
            }}>
            <CommonButton
              onPress={async () => {
                if (!newLevel) {
                  showError('لطفا دسترسی مدنظر خود را انتخاب کنید');
                  return;
                }
                const res = await addAccess(
                  props.setLoading,
                  props.token,
                  state.selectedUser.id,
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
            style={{
              maxWidth: 'unset',
            }}
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
