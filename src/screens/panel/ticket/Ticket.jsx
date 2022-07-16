import React, {useState} from 'react';
import {View} from 'react-native';
import {dispatchStateContext, globalStateContext} from '../../../App';
import List from './components/List/List';
import Create from './components/Create';
import Show from './components/Show/Show';
import {addItem, isUserAdmin} from '../../../services/Utility';
import {filter} from './components/List/Utility';

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

  const updateTicket = ticket => {
    const allTickets = tickets.map(elem => {
      if (elem.id === ticket.id) return ticket;
      return elem;
    });
    setSelectedTicket(ticket);
    setTickets(allTickets);
  };

  const setLoading = status => {
    dispatch({loading: status});
  };

  React.useEffect(() => {
    filter(
      {
        setLoading: status => dispatch({loading: status}),
        token: props.token,
        setTickets: setTickets,
        navigate: navigate,
        isAdmin: isAdmin,
      },
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
    );
  }, [navigate, props.token, isAdmin, dispatch]);

  return (
    <View>
      {mode === 'list' && (
        <List
          setMode={setMode}
          setLoading={setLoading}
          tickets={tickets}
          isAdmin={isAdmin}
          setTickets={setTickets}
          token={props.token}
          setSelectedTicket={setSelectedTicket}
        />
      )}
      {mode === 'create' && (
        <Create
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
          updateTicket={updateTicket}
          ticket={selectedTicket}
          token={props.token}
          setMode={setMode}
        />
      )}
    </View>
  );
}

export default Ticket;
