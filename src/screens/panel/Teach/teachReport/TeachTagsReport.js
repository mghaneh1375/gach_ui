import React, {useState} from 'react';
import {TeachReportProvider} from './components/Context';
import List from './components/List';
import Create from './components/Create';
// import Report from './components/Report';
import {dispatchStateContext, globalStateContext} from '../../../../App';

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
    <TeachReportProvider>
      {mode === 'list' && (
        <List
          setMode={setMode}
          navigate={navigate}
          setLoading={setLoading}
          token={state.token}
        />
      )}
      {/* {mode === 'report' && (
        <Report
          setMode={setMode}
          navigate={navigate}
          setLoading={setLoading}
          token={state.token}
        />
      )} */}
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
    </TeachReportProvider>
  );
}

export default TeachTagsReport;
