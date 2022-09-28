import React, {useState} from 'react';
import {dispatchStateContext} from '../../../App';
import List from './components/List/List';
import {CommonWebBox, MyView} from '../../../styles/Common';
import ChangePass from '../../general/profile/components/ChangePass';
import ChangeLevel from './components/ChangeLevel';
import {useParams} from 'react-router';
import {UsersProvider} from './components/Context';

const Users = props => {
  const [mode, setMode] = useState();
  const navigate = props.navigate;

  const useGlobalState = () => [React.useContext(dispatchStateContext)];

  const [dispatch] = useGlobalState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  const level = useParams().level;

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
            setLoading={setLoading}
            token={props.token}
          />
        )}
      </UsersProvider>
    </MyView>
  );
};

export default Users;
