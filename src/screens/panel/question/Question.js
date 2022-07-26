import React, {useState} from 'react';
import {View} from 'react-native';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {editItem} from '../../../services/Utility';
import {getGradeLessons} from '../Basic/Utility';
import Create from './components/Create/Create';
import Detail from './components/Detail/Detail';
import List from './components/List/List';
import {getSubjects} from './components/Utility';
import {isUserAdmin} from '../../../services/Utility';

const Question = props => {
  const [subjects, setSubjects] = useState();
  const [mode, setMode] = useState('');
  const [grades, setGrades] = useState();
  const [selected, setSelected] = useState();
  const isAdmin = isUserAdmin(props.user);

  const navigate = props.navigate;

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

    Promise.all([getSubjects(props.token), getGradeLessons(props.token)]).then(
      res => {
        dispatch({loading: false});
        if (res[0] === null || res[1] === null) {
          navigate('/');
          return;
        }
        setSubjects(res[0]);

        setGrades(
          res[1].map(elem => {
            return {id: elem.id, item: elem.name, lessons: elem.lessons};
          }),
        );
        setMode('list');
      },
    );
  }, [dispatch, navigate, props.token]);

  return (
    <View>
      {mode === 'list' && (
        <List
          setMode={setMode}
          token={props.token}
          data={subjects}
          setData={setSubjects}
          setSelected={setSelected}
          grades={grades}
          setLoading={setLoading}
        />
      )}
      {mode === 'create' && (
        <Create
          isAdmin={isAdmin}
          setMode={setMode}
          token={props.token}
          setLoading={setLoading}
        />
      )}
      {mode === 'detail' && (
        <Detail
          subject={selected}
          setSubject={newItem => {
            editItem(subjects, setSubjects, newItem);
            setSelected(newItem);
          }}
          quizMode={
            props.user.accesses.indexOf('admin') === -1 &&
            props.user.accesses.indexOf('superadmin')
              ? 'school'
              : 'irysc'
          }
          setMode={setMode}
          token={props.token}
          setLoading={setLoading}
        />
      )}
    </View>
  );
};

export default Question;
