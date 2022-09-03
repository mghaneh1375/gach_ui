import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';

export const chargeAccout = async () => {
  return generalRequest(
    routes.chargeAccount,
    'get',
    undefined,
    'data',
    undefined,
  );
};
