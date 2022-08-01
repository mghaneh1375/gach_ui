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
        {mode === 'student' && (
          <Students
            setLoading={setLoading}
            setMode={setMode}
            token={props.token}
            quiz={selectedQuiz}
            updateQuiz={newQuiz => {
              editItem(quizzes, setQuizzes, newQuiz);
              setSelectedQuiz(newQuiz);
            }}
          />
        )}
        {mode === 'question' && (
          <Questions
            setLoading={setLoading}
            setMode={setMode}
            token={props.token}
            quiz={selectedQuiz}
            updateQuiz={newQuiz => {
              editItem(quizzes, setQuizzes, newQuiz);
              setSelectedQuiz(newQuiz);
            }}
          />
        )}
        {mode === 'CV' && (
          <CV
            setLoading={setLoading}
            setMode={setMode}
            token={props.token}
            quiz={selectedQuiz}
            updateQuiz={newQuiz => {
              editItem(quizzes, setQuizzes, newQuiz);
              setSelectedQuiz(newQuiz);
            }}
          />
        )}
      </QuizProvider>
    </View>
  );
};

export default Quiz;
