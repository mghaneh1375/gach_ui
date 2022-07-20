import {View} from 'react-native';
import {CommonWebBox, SimpleText} from '../../../../styles/Common';
import {useState} from 'react';
import {globalStateContext, dispatchStateContext} from '../../../../App';
import List from '../lesson/List/List';
import React from 'react';
import {getLesson, getLessons} from '../Utility';
import Create from '../lesson/Create';
import Translate from '../Translate';

function Lesson(props) {
  const navigate = props.navigate;
  const [mode, setMode] = useState('list');
  const [selectedLesson, setSelectedLesson] = useState();
  const [lesson, setLesson] = useState();
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
    Promise.all([getLessons(props.token)]).then(res => {
      dispatch({loading: false});
      if (res[0] == null) {
        navigate('/');
        return;
      }
      setLesson(res[0]);
      setMode('list');
    });
  }, [navigate, props.token, dispatch]);
  return (
    <View>
      {mode === 'list' && (
        <List
          Lesson={lesson}
          setLesson={setLesson}
          setMode={setMode}
          setLoading={setLoading}
          setSelectedLesson={setSelectedLesson}
          token={props.token}
        />
      )}
      {/* {mode === 'create' && (
        <Create
          name={Translate.name}
          token={props.token}
          setMode={setMode}
          afterFunc={newItem => addItem(grades, setGrades, newItem)}
          setLoading={setLoading}
        />
      )} */}
    </View>
  );
}

export default Lesson;
