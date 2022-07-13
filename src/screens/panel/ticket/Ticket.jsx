import React, {useState} from 'react';
import {View} from 'react-native';
import {dispatchStateContext, globalStateContext} from '../../../App';
import List from './components/List/List';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import Create from './components/Create';
import Show from './components/Show/Show';

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
    dispatch({loading: true});
    Promise.all([
      generalRequest(
        routes.fetchAllTickets,
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
      setTickets(res[0]);
    });
  }, [navigate, props.token, dispatch]);

  return (
    <View>
      {mode === 'list' && (
        <List
          setMode={setMode}
          setLoading={setLoading}
          tickets={tickets}
          setTickets={setTickets}
          token={props.token}
          setSelectedTicket={setSelectedTicket}
        />
      )}
      {mode === 'create' && (
        <Create
          setMode={setMode}
          setLoading={setLoading}
          tickets={tickets}
          token={props.token}
        />
      )}
      {mode === 'show' && (
        <Show
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
