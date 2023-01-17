import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';

export const giveMyGifts = async token => {
  return await generalRequest(
    routes.giveMyGifts,
    'get',
    undefined,
    'data',
    token,
  );
};
