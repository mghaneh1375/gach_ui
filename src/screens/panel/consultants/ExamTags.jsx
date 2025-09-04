import React, {useState} from 'react';
import {globalStateContext, dispatchStateContext} from '@/App.jsx';
import {CourseProvider} from './components/Context.jsx';
import CreateExamTag from './components/CreateExamTag.jsx';
import ListExamTags from './components/ListExamTags.jsx';
function ExamTags(props) {
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
        <ListExamTags
          setMode={setMode}
          navigate={navigate}
          setLoading={setLoading}
          token={state.token}
        />
      )}
      {mode === 'create' && (
        <CreateExamTag
          setMode={setMode}
          navigate={navigate}
          setLoading={setLoading}
          token={state.token}
        />
      )}
    </CourseProvider>
  );
}
export default ExamTags;
