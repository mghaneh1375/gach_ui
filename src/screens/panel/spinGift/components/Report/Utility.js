import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
export const filter = async (
  token,
  from = undefined,
  to = undefined,
  giftId = undefined,
  repeat = undefined,
  userId = undefined,
) => {
  const query = new URLSearchParams();
  if (from !== undefined) query.append('from', from);
  if (to !== undefined) query.append('to', to);
  if (giftId !== undefined) query.append('giftId', giftId);
  if (repeat !== undefined) query.append('repeat', repeat);
  if (userId !== undefined) query.append('userId', userId);
  return await generalRequest(
    routes.giftReport + '?' + query.toString(),
    'get',
    undefined,
    ['data', 'gifts'],
    token,
  );
};
