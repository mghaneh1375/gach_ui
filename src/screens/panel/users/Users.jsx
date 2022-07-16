import React, {useState} from 'react';
import {View} from 'react-native';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {filter} from './components/Utility';
import List from './components/List/List';
import {CommonWebBox} from '../../../styles/Common';
import ChangePass from '../../general/profile/components/ChangePass';
import ChangeLevel from './components/ChangeLevel';
import {editItem, removeItems} from '../../../services/Utility';
import {levelKeyVals} from '../ticket/components/KeyVals';

const Users = props => {
  const [mode, setMode] = useState('list');
  const [selectedUser, setSelectedUser] = useState();
  const [users, setUsers] = useState();
  const [accesses, setAccesses] = useState(
    ['agent', 'school'].map(elem => {
      return {
        id: elem,
        title: levelKeyVals.find(level => level.id === elem).item,
      };
    }),
  );

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
    filter(
      {
        token: props.token,
        setLoading: status => {
          dispatch({loading: status});
        },
        setData: setUsers,
      },
      props.level,
    );
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
          removeItem={ids => removeItems(accesses, setAccesses, ids)}
          // accesses={selectedUser.accesses}
          accesses={accesses}
          setLoading={setLoading}
          token={props.token}
        />
      )}
    </View>
  );
};

export default Users;
