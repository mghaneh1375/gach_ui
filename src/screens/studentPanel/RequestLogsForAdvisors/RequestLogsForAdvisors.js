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

function RequestLogsForAdvisors(props) {
  const navigate = props.navigate;

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

  useEffectOnce(() => {
    fetchData();
  });

  const columns = [
    {
      name: 'عملیات',
      cell: (row, index, column, id) => {
        if (row.status !== 'pending') return <></>;

        return (
          <CommonButton
            title={'لغو درخواست'}
            onPress={async () => {
              dispatch({loading: true});
              let res = await generalRequest(
                routes.cancelAdvisorRequest + row.id,
                'delete',
                undefined,
                undefined,
                state.token,
              );
              dispatch({loading: false});

              if (res != null) {
                let tmp = data.filter(elem => elem.id !== row.id);
                setData(tmp);
                showSuccess();
              }
            }}
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
    </CommonWebBox>
  );
}

export default RequestLogsForAdvisors;
