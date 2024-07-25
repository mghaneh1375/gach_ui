import React, {useMemo, useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import {CommonButton, CommonWebBox, PhoneView} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import JustBottomBorderDatePicker from '../../../../styles/Common/JustBottomBorderDatePicker';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import commonTranslator from '../../../../translator/Common';
import Translator from '../../../advisorPanel/Teach/Schedule/components/Translator';
import translator from '../Translate';
import columns from './components/TableStructure';

function Schedules(props) {
  const navigate = props.navigate;
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [schedules, setSchedules] = useState();
  const [selectedSchedule, setSelectedSchedule] = useState();
  const [teachers, setTeachers] = useState();
  const [showOp, setShowOp] = useState(false);
  const [filter, setFilter] = useState({
    activeMode: 'active',
    teachMode: 'all',
    teacherId: 'all',
  });

  const [activeModeValues, teachModeValues] = useMemo(() => {
    return [
      [
        {id: 'all', item: commonTranslator.all},
        {id: 'active', item: Translator.active},
        {id: 'expired', item: Translator.expired},
      ],
      [
        {id: 'all', item: commonTranslator.all},
        {id: 'private', item: Translator.private},
        {id: 'semiPrivate', item: Translator.semiPrivate},
      ],
    ];
  }, []);

  const handleOp = async (idx, row) => {
    setSelectedReport(row);

    if (!row.seen) {
      dispatch({loading: true});
      await generalRequest(
        routes.setTeachReportAsSeen + row.id,
        'put',
        undefined,
        undefined,
        state.token,
      );
      dispatch({loading: false});
    }
    setShowOp(true);
  };

  const fetchData = React.useCallback(() => {
    const query = new URLSearchParams();

    if (filter.seenStatus === 'showJustUnSeen')
      query.append('showJustUnSeen', true);
    if (filter.teacherId && filter.teacherId !== 'all')
      query.append('teacherId', filter.teacherId);
    if (filter.sendFrom === 'student')
      query.append('justSendFromStudent', true);
    else if (filter.sendFrom === 'teacher')
      query.append('justSendFromTeacher', true);

    if (filter.from) query.append('from', filter.from);
    if (filter.to) query.append('to', filter.to);

    dispatch({loading: true});
    Promise.all(
      teachers === undefined
        ? [
            generalRequest(
              routes.getTeachReportsForAdmin + '?' + query.toString(),
              'get',
              undefined,
              'data',
              state.token,
            ),
            generalRequest(
              routes.getAllTeachersDigest,
              'get',
              undefined,
              'data',
              state.token,
            ),
          ]
        : [
            generalRequest(
              routes.getTeachReportsForAdmin + '?' + query.toString(),
              'get',
              undefined,
              'data',
              state.token,
            ),
          ],
    ).then(res => {
      dispatch({loading: false});

      if (res[0] == null || (teachers === undefined && res[1] == null)) {
        navigate('/');
        return;
      }

      setReports(res[0]);
      if (teachers === undefined) {
        setTeachers([
          {
            id: 'all',
            item: commonTranslator.all,
          },
          ...res[1].map(e => {
            return {
              id: e.id,
              item: e.name,
            };
          }),
        ]);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, teachers]);

  useEffectOnce(() => {
    fetchData();
  }, []);

  return (
    <CommonWebBox header={translator.reports}>
      <PhoneView style={{gap: '20px'}}>
        <JustBottomBorderSelect
          value={activeModeValues.find(elem => elem.id === filter.activeMode)}
          placeholder={Translator.activeMode}
          subText={Translator.activeMode}
          setter={e =>
            setFilter(prevValues => ({
              ...prevValues,
              activeMode: e,
            }))
          }
          values={activeModeValues}
        />
        <JustBottomBorderSelect
          value={teachModeValues.find(elem => elem.id === filter.teachMode)}
          placeholder={Translator.teachMode}
          subText={Translator.teachMode}
          setter={e =>
            setFilter(prevValues => ({
              ...prevValues,
              teachMode: e,
            }))
          }
          values={teachModeValues}
        />
        {teachers && (
          <JustBottomBorderSelect
            value={
              filter.teacherId
                ? teachers.find(elem => elem.id === filter.teacherId)
                : undefined
            }
            placeholder={translator.teacher}
            subText={translator.teacher}
            setter={e =>
              setFilter(prevValues => ({
                ...prevValues,
                teacherId: e,
              }))
            }
            values={teachers}
          />
        )}
        <JustBottomBorderDatePicker
          value={filter.from}
          setter={e =>
            setFilter(prevValues => ({
              ...prevValues,
              from: e,
            }))
          }
          placeholder={translator.from}
          subText={translator.from}
        />
        <JustBottomBorderDatePicker
          value={filter.to}
          setter={e =>
            setFilter(prevValues => ({
              ...prevValues,
              to: e,
            }))
          }
          placeholder={translator.to}
          subText={translator.to}
        />
      </PhoneView>
      <CommonButton
        onPress={() => fetchData()}
        title={commonTranslator.confirm}
      />
      {!showOp && schedules && (
        <CommonDataTable
          excel={false}
          handleOp={handleOp}
          data={schedules}
          columns={columns}
        />
      )}
      {showOp && (
        <CommonWebBox
          backBtn={true}
          header={translator.detail}
          onBackClick={() => setShowOp(false)}></CommonWebBox>
      )}
    </CommonWebBox>
  );
}

export default Schedules;
