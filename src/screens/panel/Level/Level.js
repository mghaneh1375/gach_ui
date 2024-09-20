import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {LevelProvider} from './components/Context';
import Create from './components/Create';
import List from './components/List';

function Level(props) {
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
    <LevelProvider>
      {mode === 'list' && (
        <List
          navigate={navigate}
          setLoading={setLoading}
          token={state.token}
          setMode={setMode}
        />
      )}
      {mode === 'create' && (
        <Create
          updateMode={false}
          setLoading={setLoading}
          token={state.token}
          setMode={setMode}
        />
      )}
      {mode === 'edit' && (
        <Create
          updateMode={true}
          setLoading={setLoading}
          token={state.token}
          setMode={setMode}
        />
      )}
    </LevelProvider>
  );
}

export default Level;
