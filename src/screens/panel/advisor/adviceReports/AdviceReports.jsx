import React, {useMemo, useState} from 'react';
import {dispatchStateContext, globalStateContext} from '@/App.jsx';
import {
  CommonButton,
  CommonWebBox,
  PhoneView,
  SimpleText,
} from '@/styles/CommonComponents.jsx';
import {Translate} from '../translate';
import CommonDataTable from '@/styles/common/CommonDataTable.jsx';
import columns from './components/tableStructure';
import {useEffectOnce} from 'usehooks-ts';
import {generalRequest} from '@/api/utility';
import {routes} from '@/api/apiRoutes';
import JustBottomBorderSelect from '@/styles/common/JustBottomBorderSelect.jsx';
import commonTranslator from '@/translator/common';
import JustBottomBorderDatePicker from '@/styles/common/JustBottomBorderDatePicker.jsx';
import {useNavigate} from 'react-router';
import Pagination from '@/components/web/pagination/Pagination';

function AdviceReports() {
  const navigate = useNavigate();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [pageIndex, setPageIndex] = useState(1);
  const [totalCount, setTotalCount] = useState();
  const [perPage, setPerPage] = useState();
  const [state, dispatch] = useGlobalState();
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState();
  const [showOp, setShowOp] = useState(false);
  const [filter, setFilter] = useState({
    seenStatus: 'showJustUnSeen',
    sendFrom: 'student',
  });
  const [seenStatusValues, sendFromValues] = useMemo(() => {
    return [
      [
        {
          id: 'all',
          item: commonTranslator.all,
        },
        {
          id: 'showJustUnSeen',
          item: Translate.justUnSeen,
        },
      ],
      [
        {
          id: 'all',
          item: commonTranslator.all,
        },
        {
          id: 'student',
          item: 'دانش آموز',
        },
        {
          id: 'teacher',
          item: Translate.advisor,
        },
      ],
    ];
  }, []);
  const handleOp = async (_, row) => {
    setSelectedReport(row);
    if (!row.seen) {
      dispatch({
        loading: true,
      });
      await generalRequest(
        routes.setAdviceReportAsSeen + row.id,
        'put',
        undefined,
        undefined,
        state.token,
      );
      dispatch({
        loading: false,
      });
    }
    setShowOp(true);
  };
  const fetchData = React.useCallback(() => {
    const query = new URLSearchParams();
    query.append('pageIndex', pageIndex);
    if (filter.seenStatus === 'showJustUnSeen')
      query.append('showJustUnSeen', true);
    if (filter.sendFrom === 'student')
      query.append('justSendFromStudent', true);
    else if (filter.sendFrom === 'teacher')
      query.append('justSendFromTeacher', true);
    if (filter.from) query.append('from', filter.from);
    if (filter.to) query.append('to', filter.to);
    if (!totalCount) query.append('needTotalCount', true);

    dispatch({
      loading: true,
    });
    Promise.all([
      generalRequest(
        routes.getAdviceReports + '?' + query.toString(),
        'get',
        undefined,
        ['data', 'perPage', 'totalCount'],
        state.token,
      ),
    ]).then(res => {
      dispatch({
        loading: false,
      });

      if (res[0] == null) {
        navigate('/');
        return;
      }
      setReports(res[0].data);
      setPerPage(res[0].perPage);
      setTotalCount(res[0].totalCount);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, pageIndex]);
  useEffectOnce(() => {
    fetchData();
  }, []);
  return (
    <CommonWebBox header={Translate.reports}>
      <PhoneView
        style={{
          gap: '20px',
        }}>
        <JustBottomBorderSelect
          value={sendFromValues.find(elem => elem.id === filter.sendFrom)}
          placeholder={Translate.sendFrom}
          subText={Translate.sendFrom}
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
          placeholder={Translate.seenStatus}
          subText={Translate.seenStatus}
          setter={e =>
            setFilter(prevValues => ({
              ...prevValues,
              seenStatus: e,
            }))
          }
          values={seenStatusValues}
        />
        <JustBottomBorderDatePicker
          value={filter.from}
          setter={e =>
            setFilter(prevValues => ({
              ...prevValues,
              from: e,
            }))
          }
          placeholder={commonTranslator.from}
          subText={commonTranslator.from}
        />
        <JustBottomBorderDatePicker
          value={filter.to}
          setter={e =>
            setFilter(prevValues => ({
              ...prevValues,
              to: e,
            }))
          }
          placeholder={commonTranslator.to}
          subText={commonTranslator.to}
        />
      </PhoneView>
      <CommonButton
        onPress={() => fetchData()}
        title={commonTranslator.confirm}
      />
      {!showOp && (
        <>
          <CommonDataTable
            excel={false}
            pagination={false}
            handleOp={handleOp}
            data={reports}
            columns={columns}
          />
          <Pagination
            perPage={perPage}
            totalCount={totalCount}
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
          />
        </>
      )}
      {showOp && (
        <CommonWebBox
          backBtn={true}
          header={Translate.detail}
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
export default AdviceReports;
