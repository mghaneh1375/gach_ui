import React, {useState} from 'react';
import {addItem, editItem, removeItems} from '../../../../services/Utility';
import Create from './components/Create';
import List from './components/List';
import {globalStateContext, dispatchStateContext} from '../../../../App';
import {MyView} from 'react-native-multi-selectbox';
import {fetchData} from './components/Utility';

function TarazLevels(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  const [levels, setLevels] = useState();
  const [selectedLevel, setSelectedLevel] = useState();
  const [mode, setMode] = useState('');
  const [isWorking, setIsWorking] = useState(false);

  React.useEffect(() => {
    if (isWorking || levels !== undefined) return;

    setIsWorking(true);
    dispatch({loading: true});
    Promise.all([fetchData(props.token)]).then(res => {
      dispatch({loading: false});
      if (res[0] === null) {
        navigate('/');
        return;
      }
      setLevels(res[0]);
      setMode('list');
    });
  }, [navigate, props.token, dispatch, levels, isWorking]);

  return (
    <MyView>
      {mode === 'list' && (
        <List
          levels={levels}
          setMode={setMode}
          setData={setLevels}
          setLoading={setLoading}
          token={props.token}
          setSelectedLevel={setSelectedLevel}
          selectedLevel={selectedLevel}
          removeLevels={removedIds => {
            removeItems(levels, setLevels, removedIds);
          }}
        />
      )}
      {mode === 'create' && (
        <Create
          setMode={setMode}
          addLevel={item => {
            addItem(levels, setLevels, item);
          }}
          setLoading={setLoading}
          token={props.token}
        />
      )}
      {mode === 'update' && (
        <Create
          setMode={setMode}
          editLevel={item => {
            editItem(levels, setLevels, item);
          }}
          setLoading={setLoading}
          selectedLevel={selectedLevel}
          token={props.token}
        />
      )}
    </MyView>
  );
}

export default TarazLevels;
