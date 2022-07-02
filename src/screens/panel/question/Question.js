import React, {useState} from 'react';
import {View} from 'react-native';
import {globalStateContext, dispatchStateContext} from '../../../App';
import List from './components/List';
import AddBatch from './components/Create/AddBatch';
import AddBatchFiles from './components/Create/AddBatchFiles';

const Question = props => {
  const [showAddBatchPopUp, setShowAddBatchPopUp] = useState(false);
  const [showAddBatchFilesPopUp, setShowAddBatchFilesPopUp] = useState(false);
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

  const toggleShowAddBatchFilesPopUp = () => {
    setShowAddBatchFilesPopUp(!showAddBatchFilesPopUp);
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
      {showAddBatchFilesPopUp && (
        <AddBatchFiles
          toggleShowPopUp={toggleShowAddBatchFilesPopUp}
          token={props.token}
          setLoading={setLoading}
        />
      )}
      {mode === 'list' && (
        <List
          toggleShowAddBatchPopUp={toggleShowAddBatchPopUp}
          toggleShowAddBatchFilesPopUp={toggleShowAddBatchFilesPopUp}
          setMode={setMode}
          token={props.token}
        />
      )}
    </View>
  );
};

export default Question;
