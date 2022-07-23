import {routes} from '../../../../API/APIRoutes';
import {generalRequest} from '../../../../API/Utility';

export const fetchAllPackages = async token => {
  return await generalRequest(
    routes.fetchAllPackages,
    'get',
    undefined,
    'data',
    token,
  );
};
