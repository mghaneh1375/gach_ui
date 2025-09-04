import React, {useState} from 'react';
import List from './components/List.jsx';
import {dispatchStateContext, globalStateContext} from '@/App.jsx';
import {TeachScheduleProvider} from './components/Context.jsx';
import Create from './components/Create.jsx';
import Students from './components/Students.jsx';
import Copy from './components/Copy.jsx';
function MyTeachSchedule(props) {
  const [mode, setMode] = useState('list');
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const setLoading = status => {
    dispatch({
      loading: status,
    });
  };
  return (
    <TeachScheduleProvider>
      {mode === 'list' && (
        <List
          token={state.token}
          setLoading={setLoading}
          navigate={props.navigate}
          setMode={setMode}
        />
      )}
      {mode === 'create' && (
        <Create
          token={state.token}
          setLoading={setLoading}
          isInEditMode={false}
          setMode={setMode}
        />
      )}
      {mode === 'edit' && (
        <Create
          token={state.token}
          setLoading={setLoading}
          setMode={setMode}
          isInEditMode={true}
        />
      )}
      {mode === 'copy' && (
        <Copy token={state.token} setLoading={setLoading} setMode={setMode} />
      )}
      {mode === 'students' && (
        <Students
          token={state.token}
          setLoading={setLoading}
          setMode={setMode}
        />
      )}
    </TeachScheduleProvider>
  );
}
export default MyTeachSchedule;
