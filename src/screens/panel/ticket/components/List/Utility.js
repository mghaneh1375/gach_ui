import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';
import {showSuccess} from '../../../../../services/Utility';
import translator from '../../Translator';

export const closeRequest = async (props, selectedId, toggleShowOpPopUp) => {
  props.setLoading(true);
  let res = await Promise.all([
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
      if (props.setTickets !== undefined) {
        let tickets = props.tickets;
        tickets = tickets.map(elem => {
          if (res[0].closedIds.indexOf(elem.id) !== -1) {
            elem.statusFa = translator.closedRequest;
          }
          return elem;
        });
        props.setTickets(tickets);
      }
      if (toggleShowOpPopUp !== undefined) toggleShowOpPopUp();
    }
    return res;
  });

  return res;
};

export const filter = (
  props,
  priority,
  section,
  startWith,
  status,
  searchArchive,
  sendDateSolar,
  sendDateSolarEndLimit,
  answerDateSolar,
  answerDateSolarEndLimit,
) => {
  let query = new URLSearchParams();

  if (priority !== undefined && priority !== 'all') {
    query.append('priority', priority);
  }
  if (section !== undefined && section !== 'all') {
    query.append('section', section);
  }
  if (status !== undefined && status !== 'all') {
    query.append('status', status);
  }

  if (searchArchive !== undefined && searchArchive !== '') {
    query.append('searchInArchive', searchArchive === 'yes');
  }

  if (startWith !== undefined && startWith !== 'all') {
    query.append('startByAdmin', startWith === 'admin');
  }

  if (sendDateSolar !== undefined && sendDateSolar.toString().length > 0) {
    query.append('sendDateSolar', sendDateSolar);
  }

  if (
    sendDateSolarEndLimit !== undefined &&
    sendDateSolarEndLimit.toString().length > 0
  ) {
    query.append('sendDateSolarEndLimit', sendDateSolarEndLimit);
  }

  if (answerDateSolar !== undefined && answerDateSolar.toString().length > 0) {
    query.append('answerDateSolar', answerDateSolar);
  }

  if (
    answerDateSolarEndLimit !== undefined &&
    answerDateSolarEndLimit.toString().length > 0
  ) {
    query.append('answerDateSolarEndLimit', answerDateSolarEndLimit);
  }
  props.setLoading(true);
  Promise.all([
    generalRequest(
      props.isAdmin
        ? routes.fetchAllTickets + '?' + query.toString()
        : routes.fetchMyTickets + '?' + query.toString(),
      'get',
      undefined,
      'data',
      props.token,
    ),
  ]).then(res => {
    props.setLoading(false);
    if (res[0] !== null) props.setTickets(res[0]);
    else props.navigate('/');
  });
};
