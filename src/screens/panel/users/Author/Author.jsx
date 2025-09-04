import React, {useState} from 'react';
import List from './list/List';
import Show from './show/Show';
import CreateAuthor from './create/Create';
import CreateTransaction from './show/createTransaction/CreateTransaction';
import {addItem, editItem} from '../../../../services/utility';
import {globalStateContext, dispatchStateContext} from '@/App';
import {filter} from './list/utility';
import {MyView} from '@/styles';
function Author(props) {
  const [mode, setMode] = useState('list');
  const [authors, setAuthors] = useState();
  const [selectedUser, setSelectedUser] = useState();
  const [tag, setTag] = useState();
  const navigate = props.navigate;
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [state, dispatch] = useGlobalState();
  const setLoading = status => {
    dispatch({
      loading: status,
    });
  };
  React.useEffect(() => {
    Promise.all([
      filter(
        status =>
          dispatch({
            loading: status,
          }),
        props.token,
        setAuthors,
        tag,
      ),
    ]).then(res => {
      if (res[0] === null) navigate('/');
    });
  }, [navigate, props.token, dispatch, tag]);
  return (
    <MyView>
      {mode === 'list' && authors !== undefined && (
        <List
          authors={authors}
          setAuthors={setAuthors}
          setTag={setTag}
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
      {mode === 'editAuthor' && (
        <CreateAuthor
          setMode={setMode}
          setLoading={setLoading}
          author={selectedUser}
          afterAdd={newItem => editItem(authors, setAuthors, newItem)}
          token={props.token}
        />
      )}
      {mode === 'show' && (
        <Show
          setMode={setMode}
          setLoading={setLoading}
          author={selectedUser}
          token={props.token}
          updateAuthor={newItem => editItem(authors, setAuthors, newItem)}
        />
      )}
      {mode === 'createTransaction' && (
        <CreateTransaction
          author={selectedUser}
          setMode={setMode}
          setLoading={setLoading}
          token={props.token}
          updateAuthor={newItem => editItem(authors, setAuthors, newItem)}
        />
      )}
    </MyView>
  );
}
export default Author;
