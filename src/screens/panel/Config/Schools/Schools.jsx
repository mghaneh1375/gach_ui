import React, {useState} from 'react';
import {globalStateContext, dispatchStateContext} from '../../../../App';
import {View} from 'react-native';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import List from './components/List/List';
import Create from './components/Create';
import {filter} from './components/Utility';

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
  const [mode, setMode] = useState('list');

  const removeSchools = items => {
    let allSchools = schools;
    allSchools = allSchools.filter(elem => items.indexOf(elem.id) === -1);
    setSchools(allSchools);
  };

  const addSchool = item => {
    let allSchools = schools;
    allSchools.push(item);
    setSchools(allSchools);
  };

  React.useEffect(() => {
    filter({
      setLoading: status => {
        dispatch({loading: status});
      },
      token: props.token,
      setData: setSchools,
      navigate: navigate,
    });
  }, [navigate, props.token, dispatch]);

  return (
    <View style={{zIndex: 10}}>
      {mode === 'list' && (
        <List
          schools={schools}
          setMode={setMode}
          setData={setSchools}
          setLoading={setLoading}
          token={props.token}
          setSelectedSchool={setSelectedSchool}
          selectedSchool={selectedSchool}
          removeSchools={removeSchools}
        />
      )}
      {mode === 'add' && (
        <Create
          addSchool={addSchool}
          setLoading={setLoading}
          token={props.token}
        />
      )}
    </View>
  );
}

export default Schools;
