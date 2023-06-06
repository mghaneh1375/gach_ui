import React, {useState} from 'react';
import {useEffectOnce} from 'usehooks-ts';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {ScheduleProvider} from './components/Context';
import Schedule from './components/Schedule';

function MyLifeStyle(props) {
  const navigate = props.navigate;
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  useEffectOnce(() => {
    dispatch({isRightMenuVisible: false});
  });

  const [mode, setMode] = useState('list');

  return (
    <ScheduleProvider>
      {mode === 'list' && (
        <Schedule
          token={state.token}
          navigate={navigate}
          setMode={setMode}
          setLoading={setLoading}
        />
      )}
    </ScheduleProvider>
  );
}

export default MyLifeStyle;
