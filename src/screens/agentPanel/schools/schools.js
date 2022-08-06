import React, {useState} from 'react';
import {View} from 'react-native';
import {dispatchStateContext, globalStateContext} from '../../../App';
import Create from './create/create';
import Details from './details/Details';
import List from './list/List';
import Students from './students/Students';
import {removeItems, editItem, addItem} from '../../../services/Utility';
import {getAllAgentSchools} from './Utility';

function Agent(props) {
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [mode, setMode] = useState('list');
  const [selectedAgent, setSelectedAgent] = useState({});
  const [state, dispatch] = useGlobalState();
  const [data, setData] = useState([
    {
      id: 1,
      name: 'مدرسه اول',
      manager: 'فرهاد اقبالی',
      phone: '09121234567',
      number: 10,
    },
    {
      id: 2,
      name: 'مدرسه دوم',
      manager: 'فرهاد اقبالی',
      phone: '09921234987',
      number: 15,
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
          setSelectedAgent={setSelectedAgent}
          edit={ids => editItem(data, setData, ids)}
        />
      )}
      {mode === 'create' && (
        <Create
          setMode={setMode}
          setLoading={setLoading}
          token={props.token}
          addItem={i => addItem(data, setData, i)}
        />
      )}
      {mode === 'edit' && (
        <Create
          setMode={setMode}
          setLoading={setLoading}
          data={data}
          setData={setData}
          token={props.token}
          setSelectedAgent={setSelectedAgent}
          edit={item => editItem(data, setData, item)}
        />
      )}
      {mode === 'students' && (
        <Students
          setMode={setMode}
          setLoading={setLoading}
          data={data}
          token={props.token}
          setSelectedAgent={setSelectedAgent}
        />
      )}
      {mode === 'details' && (
        <Details
          setMode={setMode}
          setLoading={setLoading}
          data={data}
          token={props.token}
          setSelectedAgent={setSelectedAgent}
        />
      )}
    </View>
  );
}

export default Agent;
