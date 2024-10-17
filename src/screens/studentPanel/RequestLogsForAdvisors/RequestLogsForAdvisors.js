import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {CommonButton, CommonWebBox} from '../../../styles/Common';
import CommonDataTable from '../../../styles/Common/CommonDataTable';
import Translate from './Translate';
import commonTranslator from '../../../translator/Common';
import {showSuccess} from '../../../services/Utility';
import {LargePopUp} from '../../../styles/Common/PopUp';

function RequestLogsForAdvisors(props) {
  const navigate = props.navigate;
  const [selectedRowId, setSelectedRowId] = useState();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [data, setData] = useState();

  const fetchData = React.useCallback(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.myAdvisorAcceptanceRequests,
        'get',
        undefined,
        'data',
        state.token,
      ),
    ]).then(res => {
      dispatch({loading: false});

      if (res[0] === null) {
        navigate('/');
        return;
      }

      setData(res[0]);
    });
  }, [dispatch, state.token, navigate]);

  const cancelRequest = React.useCallback(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.cancelAdvisorRequest + selectedRowId,
        'delete',
        undefined,
        undefined,
        state.token,
      ),
    ]).then(res => {
      dispatch({loading: false});
      if (res[0] != null) {
        setData(data.filter(elem => elem.id !== selectedRowId));
        setSelectedRowId(undefined);
        showSuccess();
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRowId]);

  useEffectOnce(() => {
    fetchData();
  });

  const columns = [
    {
      name: 'عملیات',
      cell: row => {
        if (row.status === 'accept')
          return (
            <CommonButton
              onPress={() =>
                window.open('/historyOfMyAdvisor/' + row.id, '_target')
              }
              title={'مشاهده کاربرگها'}
            />
          );
        if (row.status !== 'pending') return <></>;

        return (
          <CommonButton
            title={'لغو درخواست'}
            onPress={() => setSelectedRowId(row.id)}
          />
        );
      },
      minWidth: '200px',
      maxWidth: '200px',
      center: true,
    },
    {
      name: Translate.advisor,
      selector: row => row.name,
      grow: 2,
    },
    {
      name: commonTranslator.status,
      selector: row =>
        row.status === 'pending'
          ? Translate.pending
          : row.status === 'reject'
          ? Translate.rejected
          : Translate.accepted,
      grow: 1,
    },
    {
      name: commonTranslator.createdAt,
      selector: row => row.createdAt,
      grow: 1,
    },
    {
      name: Translate.answerAt,
      selector: row => row.answerAt,
      grow: 1,
      center: true,
    },
  ];

  return (
    <CommonWebBox>
      {data !== undefined && (
        <CommonDataTable
          excel={false}
          pagination={false}
          columns={columns}
          data={data}
        />
      )}
      {selectedRowId && (
        <LargePopUp
          btns={
            <CommonButton
              theme={'dark'}
              title={'بله، درخواست مشاوره را حذف کن'}
              onPress={() => cancelRequest()}
            />
          }
          toggleShowPopUp={() => setSelectedRowId(undefined)}
          title={'آیا از حذف درخواست مشاوره خود اطمینان دارید؟'}></LargePopUp>
      )}
    </CommonWebBox>
  );
}

export default RequestLogsForAdvisors;
