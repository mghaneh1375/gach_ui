import React, {useState} from 'react';
import CreateQuiz from './components/CreateQuiz';
import List from './components/List';
import {dispatchStateContext, globalStateContext} from '../../../App';
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
import ContentQuizKarname from './components/Reports/Karname/ContentQuizKarname';
import CreateOnlineQuiz from './components/CreateOnlineQuiz';

const OnlineStanding = props => {
  const [mode, setMode] = useState('karname');
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

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
            token={state.token}
            generalMode={'onlineStanding'}
          />
        )}
        {mode === 'create' && (
          <CreateOnlineQuiz
            setLoading={setLoading}
            setMode={setMode}
            token={state.token}
            editMode={false}
          />
        )}
        {mode === 'update' && (
          <CreateOnlineQuiz
            setLoading={setLoading}
            setMode={setMode}
            token={state.token}
            editMode={true}
          />
        )}
        {mode === 'key' && (
          <Key setLoading={setLoading} setMode={setMode} token={state.token} />
        )}
        {mode === 'student' && (
          <Students
            setLoading={setLoading}
            setMode={setMode}
            token={state.token}
            generalMode={'onlineStanding'}
          />
        )}
        {mode === 'question' && (
          <Questions
            setLoading={setLoading}
            setMode={setMode}
            token={state.token}
          />
        )}
        {mode === 'ranking' && (
          <Ranking
            setLoading={setLoading}
            setMode={setMode}
            token={state.token}
            quizMode={params.mode}
            quizId={params.quizId}
            quizName={params.quizName}
          />
        )}
        {mode === 'karname' && params.mode !== 'content' && (
          <Karname
            setLoading={setLoading}
            user={props.user}
            setMode={setMode}
            token={state.token}
            quizMode={params.mode}
            quizId={params.quizId}
            studentId={params.studentId}
          />
        )}
        {mode === 'karname' && params.mode === 'content' && (
          <ContentQuizKarname
            setLoading={setLoading}
            user={props.user}
            setMode={setMode}
            token={state.token}
            quizMode={params.mode}
            quizId={params.quizId}
            studentId={params.studentId}
            navigate={navigate}
          />
        )}
        {mode === 'report' && (
          <ReportList
            setLoading={setLoading}
            setMode={setMode}
            token={state.token}
          />
        )}
      </QuizProvider>
    </MyView>
  );
};

export default OnlineStanding;
