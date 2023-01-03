import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../API/APIRoutes';
import {generalRequest} from '../../API/Utility';
import {dispatchStateContext, globalStateContext} from '../../App';
import {CommonWebBox} from '../../styles/Common';

function Notif(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [notif, setNotif] = useState();

  const fetchNotif = React.useCallback(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(routes.fetchNotif, 'get', undefined, 'data', state.token),
    ]).then(res => {
      dispatch({loading: false});
      if (res[0] === null) {
        navigate('/');
        return;
      }
      setNotif(res[0]);
    });
  }, [navigate, dispatch, state.token]);

  useEffectOnce(() => {
    fetchNotif();
  }, [fetchNotif]);

  return (
    <CommonWebBox header={notif === undefined ? '' : notif.title}>
      {notif !== undefined && (
        <RenderHTML
          source={{
            html: notif.desc,
          }}
        />
      )}
    </CommonWebBox>
  );
}

export default Notif;
