import React, {useState} from 'react';
import {useParams} from 'react-router';
import {useEffectOnce} from 'usehooks-ts';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {PublicNotifProvider} from './components/Context';
import Detail from './components/Detail';
import List from './components/List';

function Notif(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const params = useParams();
  const [mode, setMode] = useState();
  const [selectedId, setSelectedId] = useState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  React.useEffect(() => {
    if (params.id !== undefined) setSelectedId(params.id);
    else setMode('list');
  }, [params]);

  React.useEffect(() => {
    if (selectedId === undefined) return;
    setMode('detail');
  }, [selectedId]);

  return (
    <PublicNotifProvider>
      {mode === 'detail' && (
        <Detail
          id={selectedId}
          setMode={setMode}
          token={state.token}
          setLoading={setLoading}
          updateAlerts={alerts => {
            dispatch({newAlerts: alerts});
          }}
          navigate={navigate}
        />
      )}
      {mode === 'list' && (
        <List
          setMode={setMode}
          token={state.token}
          setLoading={setLoading}
          navigate={navigate}
        />
      )}
    </PublicNotifProvider>
  );
}

export default Notif;
