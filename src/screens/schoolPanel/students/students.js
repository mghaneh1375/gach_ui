import React, {useState} from 'react';
import {View} from 'react-native';
import {dispatchStateContext, globalStateContext} from '../../../App';
import List from './list/List';
import Create from './create/Create';
import {removeItems, editItem, addItem} from '../../../services/Utility';
import AddAll from './addAll/AddAll';

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

  const [data, setData] = useState([
    {
      name: 'البرز منشی زاده',
      NID: '123456789',
      phone: '09121234567',
      email: 'aborzmoon@gmail.com',
    },
  ]);
  const setLoading = status => {
    dispatch({loading: status});
  };
  return (
    <View>
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
    </View>
  );
}

export default Students;
