import {routes} from '@/api/apiRoutes';
import {generalRequest} from '../../../api/utility';
export const getMySummary = async token => {
  return await generalRequest(
    routes.getMySummary,
    'get',
    undefined,
    'data',
    token,
  );
};
