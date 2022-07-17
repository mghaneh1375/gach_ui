import React, {useState} from 'react';
import {View} from 'react-native';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {filter} from './components/Utility';
import List from './components/List/List';
import {CommonWebBox} from '../../../styles/Common';
import ChangePass from '../../general/profile/components/ChangePass';
import ChangeLevel from './components/ChangeLevel';
import {editItem} from '../../../services/Utility';

const Users = props => {
  const [mode, setMode] = useState('list');
  const [selectedUser, setSelectedUser] = useState();
  const [users, setUsers] = useState([]);

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
    if (props.level === undefined) {
      navigate('/');
      return;
    }
    dispatch({loading: true});
    Promise.all([filter(props.token, props.level)]).then(res => {
      dispatch({loading: false});
      if (res[0] == null) {
        navigate('/');
        return;
      }
      setUsers(res[0]);
      setMode('list');
    });
  }, [navigate, props.token, props.level, dispatch]);

  return (
    <View>
      {mode === 'list' && (
        <List
          users={users}
          setData={setUsers}
          setMode={setMode}
          setLoading={setLoading}
          setSelectedUser={setSelectedUser}
          selectedUser={selectedUser}
          token={props.token}
          updateUser={newUser => editItem(users, setUsers, newUser)}
        />
      )}
      {mode === 'changePass' && (
        <CommonWebBox
          child={
            <ChangePass
              setLoading={setLoading}
              setMode={setMode}
              token={props.token}
            />
          }
        />
      )}
      {mode === 'changeLevel' && (
        <ChangeLevel
          setMode={setMode}
          user={selectedUser}
          setLoading={setLoading}
          token={props.token}
        />
      )}
    </View>
  );
};

export default Users;
