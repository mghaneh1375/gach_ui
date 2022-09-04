import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';

export const chargeAccout = async (amount, token) => {
  return generalRequest(
    routes.chargeAccount,
    'post',
    {
      amount: amount,
    },
    ['action', 'refId'],
    token,
  );
};
