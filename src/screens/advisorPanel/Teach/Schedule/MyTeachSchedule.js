import React, {useState} from 'react';
import List from './components/List';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import {TeachScheduleProvider} from './components/Context';
import Create from './components/Create';

function MyTeachSchedule(props) {
  const [mode, setMode] = useState('list');

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
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
          isInPhone={state.isInPhone}
          setLoading={setLoading}
          isInEditMode={false}
          advisorId={state.user.user.id}
          setMode={setMode}
          user={state.user.user}
        />
      )}
      {/* {mode === 'edit' && (
        <Create
          token={state.token}
          isInPhone={state.isInPhone}
          user={state.user.user}
          setLoading={setLoading}
          studentId={studentId}
          setMode={setMode}
          isInEditMode={true}
        />
      )} */}
    </TeachScheduleProvider>
  );
}

export default MyTeachSchedule;
