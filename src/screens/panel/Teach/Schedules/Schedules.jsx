import React, {useMemo, useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import JustBottomBorderDatePicker from '../../../../styles/Common/JustBottomBorderDatePicker';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import commonTranslator from '../../../../translator/Common';
import Translator from '../../../advisorPanel/Teach/Schedule/components/Translator';
import translator from '../Translate';
import columns, {studentsColumns} from './components/TableStructure';
import reportColumns from '../TeachReport/components/TableStructure';
import {LargePopUp} from '../../../../styles/Common/PopUp';

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
  const [mode, setMode] = useState();
  const [students, setStudents] = useState();
  const [reports, setReports] = useState();
  const [selectedReport, setSelectedReport] = useState();
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
    setSelectedSchedule(row);

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

    setMode('op');
    setShowOp(true);
  };

  const handleReportOp = (idx, row) => {
    setSelectedReport(row);
    setMode('reportDetail');
  };

  const fetchData = React.useCallback(() => {
    const query = new URLSearchParams();

    if (filter.activeMode !== 'all')
      query.append('activeMode', filter.activeMode);
    if (filter.teachMode !== 'all') query.append('teachMode', filter.teachMode);
    if (filter.teacherId && filter.teacherId !== 'all')
      query.append('teacherId', filter.teacherId);

    if (filter.from) query.append('from', filter.from);
    if (filter.to) query.append('to', filter.to);

    dispatch({loading: true});
    Promise.all(
      teachers === undefined
        ? [
            generalRequest(
              routes.getTeachSchedulesForAdmin + '?' + query.toString(),
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
              routes.getTeachSchedulesForAdmin + '?' + query.toString(),
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

      setSchedules(res[0]);
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
      {showOp && mode === 'op' && (
        <LargePopUp
          title={translator.detail}
          toggleShowPopUp={() => {
            setShowOp(false);
            setMode(undefined);
          }}>
          <PhoneView style={{gap: '20px'}}>
            <CommonButton
              theme={'transparent'}
              onPress={async () => {
                dispatch({loading: true});
                const res = await generalRequest(
                  routes.getScheduleStudents + selectedSchedule.id,
                  'get',
                  undefined,
                  'data',
                  state.token,
                );
                dispatch({loading: false});
                if (res !== null) {
                  setStudents(res);
                  setMode('students');
                }
              }}
              title={translator.students}
            />
            <CommonButton
              theme={'transparent'}
              onPress={async () => {
                dispatch({loading: true});
                const res = await generalRequest(
                  routes.getTeachReportsForAdmin +
                    '?teachId=' +
                    selectedSchedule.id,
                  'get',
                  undefined,
                  'data',
                  state.token,
                );
                dispatch({loading: false});
                if (res !== null) {
                  setReports(res);
                  setMode('report');
                }
              }}
              title={translator.reportedProblems}
            />
          </PhoneView>
        </LargePopUp>
      )}
      {showOp && mode === 'students' && (
        <CommonWebBox
          header={translator.students}
          backBtn={true}
          onBackClick={() => {
            setMode(undefined);
            setStudents(undefined);
            setShowOp(false);
          }}>
          <CommonDataTable
            pagination={false}
            excel={false}
            data={students}
            columns={studentsColumns}
          />
        </CommonWebBox>
      )}
      {showOp && mode === 'report' && (
        <CommonWebBox
          header={translator.reportedProblems}
          backBtn={true}
          onBackClick={() => {
            setMode(undefined);
            setReports(undefined);
            setShowOp(false);
          }}>
          <CommonDataTable
            pagination={false}
            excel={false}
            data={reports}
            columns={reportColumns}
            handleOp={handleReportOp}
          />
        </CommonWebBox>
      )}
      {showOp && mode === 'reportDetail' && (
        <CommonWebBox
          header={translator.reportedProblems}
          backBtn={true}
          onBackClick={() => {
            setMode('report');
            setSelectedReport(undefined);
          }}>
          {selectedReport.tags !== null && (
            <SimpleText text={selectedReport.tags.map(e => e + ' ')} />
          )}
          <SimpleText text={selectedReport.desc} />
        </CommonWebBox>
      )}
    </CommonWebBox>
  );
}

export default Schedules;
