import React, {useState} from 'react';
import {View} from 'react-native';
import {globalStateContext, dispatchStateContext} from '../../../App';
import List from './components/List';
import AddBatch from './components/Create/AddBatch';

const Question = props => {
  const [showAddBatchPopUp, setShowAddBatchPopUp] = useState(false);
  const [mode, setMode] = useState('list');

  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  const toggleShowAddBatchPopUp = () => {
    setShowAddBatchPopUp(!showAddBatchPopUp);
  };

  return (
    <View>
      {showAddBatchPopUp && (
        <AddBatch
          toggleShowPopUp={toggleShowAddBatchPopUp}
          token={props.token}
          setLoading={setLoading}
          setMode={setMode}
        />
      )}
      {mode === 'list' && (
        <List
          toggleShowAddBatchPopUp={toggleShowAddBatchPopUp}
          setMode={setMode}
          token={props.token}
        />
      )}
    </View>
  );
};

export default Question;
