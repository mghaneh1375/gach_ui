import React, {useState} from 'react';
import {View} from 'react-native';
import CreateQuiz from './components/CreateQuiz';
import List from './components/List';
import {globalStateContext, dispatchStateContext} from '../../../App';
import Update from './components/Update';
import Students from './components/Students/Students';
import Questions from './components/Questions/Questions';
import {editItem} from '../../../services/Utility';
import CV from './components/CV/CV';
import {QuizProvider} from './components/Context';
import Key from './components/Key/Key';
import Ranking from './components/Reports/Ranking/Ranking';
import Karname from './components/Reports/Karname/Karname';
import ReportList from './components/Reports/List/List';
import {useParams} from 'react-router';

const Quiz = props => {
  const [mode, setMode] = useState('list');
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(undefined);

  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  // const params = useParams();

  // React.useEffect(() => {
  //   if (props.mode !== undefined) {
  //     setMode(props.mode);
  //   } else setMode('list');
  // }, [props.mode]);

  return (
    <View>
      <QuizProvider>
        {mode === 'list' && (
          <List
            setMode={setMode}
            navigate={navigate}
            setLoading={setLoading}
            updateQuiz={newQuiz => {
              editItem(quizzes, setQuizzes, newQuiz);
              setSelectedQuiz(newQuiz);
            }}
            token={props.token}
          />
        )}
        {mode === 'create' && (
          <CreateQuiz
            setLoading={setLoading}
            setMode={setMode}
            token={props.token}
          />
        )}
        {mode === 'update' && (
          <Update
            setLoading={setLoading}
            setMode={setMode}
            token={props.token}
            quiz={selectedQuiz}
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
            updateQuiz={newQuiz => {
              editItem(quizzes, setQuizzes, newQuiz);
              setSelectedQuiz(newQuiz);
            }}
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
          />
        )}
        {mode === 'karname' && (
          <Karname
            setLoading={setLoading}
            setMode={setMode}
            token={props.token}
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
    </View>
  );
};

export default Quiz;
