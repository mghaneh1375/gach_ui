import React, {useEffect, useMemo, useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '../../../../styles/Common';
import translator from '../Translate';
import CommonDataTable from '../../../../styles/Common/CommonDataTable';
import columns from './components/TableStructure';
import {useEffectOnce} from 'usehooks-ts';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import JustBottomBorderSelect from '../../../../styles/Common/JustBottomBorderSelect';
import commonTranslator from '../../../../translator/Common';
import JustBottomBorderDatePicker from '../../../../styles/Common/JustBottomBorderDatePicker';

function TeachReports(props) {
  const navigate = props.navigate;
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [reports, setReports] = useState();
  const [selectedReport, setSelectedReport] = useState();
  const [teachers, setTeachers] = useState();
  const [showOp, setShowOp] = useState(false);
  const [filter, setFilter] = useState({
    seenStatus: 'showJustUnSeen',
    sendFrom: 'student',
    teacherId: 'all',
  });

  const [seenStatusValues, sendFromValues] = useMemo(() => {
    return [
      [
        {id: 'all', item: commonTranslator.all},
        {id: 'showJustUnSeen', item: translator.justUnSeen},
      ],
      [
        {id: 'all', item: commonTranslator.all},
        {id: 'student', item: 'دانش آموز'},
        {id: 'teacher', item: 'دبیر'},
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
          value={sendFromValues.find(elem => elem.id === filter.sendFrom)}
          placeholder={translator.sendFrom}
          subText={translator.sendFrom}
          setter={e =>
            setFilter(prevValues => ({
              ...prevValues,
              sendFrom: e,
            }))
          }
          values={sendFromValues}
        />
        <JustBottomBorderSelect
          value={seenStatusValues.find(elem => elem.id === filter.seenStatus)}
          placeholder={translator.seenStatus}
          subText={translator.seenStatus}
          setter={e =>
            setFilter(prevValues => ({
              ...prevValues,
              seenStatus: e,
            }))
          }
          values={seenStatusValues}
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
      {!showOp && reports && (
        <CommonDataTable
          excel={false}
          handleOp={handleOp}
          data={reports}
          columns={columns}
        />
      )}
      {showOp && (
        <CommonWebBox
          backBtn={true}
          header={translator.detail}
          onBackClick={() => setShowOp(false)}>
          {selectedReport.tags !== null && (
            <SimpleText text={selectedReport.tags.map(e => e + ' ')} />
          )}
          <SimpleText text={selectedReport.desc} />
        </CommonWebBox>
      )}
    </CommonWebBox>
  );
}

export default TeachReports;
