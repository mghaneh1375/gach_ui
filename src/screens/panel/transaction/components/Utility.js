import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';

export const getTransactions = async (
  token,
  userId,
  from,
  to,
  useOffCode,
  section,
) => {
  let query = new URLSearchParams();
  if (userId !== undefined) query.append('userId', userId);
  if (from !== undefined) query.append('from', from);
  if (to !== undefined) query.append('to', to);
  if (useOffCode !== undefined && useOffCode !== 'all')
    query.append('useOffCode', useOffCode);
  if (section !== undefined && section !== 'all')
    query.append('section', section);

  return await generalRequest(
    routes.getTransactions + query.toString(),
    'get',
    undefined,
    'data',
    token,
  );
};
