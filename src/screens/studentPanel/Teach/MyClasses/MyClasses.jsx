import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '@/App.jsx';
import List from './components/List.jsx';
import Report from './components/Report.jsx';
import {MyTeachClassesForStudentProvider} from './components/Context.jsx';
function MyClasses(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const [mode, setMode] = useState('list');
  const setLoading = new_status => {
    dispatch({
      loading: new_status,
    });
  };
  return (
    <MyTeachClassesForStudentProvider>
      {mode === 'list' && (
        <List
          navigate={props.navigate}
          setMode={setMode}
          token={state.token}
          setLoading={setLoading}
        />
      )}
      {mode === 'report' && (
        <Report setMode={setMode} token={state.token} setLoading={setLoading} />
      )}
    </MyTeachClassesForStudentProvider>
  );
}
export default MyClasses;
