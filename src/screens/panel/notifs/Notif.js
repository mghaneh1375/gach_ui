import React, {useState} from 'react';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {NotifProvider} from './components/Context';
import Create from './components/Create/Create';

import List from './components/List/List';

function Notif(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  const [mode, setMode] = useState('list');

  return (
    <NotifProvider>
      {mode === 'list' && (
        <List
          setMode={setMode}
          setLoading={setLoading}
          navigate={navigate}
          token={state.token}
        />
      )}
      {mode === 'create' && (
        <Create
          setMode={setMode}
          token={state.token}
          setLoading={setLoading}
          navigate={navigate}
        />
      )}
    </NotifProvider>
  );
}

export default Notif;
