import React, {useState} from 'react';
import {View} from 'react-native';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {getGradeLessons} from '../Basic/Utility';
import AddBatch from './components/Create/AddBatch';
import AddBatchFiles from './components/Create/AddBatchFiles';
import List from './components/List/List';
import {getSubjects} from './components/Utility';

const Question = props => {
  const [showAddBatchPopUp, setShowAddBatchPopUp] = useState(false);
  const [showAddBatchFilesPopUp, setShowAddBatchFilesPopUp] = useState(false);
  const [subjects, setSubjects] = useState();
  const [mode, setMode] = useState('list');
  const [grades, setGrades] = useState();
  const [selected, setSelected] = useState();

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

  React.useEffect(() => {
    dispatch({loading: true});

    Promise.all([getSubjects(props.token), getGradeLessons(props.token)]).then(
      res => {
        dispatch({loading: false});
        if (res[0] === null || res[1] === null) {
          navigate('/');
          return;
        }
        setSubjects(res[0]);
        setGrades(res[1]);
      },
    );
  }, [dispatch, navigate, props.token]);

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
          data={subjects}
          setSelected={setSelected}
          grades={grades}
        />
      )}
    </View>
  );
};

export default Question;
