import React, {useState} from 'react';
import {dispatchStateContext} from '../../../App';
import List from './components/List/List';
import {MyView} from '../../../styles/Common';
import ChangeLevel from './components/ChangeLevel';
import {useParams} from 'react-router';
import {UsersProvider} from './components/Context';
import ChangePassByAdmin from './components/ChangePassByAdmin';
import ChargeAccount from './components/ChargeAccount';
import AdvisorTags from './components/AdvisorTags';
import SetIRYSCPercent from './components/SetIRYSCPercent';
import SetPriority from './components/SetPriority';
import Transactions from './components/Transactions/Transactions';

const Users = props => {
  const [mode, setMode] = useState();
  const navigate = props.navigate;

  const useGlobalState = () => [React.useContext(dispatchStateContext)];

  const [dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
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
