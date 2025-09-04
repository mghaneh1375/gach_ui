import {routes} from '@/api/apiRoutes';
import {generalRequest} from '../../../api/utility';
export const getMyOffs = async token => {
  return await generalRequest(
    routes.getMyOffs,
    'get',
    undefined,
    'data',
    token,
  );
};
