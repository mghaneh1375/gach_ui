import React, {useState} from 'react';
import {useParams} from 'react-router';
import {MyView} from '../../../styles/Common';
import {dispatchStateContext} from '../../../App';
import {generalRequest} from '../../../API/Utility';
import {routes} from '../../../API/APIRoutes';
import Recp from '../../../components/web/Recp';

function Invoice(props) {
  const params = useParams();
  const useGlobalState = () => [React.useContext(dispatchStateContext)];
  const [dispatch] = useGlobalState();

  const [invoice, setInvoice] = useState();
  const [isWorking, setIsWorking] = useState();

  const fetchInvoice = React.useCallback(() => {
    if (isWorking) return;
    if (
      params.refId === undefined ||
      params.refId === null ||
      params.refId === ''
    ) {
      props.navigate('/');
      return;
    }

    dispatch({setLoading: true});
    setIsWorking(true);

    Promise.all([
      generalRequest(
        routes.fetchInvoice + params.refId,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      dispatch({setLoading: false});
      if (res[0] === null) {
        props.navigate('/');
        return;
      }
      setInvoice(res[0]);
    });
  }, [params, dispatch, props, isWorking]);

  React.useEffect(() => {
    fetchInvoice();
  }, [params, fetchInvoice]);

  return (
    <MyView>
      {invoice !== undefined && (
        <Recp
          setLoading={status => dispatch({loading: status})}
          recp={invoice}
          user={props.user.user}
        />
      )}
    </MyView>
  );
}

export default Invoice;
