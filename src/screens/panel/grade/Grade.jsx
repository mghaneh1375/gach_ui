import React, {useState} from 'react';
import {View} from 'react-native';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {useParams} from 'react-router';
import {getGrade} from './components/Utility';
import List from './components/List/List';
import Create from './components/Create';

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
    // if (mode === undefined) {
    //   navigate('/');
    //   return;
    // }
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
        <Create token={props.token} setMode={setMode} setLoading={setLoading} />
      )}
      {mode === 'edit' && (
        <Create
          token={props.token}
          setMode={setMode}
          setLoading={setLoading}
          grade={selectedGrade}
        />
      )}
    </View>
  );
}

export default Grade;
