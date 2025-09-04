import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
export const getProgressData = (
  token,
  userId,
  start = undefined,
  end = undefined,
) => {
  const query = new URLSearchParams();
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
