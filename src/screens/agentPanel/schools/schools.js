import React, {useState} from 'react';
import {View} from 'react-native';
import {dispatchStateContext, globalStateContext} from '../../../App';
import Create from './create/create';
import Details from './details/Details';
import List from './list/List';
import Students from './students/Students';

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
          // setData={setData}
          token={props.token}
          // remove={ids => removeItems(data, setData, ids)}
          setSelectedAgent={setSelectedAgent}
          // update={item => editItem(data, setData, item)}
        />
      )}
      {mode === 'create' && (
        <Create
          setMode={setMode}
          setLoading={setLoading}
          data={data}
          // setData={setData}
          token={props.token}
          // remove={ids => removeItems(data, setData, ids)}
          setSelectedAgent={setSelectedAgent}
          // update={item => editItem(data, setData, item)}
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
      {mode === 'edit' && (
        <Create
          setMode={setMode}
          setLoading={setLoading}
          data={data}
          // setData={setData}
          token={props.token}
          // remove={ids => removeItems(data, setData, ids)}
          setSelectedAgent={setSelectedAgent}
          // update={item => editItem(data, setData, item)}
        />
      )}
    </View>
  );
}

export default Agent;
