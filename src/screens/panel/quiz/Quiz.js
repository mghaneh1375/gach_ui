import React, {useState} from 'react';
import {View} from 'react-native';
import CreateQuiz from './components/CreateQuiz';
import List from './components/List';
import {globalStateContext, dispatchStateContext} from '../../../App';

const Quiz = props => {
  const [mode, setMode] = useState('create');

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
      {mode === 'show' && <List setMode={setMode} token={props.token} />}
      {mode === 'create' && (
        <CreateQuiz
          setLoading={setLoading}
          setMode={setMode}
          token={props.token}
        />
      )}
    </View>
  );
};

export default Quiz;
