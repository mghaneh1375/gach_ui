import React, {useState} from 'react';
import {globalStateContext, dispatchStateContext} from '../../../../App';
import {View} from 'react-native';
import {generalRequest} from '../../../../API/Utility';
import {routes} from '../../../../API/APIRoutes';
import List from './components/List/List';

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

  const removeSchools = items => {};

  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.fetchSchools,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      dispatch({loading: false});
      if (res[0] == null) {
        navigate('/');
        return;
      }
      setSchools(res[0]);
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
    </View>
  );
}

export default Schools;
