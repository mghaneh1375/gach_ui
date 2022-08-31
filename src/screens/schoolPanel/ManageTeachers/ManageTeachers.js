import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import List from './list/List';
import Create from './create/Create';
import {removeItems, editItem, addItem} from '../../../services/Utility';
import {MyView} from '../../../styles/Common';

function ManageTeachers(props) {
  const queryString = require('query-string');
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [mode, setMode] = useState('list');
  const [selectedTeacher, setSelectedTeacher] = useState();
  const [state, dispatch] = useGlobalState();

  const [data, setData] = useState([
    {
      name: 'محمدی',
      NID: '0018999963',
      tel: '09357896478',
      email: 'jesusCryys@gmail.com',
    },
  ]);
  const setLoading = status => {
    dispatch({loading: status});
  };
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
          setSelectedTeacher={setSelectedTeacher}
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
    </MyView>
  );
}
export default ManageTeachers;
