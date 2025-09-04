import React, {useState} from 'react';
import {globalStateContext, dispatchStateContext} from '@/App.jsx';
import {CourseProvider} from './components/Context.jsx';
import ListLifestyle from './components/ListLifestyle.jsx';
import CreateLifestyle from './components/CreateLifestyle.jsx';
function LifeStyle(props) {
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
