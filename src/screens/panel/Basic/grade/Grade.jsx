import React, {useState} from 'react';
import {dispatchStateContext} from '@/App.jsx';
import {getGrades} from '../utility';
import List from './list/List.jsx';
import Create from './create/Create.jsx';
import Translate from '../translate';
import {addItem, editItem} from '../../../../services/utility';
import {MyView} from '@/styles';
function Grade(props) {
  const [mode, setMode] = useState('list');
  const [selectedGrade, setSelectedGrade] = useState();
  const [grades, setGrades] = useState();
  const navigate = props.navigate;
  const useGlobalState = () => [React.useContext(dispatchStateContext)];
  const [dispatch] = useGlobalState();
  const setLoading = status => {
    dispatch({
      loading: status,
    });
  };
  React.useEffect(() => {
    dispatch({
      loading: true,
    });
    Promise.all([getGrades(props.token)]).then(res => {
      dispatch({
        loading: false,
      });
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
