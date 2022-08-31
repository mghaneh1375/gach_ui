import {routes} from '../../../API/APIRoutes';
import {generalRequest} from '../../../API/Utility';

export const getMySummary = async token => {
  return await generalRequest(
    routes.getMySummary,
    'get',
    undefined,
    'data',
    token,
  );
};
