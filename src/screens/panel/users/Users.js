import React, {useState} from 'react';
import {globalStateContext, dispatchStateContext} from '../../../App';
import {filter} from './components/Utility';
import List from './components/List/List';
import {CommonWebBox, MyView} from '../../../styles/Common';
import ChangePass from '../../general/profile/components/ChangePass';
import ChangeLevel from './components/ChangeLevel';
import {editItem, removeItems} from '../../../services/Utility';
import {useParams} from 'react-router';

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

  const level = useParams().level;

  React.useEffect(() => {
    if (level === undefined) {
      navigate('/');
      return;
    }
    dispatch({loading: true});
    Promise.all([filter(props.token, level)]).then(res => {
      dispatch({loading: false});
      if (res[0] == null) {
        navigate('/');
        return;
      }
      setUsers(res[0]);
      setMode('list');
    });
  }, [navigate, props.token, level, dispatch]);

  return (
    <MyView>
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
          removeFromList={ids => removeItems(users, setUsers, ids)}
        />
      )}
    </MyView>
  );
};

export default Users;
