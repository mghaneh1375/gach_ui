import React, {useState} from 'react';
import {View} from 'react-native';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {useParams} from 'react-router';
import {getGrade} from './components/Utility';
import List from './components/List/List';
import Create from './components/Create';
import Edit from './components/Edit';
import Translate from '../lesson/Translate';
import {addItem, editItem} from '../../../services/Utility';

function Grade(props) {
  const [mode, setMode] = useState('list');
  const [selectedGrade, setSelectedGrade] = useState();
  const [grades, setGrades] = useState();
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  // const mode = useParams().mode;

  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([getGrade(props.token)]).then(res => {
      dispatch({loading: false});
      if (res[0] == null) {
        navigate('/');
        return;
      }
      setGrades(res[0]);
      setMode('list');
    });
  }, [navigate, props.token, dispatch]);

  return (
    <View>
      {mode === 'list' && (
        <List
          grades={grades}
          setGrades={setGrades}
          setMode={setMode}
          setLoading={setLoading}
          setSelectedGrade={setSelectedGrade}
          token={props.token}
        />
      )}
      {mode === 'create' && (
        <Create
          name={Translate.name}
          token={props.token}
          setMode={setMode}
          afterFunc={newItem => addItem(grades, setGrades, newItem)}
          setLoading={setLoading}
        />
      )}
      {mode === 'edit' && (
        <Create
          token={props.token}
          setMode={setMode}
          afterFunc={newItem => editItem(grades, setGrades, newItem)}
          setLoading={setLoading}
          grade={selectedGrade}
        />
      )}
    </View>
  );
}

export default Grade;
