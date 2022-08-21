import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import List from './components/List/List';
import {PackageProvider} from './components/Context';
import Detail from './components/Detail/Detail';

function Buy(props) {
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

  React.useEffect(() => {
    if (mode !== 'list') {
      dispatch({
        isFilterMenuVisible: false,
      });
    }
  }, [mode, dispatch]);

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
        <Detail
          setMode={setMode}
          isRightMenuVisible={state.isRightMenuVisible}
          setLoading={setLoading}
          token={props.token}
        />
      )}
    </PackageProvider>
  );
}

export default Buy;
