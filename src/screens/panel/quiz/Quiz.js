import React, {useState} from 'react';
import CreateQuiz from './components/CreateQuiz';
import List from './components/List';
import {dispatchStateContext} from '../../../App';
import Students from './components/Students/Students';
import Questions from './components/Questions/Questions';
import CV from './components/CV/CV';
import {QuizProvider} from './components/Context';
import Key from './components/Key/Key';
import Ranking from './components/Reports/Ranking/Ranking';
import Karname from './components/Reports/Karname/Karname';
import ReportList from './components/Reports/List/List';
import {useParams} from 'react-router';
import {MyView} from '../../../styles/Common';

const Quiz = props => {
  const [mode, setMode] = useState('karname');
  const navigate = props.navigate;

  const useGlobalState = () => [React.useContext(dispatchStateContext)];

  const [dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  const params = useParams();

  React.useEffect(() => {
    if (props.mode !== undefined) {
      setMode(props.mode);
    } else setMode('list');
  }, [props.mode]);

  return (
    <MyView>
      <QuizProvider>
        {mode === 'list' && (
          <List
            setMode={setMode}
            navigate={navigate}
            setLoading={setLoading}
            token={props.token}
          />
        )}
        {mode === 'create' && (
          <CreateQuiz
            setLoading={setLoading}
            setMode={setMode}
            token={props.token}
            editMode={false}
          />
        )}
        {mode === 'update' && (
          <CreateQuiz
            setLoading={setLoading}
            setMode={setMode}
            token={props.token}
            editMode={true}
          />
        )}
        {mode === 'key' && (
          <Key setLoading={setLoading} setMode={setMode} token={props.token} />
        )}
        {mode === 'student' && (
          <Students
            setLoading={setLoading}
            setMode={setMode}
            token={props.token}
          />
        )}
        {mode === 'question' && (
          <Questions
            setLoading={setLoading}
            setMode={setMode}
            token={props.token}
          />
        )}
        {mode === 'CV' && (
          <CV setLoading={setLoading} setMode={setMode} token={props.token} />
        )}
        {mode === 'ranking' && (
          <Ranking
            setLoading={setLoading}
            setMode={setMode}
            token={props.token}
            quizMode={params.mode}
            quizId={params.quizId}
          />
        )}
        {mode === 'karname' && (
          <Karname
            setLoading={setLoading}
            user={props.user}
            setMode={setMode}
            token={props.token}
            quizMode={params.mode}
            quizId={params.quizId}
            studentId={params.studentId}
          />
        )}
        {mode === 'report' && (
          <ReportList
            setLoading={setLoading}
            setMode={setMode}
            token={props.token}
          />
        )}
      </QuizProvider>
    </MyView>
  );
};

export default Quiz;
