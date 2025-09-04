import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
export const callRemoveTicket = async (token, ticketId) => {
  return await generalRequest(
    routes.removeTickets,
    'delete',
    {
      items: [ticketId],
    },
    ['doneIds', 'excepts'],
    token,
  );
};
