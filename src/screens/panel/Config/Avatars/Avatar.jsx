import React, {useState} from 'react';
import {View} from 'react-native';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {globalStateContext, dispatchStateContext} from './../../../../App';
import List from './components/List';

function Avatar(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [avatars, setAvatars] = useState();
  const [mode, setMode] = useState('list');

  const setLoading = status => {
    dispatch({loading: status});
  };

  React.useEffect(() => {
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.fetchAllAvatars,
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
      setAvatars(res[0]);
      dispatch({loading: false});
    });
  }, [navigate, props.token, dispatch]);

  const updateAvatar = avatar => {};

  return (
    <View>
      {mode === 'list' && (
        <List
          updateAvatar={updateAvatar}
          avatars={avatars}
          setAvatars={setAvatars}
          setLoading={setLoading}
          token={props.token}
        />
      )}
    </View>
  );
}

export default Avatar;
