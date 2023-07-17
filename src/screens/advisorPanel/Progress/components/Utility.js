import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';

export const getProgressData = (
  token,
  userId,
  start = undefined,
  end = undefined,
) => {
  let query = new URLSearchParams();

  if (start !== undefined) query.append('start', start);
  if (end !== undefined) query.append('end', end);

  return generalRequest(
    routes.studentProgress + userId + '?' + query.toString(),
    'get',
    undefined,
    'data',
    token,
  );
};
