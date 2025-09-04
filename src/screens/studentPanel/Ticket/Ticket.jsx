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
import {useSearchParams} from 'react-router-dom';

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
  const isAdvisor = isUserAdvisor(state.user);

  const setLoading = status => {
    dispatch({loading: status});
  };

  const [searchParams, setSearchParams] = useSearchParams();

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
      searchParams.get('section'),
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      isAdvisor ? undefined : searchParams.get('userId'),
      isAdvisor ? searchParams.get('userId') : undefined,
    );
  }, [navigate, props.token, dispatch, searchParams, isAdvisor]);

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

  return (
    <MyView>
      {mode !== undefined && mode === 'list' && (
        <List
          tickets={tickets}
          setTickets={setTickets}
          setMode={setMode}
          setLoading={setLoading}
          user={props.user}
          setSelectedTicket={setSelectedTicket}
          token={props.token}
          isAdmin={isAdvisor}
          removeTicket={itemRemove =>
            removeItems(tickets, setTickets, itemRemove)
          }
          addTicket={newItem => addItem(tickets, setTickets, newItem)}
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
