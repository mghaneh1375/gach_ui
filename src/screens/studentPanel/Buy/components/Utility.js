import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';

export const callRemoveTicket = async (token, ticketId) => {
  return await generalRequest(
    routes.removeTickets,
    'delete',
    {items: [ticketId]},
    ['doneIds', 'excepts'],
    token,
  );
};
