import React, {useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router';
import {CommonButton, MyView, PhoneView} from '../../../../../styles/Common';
import JustBottomBorderTextInput from '../../../../../styles/Common/JustBottomBorderTextInput';
import commonTranslator from '../../../../../translator/Common';
import {filter} from '../Utility';

import {dispatchUsersContext} from '../Context';
import JustBottomBorderSelect from '../../../../../styles/Common/JustBottomBorderSelect';
import {levelsKeyVals} from '../../../ticket/components/KeyVals';

function Filter(props) {
  const useGlobalState = () => [React.useContext(dispatchUsersContext)];
  const [dispatch] = useGlobalState();

  const [NID, setNID] = useState();
  const [phone, setPhone] = useState();
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [grade, setGrade] = useState();
  const [branch, setBranch] = useState();
  const [wantedLevel, setWantedLevel] = useState('all');
  const [additionalLevel, setAdditionalLevel] = useState('all');
  const [settlementStatus, setSettlementStatus] = useState('all');

  const [additionalLevelValues, settlementStatusValues] = useMemo(() => {
    return [
      [
        {id: 'all', item: commonTranslator.all},
        {id: 'teach', item: 'تدریس'},
        {id: 'advice', item: 'مشاوره'},
      ],
      [
        {id: 'all', item: commonTranslator.all},
        {id: 'notSettled', item: 'دارای تراکنش تسویه نشده'},
        {id: 'settled', item: 'تسویه شده'},
      ],
    ];
  }, []);

  const level = useParams().level;

  React.useEffect(() => {
    if (!props.clearFilters) return;
    clearFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.clearFilters]);

  const filterLocal = React.useCallback(() => {
    props.setLoading(true);
    Promise.all([
      filter(
        props.token,
        level === 'all' && wantedLevel !== 'all' ? wantedLevel : level,
        props.pageIndex,
        NID,
        phone,
        name,
        lastName,
        branch !== undefined ? branch.id : undefined,
        grade !== undefined ? grade.id : undefined,
        wantedLevel === 'advisor' && additionalLevel !== 'all'
          ? additionalLevel
          : undefined,
        settlementStatus === 'all' ? undefined : settlementStatus,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] === null) return;
      dispatch({users: res[0].users});
      props.setTotalCount(res[0].totalCount);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    props.pageIndex,
    name,
    lastName,
    NID,
    phone,
    wantedLevel,
    additionalLevel,
    branch,
    grade,
    settlementStatus,
  ]);

  useEffect(() => {
    filterLocal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pageIndex]);

  const clearFilters = React.useCallback(() => {
    setNID('');
    setPhone('');
    setName('');
    setLastName('');
    setBranch();
    setGrade(), props.setClearFilters(false);
    setSettlementStatus('all');

    props.setLoading(true);
    Promise.all([filter(props.token, level, props.pageIndex)]).then(res => {
      props.setLoading(false);
      if (res[0] === null) return;
      dispatch({users: res[0].users});
      props.setTotalCount(res[0].totalCount);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pageIndex, level]);

  return (
    <MyView style={{gap: 20}}>
      <PhoneView style={{gap: 20}}>
        <JustBottomBorderTextInput
          value={NID}
          onChangeText={e => setNID(e)}
          justNum={true}
          placeholder={commonTranslator.NID}
          subText={commonTranslator.NID}
        />
        <JustBottomBorderTextInput
          value={phone}
          onChangeText={e => setPhone(e)}
          justNum={true}
          placeholder={commonTranslator.phone}
          subText={commonTranslator.phone}
        />
        <JustBottomBorderTextInput
          value={name}
          onChangeText={e => setName(e)}
          placeholder={commonTranslator.firstname}
          subText={commonTranslator.firstname}
        />
        <JustBottomBorderTextInput
          value={lastName}
          onChangeText={e => setLastName(e)}
          placeholder={commonTranslator.lastname}
          subText={commonTranslator.lastname}
        />
        <JustBottomBorderTextInput
          placeholder={commonTranslator.grade}
          subText={commonTranslator.grade}
          resultPane={true}
          setSelectedItem={e => setGrade(e)}
          values={props.grades}
          value={grade !== undefined ? grade.name : ''}
          reset={false}
        />
        <JustBottomBorderTextInput
          resultPane={true}
          placeholder={commonTranslator.branch}
          subText={commonTranslator.branch}
          setSelectedItem={e => setBranch(e)}
          reset={false}
          values={props.branches}
          value={branch != undefined ? branch.name : ''}
        />
        {props.currLevel === 'all' && (
          <JustBottomBorderSelect
            placeholder={commonTranslator.access}
            subText={commonTranslator.access}
            setter={setWantedLevel}
            values={levelsKeyVals}
            value={levelsKeyVals.find(elem => elem.id === wantedLevel)}
          />
        )}
        {(wantedLevel === 'advisor' || level === 'advisor') && (
          <>
            <JustBottomBorderSelect
              placeholder={'وضعیت تسویه'}
              subText={'وضعیت تسویه'}
              setter={setSettlementStatus}
              values={settlementStatusValues}
              value={settlementStatusValues.find(
                elem => elem.id === settlementStatus,
              )}
            />
            <JustBottomBorderSelect
              placeholder={'قابلیت'}
              subText={'قابلیت'}
              setter={setAdditionalLevel}
              values={additionalLevelValues}
              value={additionalLevelValues.find(
                elem => elem.id === additionalLevel,
              )}
            />
          </>
        )}
      </PhoneView>

      <CommonButton
        onPress={() =>
          props.pageIndex !== 1 ? props.setPageIndex(1) : filterLocal()
        }
        title={commonTranslator.search}
      />
    </MyView>
  );
}

export default Filter;
