import {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../../App';
import List from './List/List';
import React from 'react';
import {getGradesOnly, getLessons} from '../Utility';
import Create from './create/Create';
import {addItem, editItem} from '../../../../services/Utility';
import {MyView} from '../../../../styles/Common';
import {useParams} from 'react-router';

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
  const params = useParams();
  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([
      getLessons(state.token, params.subMode),
      getGradesOnly(state.token, params.subMode),
    ]).then(res => {
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
    });
  }, [navigate, state.token, dispatch, params.subMode]);
  return (
    <MyView>
      {mode === 'list' && lessons !== undefined && (
        <List
          lessons={lessons}
          setLessons={setLessons}
          setMode={setMode}
          setLoading={setLoading}
          setSelectedLesson={setSelectedLesson}
          token={state.token}
          subMode={params.subMode}
        />
      )}
      {mode === 'create' && (
        <Create
          token={state.token}
          setMode={setMode}
          grades={grades}
          afterFunc={newItem => addItem(lessons, setLessons, newItem)}
          subMode={params.subMode}
          setLoading={setLoading}
        />
      )}
      {mode === 'edit' && (
        <Create
          token={state.token}
          setMode={setMode}
          grades={grades}
          lesson={selectedLesson}
          afterFunc={newItem => editItem(lessons, setLessons, newItem)}
          setLoading={setLoading}
          subMode={params.subMode}
        />
      )}
    </MyView>
  );
}

export default Lesson;
