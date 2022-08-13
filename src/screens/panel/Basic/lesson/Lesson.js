import {View} from 'react-native';
import {useState} from 'react';
import {globalStateContext, dispatchStateContext} from '../../../../App';
import List from './List/List';
import React from 'react';
import {getGradesOnly, getLessons} from '../Utility';
import Create from './create/Create';
import {addItem, editItem} from '../../../../services/Utility';

function Lesson(props) {
  const navigate = props.navigate;
  const [mode, setMode] = useState('list');
  const [selectedLesson, setSelectedLesson] = useState();
  const [lessons, setLessons] = useState();
  const [grades, setGrades] = useState();

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
    Promise.all([getLessons(props.token), getGradesOnly(props.token)]).then(
      res => {
        dispatch({loading: false});
        if (res[0] == null || res[1] == null) {
          navigate('/');
          return;
        }
        setLessons(res[0]);
        setGrades(
          res[1].map(elem => {
            return {id: elem.id, item: elem.name};
          }),
        );
        setMode('list');
      },
    );
  }, [navigate, props.token, dispatch]);
  return (
    <MyView>
      {mode === 'list' && (
        <List
          lessons={lessons}
          setLessons={setLessons}
          setMode={setMode}
          setLoading={setLoading}
          setSelectedLesson={setSelectedLesson}
          token={props.token}
        />
      )}
      {mode === 'create' && (
        <Create
          token={props.token}
          setMode={setMode}
          grades={grades}
          afterFunc={newItem => addItem(lessons, setLessons, newItem)}
          setLoading={setLoading}
        />
      )}
      {mode === 'edit' && (
        <Create
          token={props.token}
          setMode={setMode}
          grades={grades}
          lesson={selectedLesson}
          afterFunc={newItem => editItem(lessons, setLessons, newItem)}
          setLoading={setLoading}
        />
      )}
    </MyView>
  );
}

export default Lesson;
