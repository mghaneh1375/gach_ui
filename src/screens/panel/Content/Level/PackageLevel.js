import React, {useEffect, useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import List from './List';
import Create from './Create';

function PackageLevel(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [mode, setMode] = useState('list');

  const setLoading = status => {
    dispatch({loading: status});
  };
  const [selectedLevel, setSelectedLevel] = useState();

  return (
    <>
      {mode === 'list' && (
        <List
          setMode={setMode}
          setLoading={setLoading}
          navigate={props.navigate}
          token={state.token}
          setSelectedLevel={setSelectedLevel}
        />
      )}
      {mode === 'create' && (
        <Create setMode={setMode} setLoading={setLoading} token={state.token} />
      )}
      {mode === 'edit' && (
        <Create
          selectedLevel={selectedLevel}
          setMode={setMode}
          setLoading={setLoading}
          token={state.token}
        />
      )}
    </>
  );
}

export default PackageLevel;
