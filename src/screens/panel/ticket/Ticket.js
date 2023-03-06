import React, {useState} from 'react';
import {dispatchStateContext, globalStateContext} from '../../../App';
import List from './components/List/List';
import Create from './components/Create';
import Show from './components/Show/Show';
import {addItem, editItem, isUserAdmin} from '../../../services/Utility';
import {filter} from './components/List/Utility';
import {useLocation} from 'react-router';
import {MyView} from '../../../styles/Common';

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
  const isAdmin = isUserAdmin(props.user);
  const [items, setItems] = useState();

  const setLoading = status => {
    dispatch({loading: status});
  };

  let {search} = useLocation();

  React.useEffect(() => {
    const params = queryString.parse(search);
    filter(
      {
        setLoading: status => dispatch({loading: status}),
        token: props.token,
        setTickets: setTickets,
        setItems: setItems,
        navigate: navigate,
        isAdmin: isAdmin,
      },
      undefined,
      params !== undefined ? params.section : undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    );
  }, [navigate, props.token, isAdmin, search, dispatch]);

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
          token={props.token}
          setSelectedTicket={setSelectedTicket}
        />
      )}
      {mode === 'create' && (
        <Create
          user={props.user}
          setMode={setMode}
          setLoading={setLoading}
          isAdmin={isAdmin}
          addTicket={newTicket => addItem(tickets, setTickets, newTicket)}
          token={props.token}
        />
      )}
      {mode === 'show' && (
        <Show
          isAdmin={isAdmin}
          user={props.user}
          setLoading={setLoading}
          updateTicket={ticket => editItem(tickets, setTickets, ticket)}
          setSelectedTicket={setSelectedTicket}
          ticket={selectedTicket}
          token={props.token}
          setMode={setMode}
        />
      )}
    </MyView>
  );
}

export default Ticket;
