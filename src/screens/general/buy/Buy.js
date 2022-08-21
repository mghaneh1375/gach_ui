import React, {useState} from 'react';
import {dispatchStateContext} from '../../../App';
import List from './components/List/List';
import {PackageProvider} from './components/Context';
import Detail from './components/Detail/Detail';

function Buy(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [React.useContext(dispatchStateContext)];
  const [dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  const [mode, setMode] = useState('list');

  return (
    <PackageProvider>
      {mode === 'list' && (
        <List
          navigate={navigate}
          setMode={setMode}
          setLoading={setLoading}
          token={props.token}
        />
      )}
      {mode === 'detail' && (
        <Detail setMode={setMode} setLoading={setLoading} token={props.token} />
      )}
    </PackageProvider>
  );
}

export default Buy;
