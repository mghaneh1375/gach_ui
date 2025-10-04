import {dispatchStateContext, globalStateContext} from '@/App.jsx';
import {addItem, isUserAdvisor, removeItems} from '@/services/utility';
import {MyView} from '@/styles';
import React, {useCallback, useMemo, useState} from 'react';
import {useLocation, useParams} from 'react-router';
import {useEffectOnce} from 'usehooks-ts';
import Create from '../../panel/ticket/components/Create.jsx';
import {filter} from '../../panel/ticket/components/list/utility';
import Show from '../../panel/ticket/components/show/Show.jsx';
import List from './components/list/List.jsx';
const queryString = require('query-string');

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
  const {search} = useLocation();
  const params = useParams();

  const [isAdvisor, searchParams] = useMemo(
    () => [isUserAdvisor(state.user), queryString.parse(search)],
    [state.user, search],
  );
  const setLoading = status => {
    dispatch({
      loading: status,
    });
  };

  const fetchData = useCallback(() => {
    filter(
      {
        setLoading: status =>
          dispatch({
            loading: status,
          }),
        token: props.token,
        setTickets: setTickets,
        navigate: navigate,
        isAdmin: false,
        setMode: setMode,
        setSelectedTicket: setSelectedTicket,
      },
      undefined,
      searchParams.section,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      isAdvisor ? undefined : searchParams.userId,
      isAdvisor ? searchParams.userId : undefined,
      params.ticketId,
    );
  }, [
    navigate,
    props.token,
    dispatch,
    searchParams,
    isAdvisor,
    params.ticketId,
  ]);

  useEffectOnce(() => {
    if (!params.section || !params.id || !params.name) {
      fetchData();
      setMode('list');
    } else setMode('create');
  }, [params]);

  return (
    <MyView>
      {mode && mode === 'list' && (
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
          section={searchParams.section}
          userId={searchParams.userId}
        />
      )}
      {mode && mode === 'show' && (
        <Show
          setLoading={setLoading}
          token={props.token}
          setMode={params.ticketId ? undefined : setMode}
          user={props.user}
          updateTicket={() => {}}
          isAdmin={isAdvisor}
          ticket={selectedTicket}
          setSelectedTicket={setSelectedTicket}
        />
      )}
      {mode && mode === 'create' && (
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
