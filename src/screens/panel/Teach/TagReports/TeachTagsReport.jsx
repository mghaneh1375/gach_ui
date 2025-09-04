import React, {useState} from 'react';
import List from './components/List';
import Create from './components/Create';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import {TeachTagReportProvider} from './components/Context';

function TeachTagsReport(props) {
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
    <TeachTagReportProvider>
      {mode === 'list' && (
        <List
          setMode={setMode}
          navigate={navigate}
          setLoading={setLoading}
          token={state.token}
        />
      )}
      {mode === 'create' && (
        <Create
          isInEditMode={false}
          setMode={setMode}
          navigate={navigate}
          setLoading={setLoading}
          token={state.token}
        />
      )}
      {mode === 'edit' && (
        <Create
          isInEditMode={true}
          setMode={setMode}
          navigate={navigate}
          setLoading={setLoading}
          token={state.token}
        />
      )}
    </TeachTagReportProvider>
  );
}

export default TeachTagsReport;
