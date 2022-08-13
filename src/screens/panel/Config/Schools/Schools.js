import React, {useState} from 'react';
import {globalStateContext, dispatchStateContext} from '../../../../App';
import {View} from 'react-native';
import List from './components/List/List';
import Create from './components/Create';
import {filter} from './components/Utility';
import {addItem, editItem, removeItems} from '../../../../services/Utility';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';

function Schools(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  const [schools, setSchools] = useState();
  const [selectedSchool, setSelectedSchool] = useState();
  const [mode, setMode] = useState('');
  const [states, setStates] = useState();

  React.useEffect(() => {
    if (states !== undefined) return;
    dispatch({loading: true});
    Promise.all([
      filter(props.token, undefined, undefined, undefined, undefined),
      generalRequest(routes.fetchState, 'get', undefined, 'data'),
    ]).then(res => {
      dispatch({loading: false});
      if (res[0] === null) navigate('/');
      setSchools(res[0]);
      if (res[1] !== null) {
        setStates(res[1]);
        setMode('list');
      } else navigate('/');
    });
  }, [navigate, props.token, dispatch, states]);

  return (
    <MyView style={{zIndex: 10}}>
      {mode === 'list' && (
        <List
          schools={schools}
          setMode={setMode}
          setData={setSchools}
          setLoading={setLoading}
          token={props.token}
          states={states}
          setSelectedSchool={setSelectedSchool}
          selectedSchool={selectedSchool}
          removeSchools={removedIds => {
            removeItems(schools, setSchools, removedIds);
          }}
        />
      )}
      {mode === 'create' && (
        <Create
          setMode={setMode}
          addSchool={item => {
            addItem(schools, setSchools, item);
          }}
          setLoading={setLoading}
          token={props.token}
        />
      )}
      {mode === 'update' && (
        <Create
          setMode={setMode}
          editSchool={item => {
            editItem(schools, setSchools, item);
          }}
          setLoading={setLoading}
          selectedSchool={selectedSchool}
          token={props.token}
        />
      )}
    </MyView>
  );
}

export default Schools;
