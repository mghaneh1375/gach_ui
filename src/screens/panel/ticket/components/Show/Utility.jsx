import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';

export const fetchDetail = async props => {
  props.setLoading(true);
  const res = await generalRequest(
    routes.fetchTicket + props.ticket.id,
    'get',
    undefined,
    'data',
    props.token,
  );

  props.setLoading(false);
  if (res !== null) props.updateTicket(res);
};

export const changeMode = (setMode, newMode) => {
  setMode(newMode);
};
