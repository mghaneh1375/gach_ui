import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import List from './components/List';

function MyClasses(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [mode, setMode] = useState('list');

  const setLoading = new_status => {
    dispatch({loading: new_status});
  };
  return (
    <>
      {mode === 'list' && (
        <List
          navigate={props.navigate}
          setMode={setMode}
          token={state.token}
          setLoading={setLoading}
        />
      )}
    </>
  );
}

export default MyClasses;
