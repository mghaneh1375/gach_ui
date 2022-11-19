import Recp from '../../../components/web/Recp';
import React, {useState} from 'react';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {generalRequest} from '../../../API/Utility';
import {routes} from '../../../API/APIRoutes';
import {useParams} from 'react-router';

function ShowRecp(props) {
  const [recp, setRecp] = useState();
  const navigate = props.navigate;
  const [isWorking, setIsWorking] = useState();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const fetchData = React.useCallback(() => {
    if (params.transactionId === undefined) {
      navigate('/');
      return;
    }

    if (recp !== undefined || isWorking) return;
    setIsWorking(true);
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.fetchInvoice + params.transactionId,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      dispatch({loading: false});

      if (res[0] === null) {
        navigate('/');
        return;
      }

      setRecp(res[0]);
      setIsWorking(false);
    });
  }, [isWorking, params, recp, navigate, dispatch, props.token]);

  const params = useParams();

  React.useEffect(() => {
    fetchData();
  }, [params.transactionId, fetchData]);

  if (recp !== undefined)
    return (
      <Recp
        setLoading={status => dispatch({loading: status})}
        onBackClick={() => navigate('/financeHistory')}
        user={state.user.user}
        recp={recp}
      />
    );
  return <></>;
}

export default ShowRecp;
