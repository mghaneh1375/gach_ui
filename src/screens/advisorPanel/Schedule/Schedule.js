import React, {useState} from 'react';
import Create from './components/Create';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {AdvisorScheduleProvider} from './components/Context';
import {useParams} from 'react-router';
import List from './components/List';
import {isUserAdvisor} from '../../../services/Utility';
import Lesson from './components/Lesson';
import Copy from './components/Copy';

function Schedule(props) {
  const [mode, setMode] = useState();
  const [studentId, setStudentId] = useState();

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const isAdvisor = isUserAdvisor(state.user);

  const params = useParams();

  React.useEffect(() => {
    if (mode === 'create' || mode === 'edit')
      dispatch({isRightMenuVisible: false});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  React.useEffect(() => {
    if (params.studentId === undefined) return;
    setStudentId(params.studentId);
  }, [params]);

  React.useEffect(() => {
    if (studentId !== undefined || !isAdvisor) setMode('list');

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [studentId]);

  const setLoading = status => {
    dispatch({loading: status});
  };

  return (
    <AdvisorScheduleProvider>
      {mode === 'list' && (
        <List
          token={state.token}
          isAdvisor={isAdvisor}
          setLoading={setLoading}
          navigate={props.navigate}
          studentId={studentId}
          setMode={setMode}
        />
      )}
      {mode === 'lesson' && (
        <Lesson
          token={state.token}
          isAdvisor={isAdvisor}
          setLoading={setLoading}
          navigate={props.navigate}
          setMode={setMode}
        />
      )}

      {mode === 'copy' && (
        <Copy
          studentId={studentId}
          token={state.token}
          setLoading={setLoading}
          setMode={setMode}
        />
      )}
      {mode === 'create' && (
        <Create
          token={state.token}
          isInPhone={state.isInPhone}
          setLoading={setLoading}
          isAdvisor={isAdvisor}
          isInEditMode={false}
          advisorId={isAdvisor ? state.user.user.id : undefined}
          studentId={studentId}
          setMode={setMode}
        />
      )}
      {mode === 'edit' && (
        <Create
          token={state.token}
          isInPhone={state.isInPhone}
          isAdvisor={isAdvisor}
          user={state.user.user}
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
