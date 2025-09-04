import React, {useState} from 'react';
import {globalStateContext, dispatchStateContext} from '@/App.jsx';
import {CourseProvider} from './components/Context.jsx';
import Create from './components/Create.jsx';
import List from './components/List.jsx';
function Course(props) {
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
          isInEditMode={false}
        />
      )}
      {mode === 'edit' && (
        <Create
          setMode={setMode}
          navigate={navigate}
          setLoading={setLoading}
          token={state.token}
          isInEditMode={true}
        />
      )}
    </CourseProvider>
  );
}
export default Course;
