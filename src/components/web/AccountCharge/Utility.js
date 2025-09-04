import {routes} from '@/api/apiRoutes';
import {generalRequest} from '../../../api/utility';
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
