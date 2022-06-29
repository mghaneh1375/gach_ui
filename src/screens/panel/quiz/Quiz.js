import React, {useState} from 'react';
import {View} from 'react-native';
import CreateQuiz from './components/CreateQuiz';
import List from './components/List';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {generalRequest} from '../../../API/Utility';
import {routes} from '../../../API/APIRoutes';
import Ops from './components/Ops';
import Update from './components/Update';

const Quiz = props => {
  const [mode, setMode] = useState('create');
  const [quizes, setQuizes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(undefined);
  const [showOpPopUp, setShowOpPopUp] = useState(false);

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

  const toggleShowOpPopUp = () => {
    setShowOpPopUp(!showOpPopUp);
  };

  const removeQuiz = quizId => {
    let newList = [];
    for (let i = 0; i < quizes.length; i++) {
      if (quizes[i].id !== quizId) newList.push(quizes[i]);
    }

    setQuizes(newList);
  };

  const updateQuiz = newData => {
    const quizId = newData.id;
    let newList = [];
    for (let i = 0; i < quizes.length; i++) {
      if (quizes[i].id !== quizId) newList.push(quizes[i]);
      else newList.push(newData);
    }

    setQuizes(newList);
  };

  return (
    <View>
      {showOpPopUp && (
        <Ops
          quiz={selectedQuiz}
          toggleShowPopUp={toggleShowOpPopUp}
          token={props.token}
          setLoading={setLoading}
          removeQuiz={removeQuiz}
          updateQuiz={updateQuiz}
          setMode={setMode}
          setSelectedQuiz={setSelectedQuiz}
        />
      )}
      {mode === 'list' && (
        <List
          quizes={quizes}
          setQuizes={setQuizes}
          setMode={setMode}
          setSelectedQuiz={setSelectedQuiz}
          toggleShowOpPopUp={toggleShowOpPopUp}
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
    </View>
  );
};

export default Quiz;
