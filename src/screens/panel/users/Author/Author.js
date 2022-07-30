import {ShadowPropTypesIOS, View} from 'react-native';
import React, {useState} from 'react';
import List from './List/List';
import Show from './Show/Show';
import CreateAuthor from './CreateAuthor/Create';
import CreateTransaction from './Show/CreateTransaction/CreateTransaction';
import {editItem, removeItems} from '../../../../services/Utility';
import {globalStateContext, dispatchStateContext} from '../../../../App';

function Author(props) {
  const [mode, setMode] = useState('list');
  const [authors, setAuthors] = useState();
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const setLoading = status => {
    dispatch({loading: status});
  };
  return (
    <View>
      {mode === 'list' && (
        <List
          author={authors}
          setAuthors={setAuthors}
          setMode={setMode}
          //setLoading={setLoading}
          //setSelectedUser={setSelectedUser}
          token={props.token}
          updateAuthor={newAuthor => editItem(authors, setAuthors, newAuthor)}
        />
      )}
      {mode === 'createAuthor' && (
        <CreateAuthor
          setAuthors={setAuthors}
          setMode={setMode}
          //setLoading={setLoading}
          //setSelectedUser={setSelectedUser}
          token={props.token}
        />
      )}
      {mode === 'show' && (
        <Show
          setAuthors={setAuthors}
          setMode={setMode}
          //setLoading={setLoading}
          //setSelectedUser={setSelectedUser}
          token={props.token}
        />
      )}
      {mode === 'createTransaction' && (
        <CreateTransaction
          setAuthors={setAuthors}
          setMode={setMode}
          //setLoading={setLoading}
          //setSelectedUser={setSelectedUser}
          token={props.token}
        />
      )}
    </View>
  );
}

export default Author;
