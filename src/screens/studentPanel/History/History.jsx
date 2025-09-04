import {CommonWebBox, MyView} from '../../../styles/CommonComponents.jsx';
import React, {useState} from 'react';
import {globalStateContext, dispatchStateContext} from '@/App';
import {useEffectOnce} from 'usehooks-ts';
import {generalRequest} from '../../../api/utility';
import {routes} from '@/api/apiRoutes';
import CommonDataTable from '../../../styles/common/CommonDataTable';
import columns from './tableStructure';
import Recp from '../../../components/web/Recp';
function History(props) {
  const navigate = props.navigate;
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [records, setRecords] = useState();
  useEffectOnce(() => {
    dispatch({
      loading: true,
    });
    Promise.all([
      generalRequest(routes.getMyRecps, 'get', undefined, 'data', state.token),
    ]).then(res => {
      dispatch({
        loading: false,
      });
      if (res[0] === null) {
        navigate('/');
        return;
      }
      setRecords(res[0]);
    });
  });
  const [showRecp, setShowRecp] = useState(false);
  const [recp, setRecp] = useState();
  const handleOp = idx => {
    setRecp(records[idx]);
  };
  React.useEffect(() => {
    if (recp !== undefined) setShowRecp(true);
  }, [recp]);
  React.useEffect(() => {
    if (!showRecp) setRecp(undefined);
  }, [showRecp]);
  return (
    <MyView>
      {showRecp && recp !== undefined && (
        <Recp
          setLoading={status =>
            dispatch({
              loading: status,
            })
          }
          onBackClick={() => setShowRecp(false)}
          user={state.user.user}
          recp={recp}
        />
      )}
      {!showRecp && (
        <CommonWebBox>
          {records !== undefined && (
            <CommonDataTable
              handleOp={handleOp}
              excel={false}
              data={records}
              columns={columns}
            />
          )}
        </CommonWebBox>
      )}
    </MyView>
  );
}
export default History;
