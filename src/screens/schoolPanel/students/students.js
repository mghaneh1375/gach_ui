import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import List from './list/List';
import Create from './create/Create';
import {removeItems, editItem, addItem} from '../../../services/Utility';
import AddAll from './addAll/AddAll';
import {MyView} from '../../../styles/Common';
import {getAllStudent} from './Utility';

function Students(props) {
  const queryString = require('query-string');
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [mode, setMode] = useState('list');
  const [selectedStudent, setSelectedStudent] = useState();
  const [state, dispatch] = useGlobalState();

  const [data, setData] = useState();
  const setLoading = status => {
    dispatch({loading: status});
  };
  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([getAllStudent(props.token)]).then(res => {
      dispatch({loading: false});
      if (res[0] === null) {
        navigate('/');
        return;
      }
      setData(res[0]);
      setMode('list');
    });
  }, [navigate, props.token, dispatch]);
  return (
    <MyView>
      {mode === 'list' && (
        <List
          setMode={setMode}
          setLoading={setLoading}
          data={data}
          setData={setData}
          token={props.token}
          remove={ids => removeItems(data, setData, ids)}
          setSelectedStudent={setSelectedStudent}
          edit={ids => editItem(data, setData, ids)}
        />
      )}
      {mode === 'create' && (
        <Create
          data={data}
          setMode={setMode}
          setLoading={setLoading}
          token={props.token}
          addItem={i => addItem(data, setData, i)}
        />
      )}
      {mode === 'addAll' && (
        <AddAll
          data={data}
          setMode={setMode}
          setLoading={setLoading}
          token={props.token}
          addItem={i => addItem(data, setData, i)}
        />
      )}
    </MyView>
  );
}

export default Students;
