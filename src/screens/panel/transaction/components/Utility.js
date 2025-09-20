import {routes} from '@/api/apiRoutes';
import {generalRequest} from '@/api/utility';
export const getTransactions = async (
  token,
  userId,
  from,
  to,
  useOffCode,
  section,
  pageIndex,
) => {
  const query = new URLSearchParams();
  if (userId) query.append('userId', userId);
  if (from) query.append('from', from);
  if (to) query.append('to', to);
  if (useOffCode && useOffCode !== 'all')
    query.append('useOffCode', useOffCode);
  if (section && section !== 'all') query.append('section', section);
  query.append('pageIndex', pageIndex);
  return await generalRequest(
    routes.getTransactions + query.toString(),
    'get',
    undefined,
    ['data', 'sum', 'accountMoneySum'],
    token,
  );
};
