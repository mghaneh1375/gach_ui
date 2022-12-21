import React, {useState} from 'react';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {CommonWebBox, SimpleText} from '../../../styles/Common';

function CheckCert(props) {
  const params = React.useParams();
  const [isWorking, setIsWorking] = useState(false);

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [res, setRes] = useState();

  const fetchData = React.useCallback(() => {
    if (isWorking || res !== undefined) return;

    if (params.certId === undefined) {
      props.navigate('/');
      return;
    }

    setIsWorking(true);
    dispatch({loading: true});

    Promise.all([
      generalRequest(
        routes.checkCert + params.certId,
        'get',
        undefined,
        'data',
        undefined,
      ),
    ]).then(r => {
      if (r[0] == null) {
        setRes('گواهی موردنظر نامعتبر است.');
        return;
      }

      setRes(r[0]);
    });
  }, [props, params, dispatch, isWorking, res]);

  React.useEffect(() => {
    fetchData();
  }, [params, fetchData]);

  return (
    <CommonWebBox header={'بررسی گواهی'}>
      {res !== undefined && <SimpleText text={res} />}
    </CommonWebBox>
  );
}

export default CheckCert;
