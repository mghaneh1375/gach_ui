import {useState} from 'react';
import {View} from 'react-native';
import CreateQuiz from './components/CreateQuiz';
import List from './components/List';

const Quiz = props => {
  const [mode, setMode] = useState('create');

  return (
    <View>
      {mode === 'show' && <List setMode={setMode} token={props.token} />}
      {mode === 'create' && (
        <CreateQuiz setMode={setMode} token={props.token} />
      )}
    </View>
  );
};

export default Quiz;
