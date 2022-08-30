import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';

export const getMyOffs = async token => {
  return await generalRequest(
    routes.getMyOffs,
    'get',
    undefined,
    'data',
    token,
  );
};
