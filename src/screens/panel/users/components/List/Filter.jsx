import React, {useEffect, useMemo, useState} from 'react';
import {useLocation, useParams} from 'react-router';
import {CommonButton, MyView, PhoneView} from '@/styles';
import JustBottomBorderTextInput from '@/styles/common/JustBottomBorderTextInput.jsx';
import commonTranslator from '@/translator/common';
import {filter} from '../utility';
import {routes} from '@/api/apiRoutes';
import {downloadRequest} from '@/api/utility';
import JustBottomBorderDatePicker from '@/styles/common/JustBottomBorderDatePicker.jsx';
import JustBottomBorderSelect from '@/styles/common/JustBottomBorderSelect.jsx';
import {levelsKeyVals} from '../../../ticket/components/keyVals';
import {dispatchUsersContext} from '../Context.jsx';

const queryString = require('query-string');

function Filter(props) {
  const useGlobalState = () => [React.useContext(dispatchUsersContext)];
  const {search} = useLocation();

  const [dispatch] = useGlobalState();
  const [NID, setNID] = useState();
  const [phone, setPhone] = useState();
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [grade, setGrade] = useState();
  const [branch, setBranch] = useState();
  const [wantedLevel, setWantedLevel] = useState(
    props.currLevel && props.currLevel === 'advisor' ? props.currLevel : 'all',
  );
  const [additionalLevel, setAdditionalLevel] = useState(
    queryString.parse(search)?.additionalLevel,
  );
  const [settlementStatus, setSettlementStatus] = useState('all');
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  const [additionalLevelValues, settlementStatusValues] = useMemo(() => {
    return [
      [
        {
          id: 'all',
          item: commonTranslator.all,
        },
        {
          id: 'teach',
          item: 'تدریس',
        },
        {
          id: 'advice',
          item: 'مشاوره',
        },
      ],
      [
        {
          id: 'all',
          item: commonTranslator.all,
        },
        {
          id: 'notSettled',
          item: 'دارای تراکنش تسویه نشده',
        },
        {
          id: 'settled',
          item: 'تسویه شده',
        },
      ],
    ];
  }, []);
  const level = useParams().level;
  React.useEffect(() => {
    if (!props.clearFilters) return;
    clearFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.clearFilters]);

  useEffect(() => {
    filterLocal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pageIndex]);

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
        start,
        end,
      ),
    ]).then(res => {
      props.setLoading(false);
      if (res[0] === null) return;
      dispatch({
        users: res[0].users,
      });
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
    start,
    end,
  ]);

  const clearFilters = React.useCallback(() => {
    setNID('');
    setPhone('');
    setName('');
    setLastName('');
    setBranch();
    setGrade(), props.setClearFilters(false);
    setSettlementStatus('all');
    setStart(undefined);
    setEnd(undefined);
    props.setLoading(true);
    Promise.all([filter(props.token, level, props.pageIndex)]).then(res => {
      props.setLoading(false);
      if (res[0] === null) return;
      dispatch({
        users: res[0].users,
      });
      props.setTotalCount(res[0].totalCount);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pageIndex, level]);

  return (
    <MyView
      style={{
        gap: 20,
      }}>
      <PhoneView
        style={{
          gap: 20,
        }}>
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
        <JustBottomBorderDatePicker
          value={start}
          setter={setStart}
          placeholder={'تاریخ آغاز عضویت'}
          subText={'تاریخ آغاز عضویت'}
        />
        <JustBottomBorderDatePicker
          value={end}
          setter={setEnd}
          placeholder={'تاریخ پایان عضویت'}
          subText={'تاریخ پایان عضویت'}
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

      <PhoneView
        style={{
          justifyContent: 'end',
        }}>
        <CommonButton
          onPress={() =>
            props.pageIndex !== 1 ? props.setPageIndex(1) : filterLocal()
          }
          title={commonTranslator.search}
        />
        <CommonButton
          theme={'dark'}
          title={'دانلود فایل اکسل'}
          onPress={async () => {
            const params = new URLSearchParams();
            NID && params.append('NID', NID);
            phone && params.append('phone', phone);
            name && params.append('firstname', name);
            lastName && params.append('lastname', lastName);
            grade && params.append('gradeId', grade.id);
            branch && params.append('branchId', branch.id);
            level && params.append('level', level);
            additionalLevel &&
              params.append('additionalLevel', additionalLevel);
            start && params.append('from', start);
            end && params.append('to', end);
            props.setLoading(true);
            await downloadRequest(
              routes.getUsersReport + '?' + params.toString(),
              {},
              props.token,
              undefined,
              'users.xlsx',
            );
            props.setLoading(false);
          }}
        />
      </PhoneView>
    </MyView>
  );
}
export default Filter;
