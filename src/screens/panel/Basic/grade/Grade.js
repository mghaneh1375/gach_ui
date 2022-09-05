import React, {useState} from 'react';
import {globalStateContext, dispatchStateContext} from '../../../../App';
import {getGrades} from '../Utility';
import List from './List/List';
import Create from './create/Create';
import Translate from '../Translate';
import {addItem, editItem} from '../../../../services/Utility';
import {MyView} from '../../../../styles/Common';

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
  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([getGrades(props.token)]).then(res => {
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
    <MyView>
      {mode === 'list' && grades !== undefined && (
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
    </MyView>
  );
}

export default Grade;
