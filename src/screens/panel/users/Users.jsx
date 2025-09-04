import React, {useState} from 'react';
import {dispatchStateContext} from '@/App.jsx';
import List from './components/list/List.jsx';
import {MyView} from '@/styles';
import ChangeLevel from './components/ChangeLevel.jsx';
import {useParams} from 'react-router';
import {UsersProvider} from './components/Context.jsx';
import ChangePassByAdmin from './components/ChangePassByAdmin.jsx';
import ChargeAccount from './components/ChargeAccount.jsx';
import AdvisorTags from './components/AdvisorTags.jsx';
import SetIRYSCPercent from './components/SetIRYSCPercent.jsx';
import SetPriority from './components/SetPriority.jsx';
import Transactions from './components/transactions/Transactions.jsx';
import CreateUser from './components/CreateUser.jsx';
const Users = props => {
  const [mode, setMode] = useState();
  const navigate = props.navigate;
  const useGlobalState = () => [React.useContext(dispatchStateContext)];
  const [dispatch] = useGlobalState();
  const setLoading = status => {
    dispatch({
      loading: status,
    });
  };
  const level = useParams().level;
  const [selectedUser, setSelectedUser] = useState();
  React.useEffect(() => {
    if (level === undefined) {
      navigate('/');
      return;
    }
    setMode('list');
  }, [level, navigate]);
  return (
    <MyView>
      <UsersProvider>
        {mode === 'list' && (
          <List
            navigate={navigate}
            setMode={setMode}
            setLoading={setLoading}
            token={props.token}
            setSelectedUser={setSelectedUser}
          />
        )}
        {mode === 'create' && (
          <CreateUser
            navigate={navigate}
            setMode={setMode}
            setLoading={setLoading}
            token={props.token}
          />
        )}

        {mode === 'changePass' && (
          <ChangePassByAdmin
            setMode={setMode}
            setLoading={setLoading}
            token={props.token}
          />
        )}
        {mode === 'changeLevel' && (
          <ChangeLevel
            setMode={setMode}
            setLoading={setLoading}
            token={props.token}
          />
        )}
        {mode === 'chargeAccount' && (
          <ChargeAccount
            setMode={setMode}
            setLoading={setLoading}
            token={props.token}
          />
        )}
        {mode === 'advisorTags' && (
          <AdvisorTags
            teachMode="advisor"
            setMode={setMode}
            setLoading={setLoading}
            token={props.token}
          />
        )}
        {mode === 'teachTags' && (
          <AdvisorTags
            teachMode="teach"
            setMode={setMode}
            setLoading={setLoading}
            token={props.token}
          />
        )}
        {mode === 'setPriority' && (
          <SetPriority
            setMode={setMode}
            setLoading={setLoading}
            token={props.token}
          />
        )}
        {mode === 'transactions' && (
          <Transactions
            setMode={setMode}
            setLoading={setLoading}
            token={props.token}
          />
        )}
        {mode === 'setIRYSCPercent' && (
          <SetIRYSCPercent
            selectedUser={selectedUser}
            setMode={setMode}
            setLoading={setLoading}
            token={props.token}
          />
        )}
      </UsersProvider>
    </MyView>
  );
};
export default Users;
