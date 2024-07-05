import React, {useState} from 'react';
import {addItem, editItem} from '../../../../services/Utility';
import {getGradeAndBranchesLessons, getSubjects} from '../Utility';
import {dispatchStateContext} from '../../../../App';
import Create from './components/Create';
import List from './components/List/List';
import {MyView} from '../../../../styles/Common';
import GroupEdit from './components/GroupEdit';

function Subject(props) {
  const navigate = props.navigate;
  const [mode, setMode] = useState('list');
  const [subjects, setSubjects] = useState();
  const [grades, setGrades] = useState();
  const [selectedSubject, setSelectedSubject] = useState();

  const useGlobalState = () => [React.useContext(dispatchStateContext)];
  const [dispatch] = useGlobalState();
  const setLoading = status => {
    dispatch({loading: status});
  };

  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([getSubjects(), getGradeAndBranchesLessons()]).then(res => {
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
    <MyView>
      {mode === 'list' && subjects !== undefined && (
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
      {mode === 'groupEdit' && (
        <GroupEdit
          setMode={setMode}
          token={props.token}
          setLoading={setLoading}
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
    </MyView>
  );
}

export default Subject;
