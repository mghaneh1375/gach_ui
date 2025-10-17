import React, {useState} from 'react';
import List from './components/List.jsx';
import Create from './components/Create.jsx';
import {dispatchStateContext, globalStateContext} from '@/App.jsx';
import {AdviceTagReportProvider} from './components/Context.jsx';

function TeachTagsReport(props) {
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
    <AdviceTagReportProvider>
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
    </AdviceTagReportProvider>
  );
}
export default TeachTagsReport;
