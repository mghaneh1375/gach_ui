import React, {useState} from 'react';
import Create from './components/Create';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {AdvisorScheduleProvider} from './components/Context';
import {useParams} from 'react-router';
import List from './components/List';

function Schedule(props) {
  const [mode, setMode] = useState();
  const [studentId, setStudentId] = useState();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();

  const params = useParams();

  React.useEffect(() => {
    if (params.studentId === undefined) return;
    setStudentId(params.studentId);
  }, [params]);

  React.useEffect(() => {
    if (studentId !== undefined) setMode('list');
  }, [studentId]);

  const setLoading = status => {
    dispatch({loading: status});
  };

  return (
    <AdvisorScheduleProvider>
      {mode === 'list' && (
        <List
          token={state.token}
          setLoading={setLoading}
          navigate={props.navigate}
          studentId={studentId}
          setMode={setMode}
        />
      )}
      {mode === 'create' && (
        <Create
          token={state.token}
          setLoading={setLoading}
          isInEditMode={false}
          studentId={studentId}
          setMode={setMode}
        />
      )}
      {mode === 'edit' && (
        <Create
          token={state.token}
          setLoading={setLoading}
          studentId={studentId}
          setMode={setMode}
          isInEditMode={true}
        />
      )}
    </AdvisorScheduleProvider>
  );
}

export default Schedule;
