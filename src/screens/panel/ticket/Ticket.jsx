import React, {useState} from 'react';
import {View} from 'react-native';
import {dispatchStateContext, globalStateContext} from '../../../App';
import List from './components/List';
import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';
import Create from './components/Create';

function Ticket(props) {
  const [mode, setMode] = useState('list');

  const navigate = props.navigate;

  const useGlobalState = () => [
    React.useContext(globalStateContext),
    React.useContext(dispatchStateContext),
  ];

  const [state, dispatch] = useGlobalState();
  const [tickets, setTickets] = useState([]);

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
          token={props.token}
        />
      )}
      {mode === 'create' && (
        <Create setLoading={setLoading} tickets={tickets} token={props.token} />
      )}
    </View>
  );
}

export default Ticket;
