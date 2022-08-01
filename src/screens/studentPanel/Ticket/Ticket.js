import {View} from 'react-native';
import React, {useState} from 'react';
import List from './components/List/List';
import {filter} from '../../panel/ticket/components/List/Utility';
import {globalStateContext, dispatchStateContext} from '../../../App';
import Show from '../../panel/ticket/components/Show/Show';
import Create from '../../panel/ticket/components/Create';
import {addItem, removeItems} from '../../../services/Utility';

function Ticketstd(props) {
  const [mode, setMode] = useState('list');
  const [tickets, setTickets] = useState();
  const [selectedTicket, setSelectedTicket] = useState();
  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();

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
        isAdmin: false,
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
  }, [navigate, props.token, dispatch]);

  return (
    <View style={{zIndex: 10}}>
      {mode === 'list' && (
        <List
          tickets={tickets}
          setTickets={setTickets}
          setMode={setMode}
          setLoading={setLoading}
          setSelectedTicket={setSelectedTicket}
          token={props.token}
          removeTicket={itemRemove =>
            removeItems(tickets, setTickets, itemRemove)
          }
        />
      )}
      {mode === 'show' && (
        <Show
          setLoading={setLoading}
          token={props.token}
          setMode={setMode}
          user={props.user}
          updateTicket={() => {}}
          isAdmin={false}
          ticket={selectedTicket}
          setSelectedTicket={setSelectedTicket}
        />
      )}
      {mode === 'create' && (
        <Create
          setLoading={setLoading}
          token={props.token}
          setMode={setMode}
          isAdmin={false}
          user={props.user}
          addTicket={newItem => addItem(tickets, setTickets, newItem)}
        />
      )}
    </View>
  );
}

export default Ticketstd;
