import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {PackageProvider} from './components/Context';
import Detail from './components/Detail/Detail';
import List from './components/List';

function Packages(props) {
  const [mode, setMode] = useState('list');
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  return (
    <PackageProvider>
      {mode === 'list' && (
        <List setMode={setMode} token={state.token} setLoading={setLoading} />
      )}
      {mode === 'detail' && (
        <Detail setMode={setMode} setLoading={setLoading} />
      )}
    </PackageProvider>
  );
}

export default Packages;
