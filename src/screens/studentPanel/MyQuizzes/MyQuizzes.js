import List from './components/List';
import {dispatchStateContext} from '../../../App';
import React, {useState} from 'react';
import {QuizProvider} from '../../panel/quiz/components/Context';

function MyQuizzes(props) {
  const useGlobalState = () => [React.useContext(dispatchStateContext)];

  const [dispatch] = useGlobalState();
  const [mode, setMode] = useState('list');

  const setLoading = status => {
    dispatch({loading: status});
  };

  return (
    <QuizProvider>
      {mode === 'list' && <List setLoading={setLoading} token={props.token} />}
    </QuizProvider>
  );
}

export default MyQuizzes;
