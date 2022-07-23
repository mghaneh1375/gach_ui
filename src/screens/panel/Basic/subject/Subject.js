import React, {useState} from 'react';
import {View} from 'react-native';
import {addItem, editItem} from '../../../../services/Utility';
import {getGradeLessons, getGradesOnly, getSubjects} from '../Utility';
import {globalStateContext, dispatchStateContext} from '../../../../App';
import Create from './components/Create';
import List from './components/List/List';

function Subject(props) {
  const navigate = props.navigate;
  const [mode, setMode] = useState('list');
  const [subjects, setSubjects] = useState();
  const [grades, setGrades] = useState();
  const [selectedSubject, setSelectedSubject] = useState();

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
    Promise.all([getSubjects(), getGradeLessons()]).then(res => {
      dispatch({loading: false});
      if (res[0] === null || res[1] === null) {
        navigate('/');
        return;
      }

      setGrades(
        res[1].map(elem => {
          return {id: elem.id, item: elem.name, lessons: elem.lessons};
        }),
      );
      setSubjects(res[0]);
      setMode('list');
    });
  }, [dispatch, props.token, navigate]);

  return (
    <View>
      {mode === 'list' && (
        <List
          subjects={subjects}
          setSubjects={setSubjects}
          token={props.token}
          setMode={setMode}
          setLoading={setLoading}
          setSelectedSubject={setSelectedSubject}
        />
      )}
      {mode === 'create' && (
        <Create
          setMode={setMode}
          grades={grades}
          token={props.token}
          setLoading={setLoading}
          setSubjects={setSubjects}
          afterFunc={newItem => addItem(subjects, setSubjects, newItem)}
        />
      )}
      {mode === 'edit' && (
        <Create
          setMode={setMode}
          grades={grades}
          token={props.token}
          setLoading={setLoading}
          subject={selectedSubject}
          afterFunc={newItem => editItem(subjects, setSubjects, newItem)}
        />
      )}
    </View>
  );
}

export default Subject;
