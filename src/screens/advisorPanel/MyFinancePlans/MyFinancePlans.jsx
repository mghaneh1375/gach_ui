import {dispatchStateContext, globalStateContext} from '../../../App';
import React, {useState} from 'react';
import {FinanceProvider} from './components/Context';
import List from './components/List';
import Create from './components/Create';

function MyFinancePlans(props) {
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
    <FinanceProvider>
      {mode === 'list' && (
        <List
          setMode={setMode}
          setLoading={setLoading}
          navigate={props.navigate}
          token={state.token}
        />
      )}
      {mode === 'create' && (
        <Create
          isInEditMode={false}
          setMode={setMode}
          setLoading={setLoading}
          navigate={props.navigate}
          token={state.token}
        />
      )}

      {mode === 'edit' && (
        <Create
          isInEditMode={true}
          setMode={setMode}
          setLoading={setLoading}
          navigate={props.navigate}
          token={state.token}
        />
      )}
    </FinanceProvider>
  );
}

export default MyFinancePlans;
