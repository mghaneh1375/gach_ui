import React, {useState} from 'react';
import List from './components/List/List';
import {filter} from '../../panel/ticket/components/List/Utility';
import {globalStateContext, dispatchStateContext} from '../../../App';
import Show from '../../panel/ticket/components/Show/Show';
import Create from '../../panel/ticket/components/Create';
import {addItem, isUserAdvisor, removeItems} from '../../../services/Utility';
import {MyView} from '../../../styles/Common';
import {useParams} from 'react-router';
import {useEffectOnce} from 'usehooks-ts';

function Ticketstd(props) {
  const [mode, setMode] = useState();
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

  const params = useParams();

  useEffectOnce(() => {
    if (
      params.section === undefined ||
      params.id === undefined ||
      params.name === undefined
    )
      setMode('list');
    else setMode('create');
  }, [params]);

  const isAdvisor = isUserAdvisor(state.user);

  return (
    <MyView>
      {mode !== undefined && mode === 'list' && (
        <List
          tickets={tickets}
          setTickets={setTickets}
          setMode={setMode}
          setLoading={setLoading}
          setSelectedTicket={setSelectedTicket}
          token={props.token}
          isAdmin={isAdvisor}
          removeTicket={itemRemove =>
            removeItems(tickets, setTickets, itemRemove)
          }
        />
      )}
      {mode !== undefined && mode === 'show' && (
        <Show
          setLoading={setLoading}
          token={props.token}
          setMode={setMode}
          user={props.user}
          updateTicket={() => {}}
          isAdmin={isAdvisor}
          ticket={selectedTicket}
          setSelectedTicket={setSelectedTicket}
        />
      )}
      {mode !== undefined && mode === 'create' && (
        <Create
          setLoading={setLoading}
          token={props.token}
          setMode={setMode}
          section={params.section}
          name={params.name}
          id={params.id}
          isAdmin={false}
          isAdvisor={isAdvisor}
          user={props.user}
          addTicket={newItem => addItem(tickets, setTickets, newItem)}
        />
      )}
    </MyView>
  );
}

export default Ticketstd;
