import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {CourseProvider} from './components/Context';
import ListLifestyle from './components/ListLifestyle';
import CreateLifestyle from './components/CreateLifestyle';

function LifeStyle(props) {
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
    <CourseProvider>
      {mode === 'list' && (
        <ListLifestyle
          setMode={setMode}
          navigate={navigate}
          setLoading={setLoading}
          token={state.token}
        />
      )}
      {mode === 'create' && (
        <CreateLifestyle
          setMode={setMode}
          navigate={navigate}
          setLoading={setLoading}
          token={state.token}
        />
      )}
    </CourseProvider>
  );
}

export default LifeStyle;
