import {routes} from '../../../../../API/APIRoutes';
import {generalRequest} from '../../../../../API/Utility';

export const getConfig = async token => {
  return await generalRequest(
    routes.getGiftConfig,
    'get',
    undefined,
    'data',
    token,
  );
};
