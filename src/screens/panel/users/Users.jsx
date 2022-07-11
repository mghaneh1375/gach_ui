import React, {useState} from 'react';
import {View} from 'react-native';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import {globalStateContext, dispatchStateContext} from '../../../App';
import List from './components/List/List';

const Users = props => {
  const {mode, setMode} = useState('list');
  const {users, setUsers} = useState();

  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.fetchAllUsers,
        'get',
        undefined,
        'data',
        props.token,
      ),
    ]).then(res => {
      if (res[0] == null) {
        navigate('/');
        return;
      }
      setUsers(res[0]);
      dispatch({loading: false});
    });
  }, [navigate, props.token, dispatch]);

  return (
    <View>
      {mode === 'list' && <List setLoading={setLoading} token={props.token} />}
    </View>
  );
};

export default Users;
