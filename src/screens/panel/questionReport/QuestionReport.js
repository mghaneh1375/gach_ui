import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {QuestionReportProvider} from './components/Context';
import List from './components/List';
import Create from './components/Create';

function QuestionReport(props) {
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
    <QuestionReportProvider>
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
          setMode={setMode}
          navigate={navigate}
          setLoading={setLoading}
          token={state.token}
        />
      )}
    </QuestionReportProvider>
  );
}

export default QuestionReport;
