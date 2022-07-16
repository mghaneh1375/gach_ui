import React, {useState} from 'react';
import {View} from 'react-native';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {filter} from './components/Utility';
import List from './components/List/List';
import {CommonWebBox, SimpleText} from '../../../styles/Common';
import ChangePass from '../../general/profile/components/ChangePass';

const Users = props => {
  const [mode, setMode] = useState('list');
  const [selectedUser, setSelectedUser] = useState();
  const [users, setUsers] = useState();

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
    filter({
      token: props.token,
      setLoading: status => {
        dispatch({loading: status});
      },
      setData: setUsers,
    });
  }, [navigate, props.token, dispatch]);

  return (
    <View>
      {mode === 'list' && (
        <List
          users={users}
          setData={setUsers}
          setMode={setMode}
          setLoading={setLoading}
          setSelectedUser={setSelectedUser}
          token={props.token}
        />
      )}
      {mode === 'changePass' && (
        <CommonWebBox
          child={<ChangePass setLoading={setLoading} token={props.token} />}
        />
      )}
    </View>
  );
};

export default Users;
