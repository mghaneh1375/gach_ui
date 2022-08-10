import React, {useState} from 'react';
import {View} from 'react-native';
import {dispatchStateContext, globalStateContext} from '../../../App';
import CreateStep1 from './CreateStep1/CreateStep1';
import Details from './details/Details';
import List from './list/List';
import Students from './students/Students';
import {removeItems, editItem, addItem} from '../../../services/Utility';
import {getAllAgent} from './Utility';

function Agent(props) {
  const queryString = require('query-string');
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [mode, setMode] = useState('list');
  const [selectedAgent, setSelectedAgent] = useState({});
  const [state, dispatch] = useGlobalState();
  const [data, setData] = useState();
  const setLoading = status => {
    dispatch({loading: status});
  };
  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([getAllAgent(props.token)]).then(res => {
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
      {mode === 'createStep1' && (
        <CreateStep1
          data={data}
          setMode={setMode}
          setLoading={setLoading}
          token={props.token}
          step={1}
          addItem={i => addItem(data, setData, i)}
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