import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {BadgeProvider} from './components/Context';
import List from './components/List';
import Create from './components/Create/Create';

function Badge(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [mode, setMode] = useState('list');

  const setLoading = status => {
    dispatch({loading: status});
  };

  return (
    <BadgeProvider>
      {mode === 'list' && (
        <List
          navigate={navigate}
          token={state.token}
          setMode={setMode}
          setLoading={setLoading}
        />
      )}
      {mode === 'create' && (
        <Create
          isInEditMode={false}
          token={state.token}
          setMode={setMode}
          setLoading={setLoading}
        />
      )}
      {mode === 'edit' && (
        <Create
          isInEditMode={true}
          token={state.token}
          setMode={setMode}
          setLoading={setLoading}
        />
      )}
    </BadgeProvider>
  );
}

export default Badge;
