import {ShadowPropTypesIOS, View} from 'react-native';
import React, {useState} from 'react';
import List from './List/List';
import Show from './Show/Show';
import CreateAuthor from './Create/Create';
import CreateTransaction from './Show/CreateTransaction/CreateTransaction';
import {addItem, editItem, removeItems} from '../../../../services/Utility';
import {globalStateContext, dispatchStateContext} from '../../../../App';

function Author(props) {
  const [mode, setMode] = useState('list');
  const [authors, setAuthors] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
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
          authors={authors}
          setAuthors={setAuthors}
          setMode={setMode}
          setLoading={setLoading}
          setSelectedUser={setSelectedUser}
          token={props.token}
          updateAuthor={newAuthor => editItem(authors, setAuthors, newAuthor)}
        />
      )}
      {mode === 'createAuthor' && (
        <CreateAuthor
          setMode={setMode}
          setLoading={setLoading}
          afterAdd={newItem => addItem(authors, setAuthors, newItem)}
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
          setLoading={setLoading}
          token={props.token}
        />
      )}
    </View>
  );
}

export default Author;
