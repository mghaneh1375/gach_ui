import React, {useState} from 'react';
import {useLocation} from 'react-router';
import {globalStateContext, dispatchStateContext} from '@/App.jsx';
import {addItem, editItem, isUserEditorAccess} from '@/services/utility';
import {MyView} from '@/styles';
import ChangeLevel from './components/ChangeLevel.jsx';
import Create from './components/Create.jsx';
import List from './components/list/List.jsx';
import {filter} from './components/list/utility';
import Show from './components/show/Show.jsx';
const queryString = require('query-string');
function Ticket(props) {
  const navigate = props.navigate;
  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];
  const [mode, setMode] = useState('list');
  const [state, dispatch] = useGlobalState();
  const [tickets, setTickets] = useState();
  const [selectedTicket, setSelectedTicket] = useState({});
  const isAdmin = isUserEditorAccess(state.user);
  const [items, setItems] = useState();
  const setLoading = status => {
    dispatch({
      loading: status,
    });
  };
  const {search} = useLocation();
  React.useEffect(() => {
    const params = queryString.parse(search);
    filter(
      {
        setLoading: status =>
          dispatch({
            loading: status,
          }),
        token: state.token,
        setTickets: setTickets,
        setItems: setItems,
        navigate: navigate,
        isAdmin: isAdmin,
      },
      undefined,
      params && params.section ? params.section : undefined,
      undefined,
      params && params.status ? params.status : undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    );
  }, [navigate, state.token, isAdmin, search, dispatch]);
  return (
    <MyView>
      {mode === 'list' && (
        <List
          setMode={setMode}
          setLoading={setLoading}
          tickets={tickets}
          items={items}
          isAdmin={isAdmin}
          setTickets={setTickets}
          token={state.token}
          setSelectedTicket={setSelectedTicket}
        />
      )}
      {mode === 'changeLevel' && (
        <ChangeLevel
          setMode={setMode}
          setLoading={setLoading}
          token={state.token}
          selectedUser={selectedTicket.student}
        />
      )}
      {mode === 'create' && (
        <Create
          user={state.user}
          setMode={setMode}
          setLoading={setLoading}
          isAdmin={isAdmin}
          addTicket={newTicket => addItem(tickets, setTickets, newTicket)}
          token={state.token}
        />
      )}
      {mode === 'show' && (
        <Show
          isAdmin={isAdmin}
          user={state.user}
          setLoading={setLoading}
          updateTicket={ticket => editItem(tickets, setTickets, ticket)}
          setSelectedTicket={setSelectedTicket}
          ticket={selectedTicket}
          token={state.token}
          setMode={setMode}
        />
      )}
    </MyView>
  );
}
export default Ticket;
