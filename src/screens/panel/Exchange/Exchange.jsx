import React, {useState} from 'react';
import {globalStateContext, dispatchStateContext} from '@/App.jsx';
import {ExchangeProvider} from './component/Context.jsx';
import List from './component/List.jsx';
import Create from './component/Create.jsx';
function Exchange(props) {
  const navigate = props.navigate;
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [mode, setMode] = useState('list');
  const setLoading = status => {
    dispatch({
      loading: status,
    });
  };
  return (
    <ExchangeProvider>
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
          navigate={navigate}
          token={state.token}
          setMode={setMode}
          setLoading={setLoading}
        />
      )}
    </ExchangeProvider>
  );
}
export default Exchange;
