import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';
import {showSuccess} from '../../../../../services/Utility';
import translator from '../../Translator';

export const closeRequest = (props, selectedId, toggleShowOpPopUp) => {
  props.setLoading(true);
  Promise.all([
    generalRequest(
      routes.closeTicketRequest,
      'post',
      {items: [selectedId]},
      ['excepts', 'closedIds'],
      props.token,
    ),
  ]).then(res => {
    props.setLoading(false);
    if (res[0] !== null) {
      showSuccess(res[0].excepts);
      let tickets = props.tickets;
      tickets = tickets.map(elem => {
        if (res[0].closedIds.indexOf(elem.id) !== -1)
          elem.statusFa = translator.closedRequest;
        return elem;
      });
      props.setTickets(tickets);
      toggleShowOpPopUp();
    }
  });
};

export const filter = (props, priority, section, status) => {
  let query = new URLSearchParams();

  if (priority !== undefined && priority !== 'all')
    query.append('priority', priority);
  if (section !== undefined && section !== 'all')
    query.append('section', section);
  if (status !== undefined && status !== 'all') query.append('status', status);

  props.setLoading(true);
  Promise.all([
    generalRequest(
      routes.fetchAllTickets + '?' + query.toString(),
      'get',
      undefined,
      'data',
      props.token,
    ),
  ]).then(res => {
    props.setLoading(false);
    if (res[0] !== null) {
      props.setTickets(res[0]);
    }
  });
};
