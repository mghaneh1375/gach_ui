import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {ScheduleProvider} from './components/Context';
import Schedule from './components/Schedule';
import {useParams} from 'react-router';

function MyLifeStyle(props) {
  const navigate = props.navigate;
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();
  const params = useParams();

  const setLoading = status => {
    dispatch({loading: status});
  };

  useEffectOnce(() => {
    dispatch({isRightMenuVisible: false});
    setMode('list');
  });

  const [mode, setMode] = useState();

  return (
    <ScheduleProvider>
      {mode === 'list' && (
        <Schedule
          token={state.token}
          navigate={navigate}
          setMode={setMode}
          setLoading={setLoading}
          userId={params.studentId}
          isInPhone={state.isInPhone}
        />
      )}
    </ScheduleProvider>
  );
}

export default MyLifeStyle;
