import React, {useState} from 'react';
import {useParams} from 'react-router';
import {routes} from '../../API/APIRoutes';
import {generalRequest} from '../../API/Utility';
import {dispatchStateContext, globalStateContext} from '../../App';
import {CommonWebBox, SimpleText} from '../../styles/Common';

function AcceptInvite(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [isWorking, setIsWorking] = useState(false);
  const [msg, setMsg] = useState();

  const params = useParams();
  if (params.reqId === undefined) navigate('/');

  const reqId = params.reqId;

  React.useEffect(() => {
    if (isWorking || msg !== undefined) return;
    setIsWorking(true);
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.acceptInvite + reqId,
        'post',
        undefined,
        'msg',
        props.token,
      ),
    ]).then(res => {
      dispatch({loading: false});
      if (res !== null) setMsg(res);
      setIsWorking(false);
    });
  }, [navigate, props.token, dispatch, reqId, isWorking, msg]);

  return (
    <CommonWebBox>
      {msg !== undefined && <SimpleText text={msg} />}
    </CommonWebBox>
  );
}

export default AcceptInvite;
