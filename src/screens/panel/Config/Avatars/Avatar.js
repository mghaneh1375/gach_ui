import React, {useState} from 'react';
import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';
import {dispatchStateContext} from '../../../../App';
import {MyView} from '../../../../styles/Common';
import Create from './components/Create';
import List from './components/List';
import Update from './components/Update';

function Avatar(props) {
  const navigate = props.navigate;

  const useGlobalState = () => [React.useContext(dispatchStateContext)];

  const [dispatch] = useGlobalState();
  const [avatars, setAvatars] = useState();
  const [mode, setMode] = useState('list');
  const [selected, setSelected] = useState();

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
      dispatch({loading: false});
      if (res[0] == null) {
        navigate('/');
        return;
      }
      setAvatars(res[0]);
    });
  }, [navigate, props.token, dispatch]);

  const updateAvatar = (avatarId, newFilename) => {
    let allAvatars = avatars;
    let wanted = allAvatars.find(elem => elem.id === avatarId);
    wanted.file = newFilename;
    setAvatars(allAvatars);
  };

  const addAvatar = avatar => {
    let allAvatars = avatars;
    allAvatars.push(avatar);
    setAvatars(allAvatars);
  };

  return (
    <MyView>
      {mode === 'list' && (
        <List
          updateAvatar={updateAvatar}
          avatars={avatars}
          setAvatars={setAvatars}
          setLoading={setLoading}
          setMode={setMode}
          token={props.token}
          setSelected={setSelected}
        />
      )}
      {mode === 'create' && (
        <Create
          addAvatar={addAvatar}
          setMode={setMode}
          token={props.token}
          setLoading={props.setLoading}
        />
      )}
      {mode === 'edit' && (
        <Update
          updateAvatar={updateAvatar}
          avatar={selected}
          setMode={setMode}
          token={props.token}
          setLoading={props.setLoading}
        />
      )}
    </MyView>
  );
}

export default Avatar;
