import {routes} from '@/api/apiRoutes';
import {generalRequest} from '../../../api/utility';
export const giveMyGifts = async token => {
  return await generalRequest(
    routes.giveMyGifts,
    'get',
    undefined,
    'data',
    token,
  );
};
