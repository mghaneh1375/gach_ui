import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import {CourseProvider} from './components/Context';
import CreateExamTag from './components/CreateExamTag';
import ListExamTags from './components/ListExamTags';

function ExamTags(props) {
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
