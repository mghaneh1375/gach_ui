import React, {useState} from 'react';
import {View} from 'react-native';
import CreateQuiz from './components/CreateQuiz';
import List from './components/List';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {generalRequest} from '../../../API/Utility';
import {routes} from '../../../API/APIRoutes';
import Update from './components/Update';
import Students from './components/Students';
import Questions from './components/Questions';

const Quiz = props => {
  const [mode, setMode] = useState('list');
  const [quizes, setQuizes] = useState([]);
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
    Promise.all([
      generalRequest(
        routes.fetchAllQuiz,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      if (res[0] == null) {
        navigate('/');
        return;
      }
      setQuizes(res[0]);
      dispatch({loading: false});
    });
  }, [navigate, props.token, dispatch]);

  const updateQuiz = newData => {
    const quizId = newData.id;
    let newList = [];
    for (let i = 0; i < quizes.length; i++) {
      if (quizes[i].id !== quizId) newList.push(quizes[i]);
      else newList.push(newData);
    }

    if (selectedQuiz.id === quizId) setSelectedQuiz(newData);

    setQuizes(newList);
  };

  const removeQuiz = quizId => {
    let newList = [];
    for (let i = 0; i < quizes.length; i++) {
      if (quizes[i].id !== quizId) newList.push(quizes[i]);
    }

    setQuizes(newList);
  };

  return (
    <View>
      {mode === 'list' && (
        <List
          quizes={quizes}
          setQuizes={setQuizes}
          setMode={setMode}
          selectedQuiz={selectedQuiz}
          setSelectedQuiz={setSelectedQuiz}
          setLoading={setLoading}
          removeQuiz={removeQuiz}
          updateQuiz={updateQuiz}
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
          updateQuiz={updateQuiz}
        />
      )}
      {mode === 'question' && (
        <Questions
          setLoading={setLoading}
          setMode={setMode}
          token={props.token}
          quiz={selectedQuiz}
          updateQuiz={updateQuiz}
        />
      )}
    </View>
  );
};

export default Quiz;
