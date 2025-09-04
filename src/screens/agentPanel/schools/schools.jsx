import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import Create from './Create';
import Details from './details/Details';
import List from './list/List';
import Students from './students/Students';
import {removeItems, editItem, addItem} from '../../../services/Utility';
import {getAllAgent} from './Utility';
import {MyView} from '../../../styles/Common';
import ChargeAccount from '../../panel/users/components/ChargeAccount';

function Schools(props) {
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
    <MyView>
      {mode === 'list' && data !== undefined && (
        <List
          setMode={setMode}
          user={props.user}
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
          navigate={navigate}
          token={props.token}
          wantedUser={selectedAgent}
        />
      )}
      {mode === 'chargeAccount' && (
        <ChargeAccount
          wantedUser={selectedAgent}
          setMode={setMode}
          setLoading={setLoading}
          token={props.token}
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
    </MyView>
  );
}

export default Schools;
