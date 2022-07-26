import React, {useState} from 'react';
import {View} from 'react-native';
import CreateQuiz from './components/CreateQuiz';
import List from './components/List';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {generalRequest} from '../../../API/Utility';
import {routes} from '../../../API/APIRoutes';
import Update from './components/Update';
import Students from './components/Students/Students';
import Questions from './components/Questions/Questions';
import {editItem} from '../../../services/Utility';
import {getQuizzes} from './components/Utility';
import CV from './components/CV/CV';

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

  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([getQuizzes(props.token)]).then(res => {
      dispatch({loading: false});
      if (res[0] == null) {
        navigate('/');
        return;
      }
      setQuizzes(res[0]);
    });
  }, [navigate, props.token, dispatch]);

  const removeQuiz = quizId => {
    let newList = [];
    for (let i = 0; i < quizzes.length; i++) {
      if (quizzes[i].id !== quizId) newList.push(quizzes[i]);
    }

    setQuizzes(newList);
  };

  const addQuiz = quiz => {
    let newList = quizzes;
    newList.push(quiz);
    setQuizzes(newList);
  };

  return (
    <View>
      {mode === 'list' && (
        <List
          quizzes={quizzes}
          setQuizzes={setQuizzes}
          setMode={setMode}
          selectedQuiz={selectedQuiz}
          setSelectedQuiz={setSelectedQuiz}
          setLoading={setLoading}
          removeQuiz={removeQuiz}
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
          addQuiz={addQuiz}
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
    </View>
  );
};

export default Quiz;
